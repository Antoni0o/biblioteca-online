import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import auth from "../../../../utils/auth";
import { IUsuarioRepository } from "../../repositories/IUsuarioRepository";

interface IRequest {
  email: string;
  senha: string;
}

interface IResponse {
  usuario: {
    nome: string;
    email: string;
    admin: boolean;
    ra?: string;
    turma?: string;
    curso: string;
  };
  token: string;
}

@injectable()
class AutenticarUsuarioUseCase {
  constructor(
    @inject("UsuarioRepository")
    private usuarioRepository: IUsuarioRepository,
  ) {}

  async execute({ email, senha }: IRequest): Promise<IResponse> {
    if(!email || !senha) {
      throw new AppError("Email ou senha estão faltando!", 400);
    }

    const usuario = await this.usuarioRepository.procurarPorEmail(email);
    
    if(!usuario) {
      throw new AppError("Email ou senha incorretos!", 400);
    }

    const senhaComparada = await compare(senha, usuario.senha);

    if(!senhaComparada) {
      throw new AppError("Email ou senha incorretos!", 400);
    }
    
    const { secret, expiresIn } = auth.jwt; 

    const token = sign({ usuario }, secret, {
      subject: String(usuario.id),
      expiresIn
    });

    if(usuario.admin) {
      delete usuario.curso;
      delete usuario.ra;
      delete usuario.turma;
      delete usuario.senha;
      delete usuario.id;
    } else {
      delete usuario.id;
      delete usuario.senha;
    }

    return {
      usuario: {
        ...usuario
      },
      token
    }
  }
}

export { AutenticarUsuarioUseCase };