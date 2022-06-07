import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../../shared/errors/AppError";
import { LivroMap } from "../../../mappers/LivroMap";
import { ILivrosRepository } from "../../../repositories/ILivrosRepository";

@injectable()
class ProcurarPorIdUseCase {
  constructor(
    @inject("LivrosRepository")
    private livrosRepository: ILivrosRepository,
  ) {}

  async execute(id: number) {
    const livro = await this.livrosRepository.procurarPorId(id);

    if(!livro) {
      throw new AppError("O livro não foi encontrado!", 404);
    }

    return LivroMap.paraDTO(livro);
  }
}

export { ProcurarPorIdUseCase };