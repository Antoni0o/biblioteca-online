import { Response } from "express";
import { container } from "tsyringe";

import { AuthRequest } from "../../../../@types/express";
import { CriarLivroUseCase } from "./CriarLivroUseCase";

class CriarLivroController {
  async handle(req: AuthRequest, res: Response): Promise<Response> {
    const request = req.body;
    const { id: user_id } = req.user;

    const criarLivroUseCase = container.resolve(CriarLivroUseCase);

    const livro = await criarLivroUseCase.execute(Number(user_id), request);

    return res.status(201).json(livro)
  }
}

export { CriarLivroController };