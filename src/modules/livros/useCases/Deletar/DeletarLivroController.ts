import { Response } from "express";
import { container } from "tsyringe";
import { AuthRequest } from "../../../../@types/express";

import { DeletarLivroUseCase } from "./DeletarLivroUseCase";

class DeletarLivroController {
  async handle(req: AuthRequest, res: Response): Promise<Response> {
    const deletarLivroUseCase = container.resolve(DeletarLivroUseCase);

    await deletarLivroUseCase.execute(req.body);
    
    return res.status(204).send();
  }
}

export { DeletarLivroController };