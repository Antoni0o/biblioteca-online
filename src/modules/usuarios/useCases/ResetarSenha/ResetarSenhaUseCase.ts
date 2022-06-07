
import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";
import { IUsuarioRepository } from "../../repositories/IUsuarioRepository";
import prismaClient from "../../../../prisma";
import { AppError } from "../../../../shared/errors/AppError";

interface IRequest {
  token: string;
  id: number;
  password: string;
}

@injectable()
class ResetarSenhaUseCase {
  constructor(
    @inject("UsuariosRepository")
    private usuarioRepository: IUsuarioRepository
  ) {}
  async execute({ token, id, password }: IRequest): Promise<void> {
    if (!token) {
      throw new AppError("Token Inválido!", 400);
    }

    const user = await this.usuarioRepository.procurarPorId(id);

    if (!user) {
      throw new AppError("Usuário não encontrado!", 404);
    }

    user.senha = await hash(password, 8);

    await this.usuarioRepository.criar(user);

    await prismaClient.usuario.delete({ where: { id } });
  }
}

export { ResetarSenhaUseCase };