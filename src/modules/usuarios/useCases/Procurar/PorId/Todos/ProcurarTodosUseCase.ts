import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../../../shared/errors/AppError";
import { IUsuarioResponseDTO } from "../../../../dtos/IUsuarioResponseDTO";
import { UsuarioMap } from "../../../../mappers/UsuarioMap";
import { IUsuarioRepository } from "../../../../repositories/IUsuarioRepository";

@injectable()
class ProcurarTodosUseCase {
  constructor(
    @inject("UsuariosRepository")
    private usuarioRepository: IUsuarioRepository
  ) {}

  async execute(): Promise<IUsuarioResponseDTO[]> {
    const usuarios = await this.usuarioRepository.procurarTodos();

    if(!usuarios) {
      throw new AppError("O usuário não foi encontrado!", 404);
    }

    let users = [];

    usuarios.map((usuario) => {
        users.push(UsuarioMap.paraDTO(usuario)); 
    });

    return users;
  } 
}

export { ProcurarTodosUseCase };