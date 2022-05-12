import { Response } from "express";
import { container } from "tsyringe";

import { AuthRequest } from "../../../../../../@types/express";
import { ProcurarTodosUseCase } from "./ProcurarTodosUseCase";

class ProcurarPorIdComTokenController {
  async handle(req: AuthRequest, res: Response): Promise<Response> {
    const procurarTodosUseCase = container.resolve(ProcurarTodosUseCase);

    const response = await procurarTodosUseCase.execute();
    
    return res.status(201).json(response);
  }
}

export { ProcurarPorIdComTokenController };  