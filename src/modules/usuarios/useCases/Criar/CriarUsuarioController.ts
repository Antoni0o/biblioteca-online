import { Response, Request } from "express";
import { container } from "tsyringe";

import { CriarUsuarioUseCase } from "./CriarUsuarioUseCase";

class CriarUsuarioController {
  async handle(req: Request, res: Response): Promise<Response> {
    const request = req.body;

    const criarUsuarioUseCase = container.resolve(CriarUsuarioUseCase);

    console.log(request);

    await criarUsuarioUseCase.execute({
      ...request
    });

    return res.status(201).send();
  }
}

export { CriarUsuarioController };  