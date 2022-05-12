import { Usuario } from "@prisma/client";

import { ICriarUsuarioDTO } from "../dtos/ICriarUsuarioDTO";

interface IUsuarioRepository {
  criar(dados: ICriarUsuarioDTO): Promise<Usuario>;
  procurarTodos(): Promise<Usuario[]>;
  procurarPorId(id: number): Promise<Usuario>; 
  procurarPorNome(nome: string): Promise<Usuario[]>;
  procurarPorEmail(email: string): Promise<Usuario>;
  procurarPorRA(ra: string): Promise<Usuario>;
  procurarPorTurma(turma: string): Promise<Usuario[]>;
  procurarPorCurso(curso: string): Promise<Usuario[]>;
}

export {IUsuarioRepository};
