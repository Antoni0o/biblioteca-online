import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { ICriarUsuarioDTO } from "../../dtos/ICriarUsuarioDTO";
import { IUsuarioRepository } from "../../repositories/IUsuarioRepository";

@injectable()
class CriarUsuarioUseCase {
  constructor(
    @inject("UsuarioRepository")
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
  }: ICriarUsuarioDTO): Promise<void> {
    const usuarioExiste = await this.usuarioRepository.procurarPorEmail(email);

    if(usuarioExiste) {
      throw new AppError("O usuário já existe!", 400);
    }

    const hashSenha = await hash(senha, 8);

    if(admin) {
      await this.usuarioRepository.criar({
        nome,
        email,
        senha: hashSenha,
        admin
      });
    } else {
      await this.usuarioRepository.criar({
        nome, 
        email,
        senha: hashSenha,
        ra,
        curso,
        turma
      });
    }
  }
}

export { CriarUsuarioUseCase };