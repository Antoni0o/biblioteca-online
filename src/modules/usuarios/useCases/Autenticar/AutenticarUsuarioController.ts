import { Request, Response } from "express";
import { container } from "tsyringe";

import { AutenticarUsuarioUseCase } from "./AutenticarUsuarioUseCase";

class AutenticarUsuarioController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, senha } = req.body;

    const useCase = container.resolve(AutenticarUsuarioUseCase);

    const token = await useCase.execute({
      email,
      senha
    })

    return res.json(token);
  }
}

export { AutenticarUsuarioController };