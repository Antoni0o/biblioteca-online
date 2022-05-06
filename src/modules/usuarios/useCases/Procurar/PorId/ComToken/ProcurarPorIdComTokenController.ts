import { Response } from "express";
import { container } from "tsyringe";

import { AuthRequest } from "../../../../../../@types/express";
import { ProcurarPorIdComTokenUseCase } from "./ProcurarPorIdComTokenUseCase";

class ProcurarPorIdComTokenController {
  async handle(req: AuthRequest, res: Response): Promise<Response> {
    const {id} = req.user;

    const procurarPorIdComTokenUseCase = container.resolve(ProcurarPorIdComTokenUseCase);

    const response = await procurarPorIdComTokenUseCase.execute(id);
    
    return res.status(201).json(response);
  }
}

export { ProcurarPorIdComTokenController };  