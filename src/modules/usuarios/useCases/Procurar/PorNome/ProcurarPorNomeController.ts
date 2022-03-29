import { Response, Request } from "express";
import { container } from "tsyringe";

import { ProcurarPorNomeUseCase } from "./ProcurarPorNomeUseCase";

class ProcurarPorNomeController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {nome} = req.params;

    const procurarPorNomeUseCase = container.resolve(ProcurarPorNomeUseCase);

    const useCase = await procurarPorNomeUseCase.execute({
      nome
    });
    
    return res.status(201).json(useCase);
  }
}

export { ProcurarPorNomeController };  