import { Request, Response } from "express";
import { container } from "tsyringe";
import { ResetarSenhaUseCase } from "./ResetarSenhaUseCase";



class ResetarSenhaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token, id } = request.params;
    const { password } = request.body;
    const resetarSenhaUseCase = container.resolve(
        ResetarSenhaUseCase
    );

    await resetarSenhaUseCase.execute({ token: String(token), id: Number(id), password: String(password) });

    return response.send();
  }
}

export { ResetarSenhaController };