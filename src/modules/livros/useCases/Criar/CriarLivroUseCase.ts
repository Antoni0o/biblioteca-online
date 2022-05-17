import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { IUsuarioRepository } from "../../../usuarios/repositories/IUsuarioRepository";
import { ICriarLivroDTO } from "../../dtos/ICriarLivroDTO";
import { LivroMap } from "../../mappers/LivroMap";
import { ILivrosRepository } from "../../repositories/ILivrosRepository";

@injectable()
class CriarLivroUseCase {
  constructor(
    @inject("LivrosRepository")
    private livrosRepository: ILivrosRepository,
    @inject("UsuariosRepository")
    private usuariosRepository: IUsuarioRepository
  ) {}

  async execute(user_id: number, {
    autor,
    titulo,
    genero,
    isbn,
    qtd_paginas
  }: ICriarLivroDTO) {
    const usuario = await this.usuariosRepository.procurarPorId(user_id);
    const livroJaExisteISBN = await this.livrosRepository.procurarPorIsbn(isbn);
    let livro;
    
    if(!usuario.admin) {
      throw new AppError("Este usuário não pode criar livros!", 400)
    }

    if(!titulo || !autor || !genero || !isbn || !qtd_paginas) {
      throw new AppError("Você precisa colocar todos os dados para criar um livro!", 400);
    }
    
    if(livroJaExisteISBN) {
      throw new AppError("Este livro já existe!", 400);
    }

    livro = await this.livrosRepository.criar({
      autor,
      genero,
      isbn,
      qtd_paginas,
      titulo    
    });

    return LivroMap.paraDTO(livro);
  }
}

export { CriarLivroUseCase };