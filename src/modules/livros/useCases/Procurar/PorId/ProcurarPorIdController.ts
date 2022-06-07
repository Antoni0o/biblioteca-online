import { Response } from "express";
import { container } from "tsyringe";

import { AuthRequest } from "../../../../../@types/express";
import { ProcurarPorIdUseCase } from "./ProcurarPorIdUseCase";

class ProcurarPorIdController {
  async handle(req: AuthRequest, res: Response): Promise<Response> {
    const { id } = req.params;

    const procurarPorIdUseCase = container.resolve(ProcurarPorIdUseCase);

    const useCase = await procurarPorIdUseCase.execute(Number(id));

    return res.status(200).json(useCase);
  }
}

export { ProcurarPorIdController };