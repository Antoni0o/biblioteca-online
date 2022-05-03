import { inject, injectable } from "tsyringe";
import prismaClient from "../../../../prisma";
import { AppError } from "../../../../shared/errors/AppError";
import { ICriarLivroDTO } from "../../dtos/ICriarLivroDTO";
import { LivroMap } from "../../mappers/LivroMap";
import { ILivrosRepository } from "../../repositories/ILivrosRepository";

@injectable()
class EditarLivroUseCase {
  constructor(
    @inject("LivrosRepository")
    private livrosRepository: ILivrosRepository
  ) {}

  async execute(id: number, {
    autor,
    genero,
    isbn,
    qtd_paginas,
    titulo
  }: ICriarLivroDTO) {
    const livro = await this.livrosRepository.procurarPorId(id);
    
    if(!livro) {
      throw new AppError("Este livro não existe!", 404);
    }

    const resultado = await prismaClient.livro.update({ 
      where: {
        id
      },
      data: {
        autor: autor === "" ? livro.autor : autor,
        genero: genero === "" ? livro.genero : genero,
        isbn: isbn === "" ? livro.isbn : isbn,
        qtd_paginas: qtd_paginas === 0 || !qtd_paginas ? livro.qtd_paginas : qtd_paginas,
        titulo: titulo === "" ? livro.titulo : titulo
      } 
    });
      
    return LivroMap.paraDTO(resultado);
  }
}

export { EditarLivroUseCase };