import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../../shared/errors/AppError";
import { LivroMap } from "../../../mappers/LivroMap";
import { ILivrosRepository } from "../../../repositories/ILivrosRepository";

@injectable()
class ProcurarPorTituloUseCase {
  constructor(
    @inject("LivrosRepository")
    private livrosRepository: ILivrosRepository
  ) {}

  async execute(titulo: string) {
    const livro = await this.livrosRepository.procurarPorTitulo(titulo);

    if(!livro) {
      throw new AppError("Livro não encontrado!", 404);
    }

    return LivroMap.paraDTO(livro);
  }
}

export { ProcurarPorTituloUseCase };