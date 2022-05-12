import { Response } from "express";
import { container } from "tsyringe";

import { AuthRequest } from "../../../../../@types/express";
import { ProcurarTodosUseCase } from "./ProcurarTodosUseCase";

class ProcurarTodosController {
  async handle(req: AuthRequest, res: Response): Promise<Response> {
    const procurarTodosUseCase = container.resolve(ProcurarTodosUseCase);

    const useCase = await procurarTodosUseCase.execute();

    return res.status(200).json(useCase);
  }
}

export { ProcurarTodosController };