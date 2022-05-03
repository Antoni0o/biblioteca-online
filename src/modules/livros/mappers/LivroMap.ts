import { Livro } from '@prisma/client';
import { classToClass } from "class-transformer";

import { ILivroReponseDTO } from '../dtos/ILivroResponseDTO';

class LivroMap {
  static paraDTO({
    isbn,
    titulo,
    autor,
    genero,
    qtd_paginas,
    capa_url,
    curtidas,
    disponivel,
  }: Livro): ILivroReponseDTO {
    const livro = classToClass({
      isbn,
      titulo,
      autor,
      genero,
      qtd_paginas,
      capa_url,
      curtidas,
      disponivel,
    });

    return livro;
  }
}

export { LivroMap };