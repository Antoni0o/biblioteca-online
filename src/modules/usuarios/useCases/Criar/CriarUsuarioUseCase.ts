import { Usuario } from "@prisma/client";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { ICriarUsuarioDTO } from "../../dtos/ICriarUsuarioDTO";
import { IUsuarioResponseDTO } from "../../dtos/IUsuarioResponseDTO";
import { UsuarioMap } from "../../mappers/UsuarioMap";
import { IUsuarioRepository } from "../../repositories/IUsuarioRepository";

@injectable()
class CriarUsuarioUseCase {
  constructor(
    @inject("UsuariosRepository")
    private usuarioRepository: IUsuarioRepository
  ) {}

  async execute({
    nome,
    email,
    senha,
    admin,
    ra,
    curso,
    turma
  }: ICriarUsuarioDTO): Promise<IUsuarioResponseDTO> {
    let user: Usuario;
    const usuarioExiste = await this.usuarioRepository.procurarPorEmail(email);

    if(usuarioExiste) {
      throw new AppError("O usuário já existe!", 400);
    }

    const hashSenha = await hash(senha, 8);

    if(admin) {
      user = await this.usuarioRepository.criar({
        nome,
        email,
        senha: hashSenha,
        admin
      });
    } else {
      user = await this.usuarioRepository.criar({
        nome, 
        email,
        senha: hashSenha,
        ra,
        curso,
        turma
      });
    }

    return UsuarioMap.paraDTO(user);
  }
}

export { CriarUsuarioUseCase };