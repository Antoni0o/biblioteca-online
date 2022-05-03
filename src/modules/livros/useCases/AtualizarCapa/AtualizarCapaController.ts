import { Response } from "express";
import { container } from "tsyringe";
import { AuthRequest } from "../../../../@types/express";
import { AtualizarCapaUseCase } from "./AtualizarCapaUseCase";

class AtualizarCapaController {
  async handle(req: AuthRequest, res: Response): Promise<Response> {
    const { id: user_id } = req.user;
    const id = Number(req.params.id);
    const capaNome = req.file.filename;
    const capa_url = `http://localhost:4000/capa/${capaNome}`;
    
    const atualizarCapaUseCase = container.resolve(AtualizarCapaUseCase);
    const useCase = await atualizarCapaUseCase.execute(Number(user_id), {id, capa_url});

    return res.status(200).json(useCase);
  }
}

export { AtualizarCapaController };