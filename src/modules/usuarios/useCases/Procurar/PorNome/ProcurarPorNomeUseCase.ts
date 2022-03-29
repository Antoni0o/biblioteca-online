import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../../shared/errors/AppError";
import { IProcurarUsuarioDTO } from "../../../dtos/IProcurarUsuarioDTO";
import { IUsuarioResponseDTO } from "../../../dtos/IUsuarioResponseDTO";
import { UsuarioMap } from "../../../mappers/UsuarioMap";
import { IUsuarioRepository } from "../../../repositories/IUsuarioRepository";

@injectable()
class ProcurarPorNomeUseCase {
  constructor(
    @inject("UsuarioRepository")
    private usuarioRepository: IUsuarioRepository
  ) {}

  async execute({
    nome
  }: IProcurarUsuarioDTO): Promise<IUsuarioResponseDTO> {
    const usuario = await this.usuarioRepository.procurarPorNome(nome);

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

export { ProcurarPorNomeUseCase };