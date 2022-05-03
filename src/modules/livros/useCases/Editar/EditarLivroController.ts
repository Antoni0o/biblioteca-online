import { Request, Response } from "express";
import { container } from "tsyringe";

import { EditarLivroUseCase } from "./EditarLivroUseCase";

class EditarLivroController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const {autor, genero, isbn, qtd_paginas, titulo} = req.body; 

    const editarLivroUseCase = container.resolve(EditarLivroUseCase);

    const useCase = await editarLivroUseCase.execute(Number(id), {
      autor,
      genero,
      isbn,
      qtd_paginas,
      titulo
    })

    return res.status(200).json(useCase)
  }
}

export { EditarLivroController };