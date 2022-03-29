import { ICriarUsuarioDTO } from "../dtos/ICriarUsuarioDTO";

interface IUsuarioRepository {
  criar(dados: ICriarUsuarioDTO);
  procurarPorId(id: number); 
  procurarPorNome(nome: string);
  procurarPorEmail(email: string);
  procurarPorRA(ra: string);
  procurarPorTurma(turma: string);
  procurarPorCurso(curso: string);
}

export { IUsuarioRepository };