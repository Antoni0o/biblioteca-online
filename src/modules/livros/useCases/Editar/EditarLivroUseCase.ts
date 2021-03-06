import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import { inject, injectable } from "tsyringe";
import prismaClient from "../../../../prisma";

import { AppError } from "../../../../shared/errors/AppError";
import { IUsuarioRepository } from "../../../usuarios/repositories/IUsuarioRepository";
import { ICriarLivroDTO } from "../../dtos/ICriarLivroDTO";
import { LivroMap } from "../../mappers/LivroMap";
import { ILivrosRepository } from "../../repositories/ILivrosRepository";

dayjs.extend(utc);

@injectable()
class EditarLivroUseCase {
  constructor(
    @inject("LivrosRepository")
    private livrosRepository: ILivrosRepository,
    @inject("UsuariosRepository")
    private usuariosRepository: IUsuarioRepository
  ) {}

  async execute(user_id: number, id: number, {
    autor,
    genero,
    isbn,
    qtd_paginas,
    titulo
  }: ICriarLivroDTO) {
    const usuario = await this.usuariosRepository.procurarPorId(user_id);
    const livro = await this.livrosRepository.procurarPorId(id);
    
    if(!usuario.admin) {
      throw new AppError("Este usuário não pode editar livros!", 400)
    }

    if(!livro) {
      throw new AppError("Este livro não existe!", 404);
    }

    const dateNow = dayjs().utc(true).format();

    const resultado = await prismaClient.livro.update({ 
      where: {
        id
      },
      data: {
        autor: autor === "" ? livro.autor : autor,
        genero: genero === "" ? livro.genero : genero,
        isbn: isbn === "" ? livro.isbn : isbn,
        qtd_paginas: qtd_paginas === 0 || !qtd_paginas ? livro.qtd_paginas : qtd_paginas,
        titulo: titulo === "" ? livro.titulo : titulo,
        updated_at: dateNow
      } 
    });
      
    return LivroMap.paraDTO(resultado);
  }
}

export { EditarLivroUseCase };