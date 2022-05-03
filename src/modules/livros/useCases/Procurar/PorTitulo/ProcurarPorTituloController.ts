import { Response } from "express";
import { container } from "tsyringe";

import { AuthRequest } from "../../../../../@types/express";
import { ProcurarPorTituloUseCase } from "./ProcurarPorTituloUseCase";

class ProcurarPorTituloController {
  async handle(req: AuthRequest, res: Response): Promise<Response> {
    const { titulo } = req.params;

    const procurarPorTituloUseCase = container.resolve(ProcurarPorTituloUseCase);

    const useCase = procurarPorTituloUseCase.execute(titulo);

    return res.status(200).json(useCase);
  }
}

export { ProcurarPorTituloController };