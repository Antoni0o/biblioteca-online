import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../../shared/errors/AppError";
import { LivroMap } from "../../../mappers/LivroMap";
import { ILivrosRepository } from "../../../repositories/ILivrosRepository";

@injectable()
class ProcurarTodosUseCase {
  constructor(
    @inject("LivrosRepository")
    private livrosRepository: ILivrosRepository,
  ) {}

  async execute() {
    const livros = await this.livrosRepository.procurarTodos();

    if(!livros) {
      throw new AppError("Os livro não foram encontrados!", 404);
    }

    let livrosMapeados: LivroMap[] = [];

    livros.map(livro => {
      livrosMapeados.push(LivroMap.paraDTO(livro));
    })

    return livrosMapeados;
  }
}

export { ProcurarTodosUseCase };