import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { ILivrosRepository } from "../../repositories/ILivrosRepository";

@injectable()
class DeletarLivroUseCase {
  constructor(
    @inject("LivrosRepository")
    private livrosRepository: ILivrosRepository
  ) {}

  async execute(id: number): Promise<void> {
    const livro = await this.livrosRepository.procurarPorId(id);

    if(!livro) {
      throw new AppError("Livro não encontrado", 404);
    }

    await this.livrosRepository.deletar(id);
  } 
}

export { DeletarLivroUseCase };