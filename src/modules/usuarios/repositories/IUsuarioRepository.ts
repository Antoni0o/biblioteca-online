import { Usuario } from "@prisma/client";
import { ICriarUsuarioDTO } from "../dtos/ICriarUsuarioDTO";

interface IUsuarioRepository {
  criar(dados: ICriarUsuarioDTO): Promise<void>;
  procurarPorId(id: number): Promise<Usuario>; 
  procurarPorNome(nome: string): Promise<Usuario>;
  procurarPorEmail(email: string): Promise<Usuario>;
  procurarPorRA(ra: string): Promise<Usuario>;
  procurarPorTurma(turma: Turma): Promise<Usuario[]>;
  procurarPorCurso(curso: Curso): Promise<Usuario[]>;
}

export {IUsuarioRepository};