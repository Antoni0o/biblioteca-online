import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeletarLivroUseCase } from "./DeletarLivroUseCase";

class DeletarLivroController {
  async handle(req: Request, res: Response): Promise<Response> {
    const deletarLivroUseCase = container.resolve(DeletarLivroUseCase);

    await deletarLivroUseCase.execute(req.body);
    
    return res.status(204).send();
  }
}

export { DeletarLivroController };