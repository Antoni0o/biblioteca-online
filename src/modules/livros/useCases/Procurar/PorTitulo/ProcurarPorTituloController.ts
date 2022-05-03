import { Request, Response } from "express";
import { container } from "tsyringe";

import { ProcurarPorTituloUseCase } from "./ProcurarPorTituloUseCase";

class ProcurarPorTituloController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { titulo } = req.params;

    const procurarPorTituloUseCase = container.resolve(ProcurarPorTituloUseCase);

    const useCase = procurarPorTituloUseCase.execute(titulo);

    return res.status(200).json(useCase);
  }
}

export { ProcurarPorTituloController };