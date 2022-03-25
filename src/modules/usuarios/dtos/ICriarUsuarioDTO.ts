interface ICriarUsuarioDTO {
  nome: string;
  senha: string;
  email: string;
  ra?: string;
  turma?: Turma;
  curso?: Curso;
}

export { ICriarUsuarioDTO };