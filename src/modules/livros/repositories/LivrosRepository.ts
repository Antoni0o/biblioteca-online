import { Livro } from "@prisma/client";
import prismaClient from "../../../prisma";

import { ICriarLivroDTO } from "../dtos/ICriarLivroDTO";
import { ILivrosRepository } from "./ILivrosRepository";

class LivrosRepository implements ILivrosRepository {
  
  async criar({
    autor,
    genero,
    isbn,
    qtd_paginas,
    titulo
  }: ICriarLivroDTO): Promise<Livro> {
      const livro = await prismaClient.livro.create({ data: {
        titulo,
        autor,
        qtd_paginas,
        genero,
        isbn,
        disponivel: false,
        curtidas: 0,
      }});

      return livro;
  }

  async deletar(id: number): Promise<void> {
    await prismaClient.livro.delete({ where: { id } });
  }

  async procurarTodos(): Promise<Livro[]> {
    const books = await prismaClient.livro.findMany();
    return books;
  }

  async procurarPorId(id: number): Promise<Livro> {
    const books = await prismaClient.livro.findFirst({ where: { id } });
    return books;
  }

  async procurarPorTitulo(titulo: string): Promise<Livro[]> {
    const books = await prismaClient.livro.findMany({ where: { titulo: { contains: titulo } } });
    return books;
  }

  async procurarPorIsbn(isbn: string): Promise<Livro> {
    const book = await prismaClient.livro.findFirst({ where: { isbn: isbn } });
    return book;
  }

  async procurarPorAutor(autor: string): Promise<Livro[]> {
    const books = await prismaClient.livro.findMany({ where: { autor: { contains: autor } } });
    return books;
  }

  async procurarPorGenero(genero: string): Promise<Livro[]> {
    const books = await prismaClient.livro.findMany({ where: { genero: { contains: genero } } });
    return books;
  }
  
}

export { LivrosRepository };