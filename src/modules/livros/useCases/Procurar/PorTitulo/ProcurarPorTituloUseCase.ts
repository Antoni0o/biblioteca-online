import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../../shared/errors/AppError";
import { LivroMap } from "../../../mappers/LivroMap";
import { ILivrosRepository } from "../../../repositories/ILivrosRepository";

@injectable()
class ProcurarPorTituloUseCase {
  constructor(
    @inject("LivrosRepository")
    private livrosRepository: ILivrosRepository,
  ) {}

  async execute(titulo: string) {
    const livros = await this.livrosRepository.procurarPorTitulo(titulo);

    if(!livros) {
      throw new AppError("O livro não foi encontrado!", 404);
    }

    let livrosMapeados: LivroMap[] = [];

    livros.map(livro => {
      livrosMapeados.push(LivroMap.paraDTO(livro));
    })

    return livrosMapeados;
  }
}

export { ProcurarPorTituloUseCase };