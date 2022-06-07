import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";
import { sign } from "jsonwebtoken";
import { resolve } from "path";
import { IUsuarioRepository } from "../../repositories/IUsuarioRepository";
import { AppError } from "../../../../shared/errors/AppError";
import auth from "../../../../utils/auth";
import { IMailProvider } from "../../../../shared/container/providers/MailProvider/IMailProvider";


@injectable()
class EsqueceuASenhaUseCase {
  constructor(
    @inject("UsuariosRepository")
    private usuarioRepository: IUsuarioRepository,
    @inject("MailProvider")
    private mailProvider: IMailProvider
  ) {}

  async execute(email: string): Promise<void> {
    const usuario = await this.usuarioRepository.procurarPorEmail(email);

    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "forgotPassword.hbs"
    );

    if (!usuario) {
      throw new AppError("Usuario não existe!", 404);
    }

    const { secret, expiresIn } = auth.jwt; 

    const token = sign({id: uuidV4()}, secret, {
      subject: String(usuario.id),
      expiresIn
    });
    

    const variables = {
      name: usuario.nome,
      link: `http://localhost:4000/usuarios/resetar-senha/${token}/${usuario.id}`,
    };

    await this.mailProvider.sendMail(
      email,
      "Recuperação de Senha",
      variables,
      templatePath
    );
  }
}

export { EsqueceuASenhaUseCase };