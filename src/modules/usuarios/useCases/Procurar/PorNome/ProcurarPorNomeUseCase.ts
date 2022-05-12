import { Usuario } from "@prisma/client";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../../shared/errors/AppError";
import { IProcurarUsuarioDTO } from "../../../dtos/IProcurarUsuarioDTO";
import { IUsuarioResponseDTO } from "../../../dtos/IUsuarioResponseDTO";
import { UsuarioMap } from "../../../mappers/UsuarioMap";
import { IUsuarioRepository } from "../../../repositories/IUsuarioRepository";

@injectable()
class ProcurarPorNomeUseCase {
  constructor(
    @inject("UsuariosRepository")
    private usuarioRepository: IUsuarioRepository
  ) {}

  async execute({
    nome
  }: IProcurarUsuarioDTO): Promise<IUsuarioResponseDTO[]> {
    const usuarios = await this.usuarioRepository.procurarPorNome(nome);

    if(!usuarios) {
      throw new AppError("O usuário não foi encontrado!", 404);
    }
    
    let users: IUsuarioResponseDTO[] = [];

    usuarios.map(usuario => {
      if(usuario.admin) {
        delete usuario.ra;
        delete usuario.turma;
        delete usuario.curso;
      }

      users = [UsuarioMap.paraDTO(usuario)]
    })

    return users;
  } 
}

export { ProcurarPorNomeUseCase };