import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICriarLivroDTO } from "../../dtos/ICriarLivroDTO";
import { LivroMap } from "../../mappers/LivroMap";
import { ILivrosRepository } from "../../repositories/ILivrosRepository";

@injectable()
class CriarLivroUseCase {
  constructor(
    @inject("LivrosRepository")
    private livrosRepository: ILivrosRepository
  ) {}

  async execute({
    autor,
    titulo,
    genero,
    isbn,
    qtd_paginas
  }: ICriarLivroDTO) {
    const livroJaExisteISBN = this.livrosRepository.procurarPorIsbn(isbn);
    const livroJaExisteTitulo = this.livrosRepository.procurarPorTitulo(titulo);

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