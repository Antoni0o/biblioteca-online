import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../../../shared/errors/AppError";
import { IUsuarioResponseDTO } from "../../../../dtos/IUsuarioResponseDTO";
import { UsuarioMap } from "../../../../mappers/UsuarioMap";
import { IUsuarioRepository } from "../../../../repositories/IUsuarioRepository";

@injectable()
class ProcurarPorIdComTokenUseCase {
  constructor(
    @inject("UsuariosRepository")
    private usuarioRepository: IUsuarioRepository
  ) {}

  async execute(id: number): Promise<IUsuarioResponseDTO> {
    const usuario = await this.usuarioRepository.procurarPorId(id);

    if(!usuario) {
      throw new AppError("O usuário não foi encontrado!", 404);
    }
    
    if(usuario.admin) {
      delete usuario.ra;
      delete usuario.turma;
      delete usuario.curso;
    }

    return UsuarioMap.paraDTO(usuario);
  } 
}

export { ProcurarPorIdComTokenUseCase };