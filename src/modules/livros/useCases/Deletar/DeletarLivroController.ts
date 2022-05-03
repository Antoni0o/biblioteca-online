import { Response } from "express";
import { container } from "tsyringe";

import { AuthRequest } from "../../../../@types/express";
import { DeletarLivroUseCase } from "./DeletarLivroUseCase";

class DeletarLivroController {
  async handle(req: AuthRequest, res: Response): Promise<Response> {
    const { id: user_id } = req.user;
    const { id } = req.body;
    const deletarLivroUseCase = container.resolve(DeletarLivroUseCase);

    await deletarLivroUseCase.execute(Number(user_id), Number(id));
    
    return res.status(204).send();
  }
}

export { DeletarLivroController };