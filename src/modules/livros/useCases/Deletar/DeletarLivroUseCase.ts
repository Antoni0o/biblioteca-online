import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { IUsuarioRepository } from "../../../usuarios/repositories/IUsuarioRepository";
import { ILivrosRepository } from "../../repositories/ILivrosRepository";

@injectable()
class DeletarLivroUseCase {
  constructor(
    @inject("LivrosRepository")
    private livrosRepository: ILivrosRepository,
    @inject("UsuariosRepository")
    private usuariosRepository: IUsuarioRepository
  ) {}

  async execute(user_id: number, id: number): Promise<void> {
    const usuario = await this.usuariosRepository.procurarPorId(user_id);
    const livro = await this.livrosRepository.procurarPorId(id);

    if(!usuario.admin) {
      throw new AppError("Este usuário não pode deletar livros!", 400)
    }

    if(!livro) {
      throw new AppError("Livro não encontrado", 404);
    }

    await this.livrosRepository.deletar(id);
  } 
}

export { DeletarLivroUseCase };