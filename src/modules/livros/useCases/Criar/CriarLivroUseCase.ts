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
    const livroJaExisteTitulo = await this.livrosRepository.procurarPorTitulo(titulo);
    
    if(!usuario.admin) {
      throw new AppError("Este usuário não pode criar livros!", 400)
    }

    if(livroJaExisteISBN || livroJaExisteTitulo) {
      throw new AppError("Este livro já existe!", 400)
    }

    const livro = await this.livrosRepository.criar({
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