import { Request, Response } from "express";
import { container } from "tsyringe";

import { EsqueceuASenhaUseCase } from "./EsqueceuASenhaUseCase";

class EsqueceuASenhaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const esqueceuASenhaUseCase = container.resolve(
      EsqueceuASenhaUseCase
    );

    await esqueceuASenhaUseCase.execute(email);

    return response.send();
  }
}

export { EsqueceuASenhaController };