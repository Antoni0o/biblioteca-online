import { Livro } from '@prisma/client';

import { ICriarLivroDTO } from '../dtos/ICriarLivroDTO';

interface ILivrosRepository {
  criar(dados: ICriarLivroDTO): Promise<Livro>;
  deletar(id: number): Promise<void>;
  procurarPorId(id: number): Promise<Livro>; 
  procurarPorTitulo(titulo: string): Promise<Livro>;
  procurarPorGenero(genero: string): Promise<Livro[]>;
  procurarPorAutor(autor: string): Promise<Livro[]>;
  procurarPorIsbn(isbn: string): Promise<Livro>;
}

export {ILivrosRepository};
