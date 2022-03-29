interface ICriarUsuarioDTO {
  nome: string;
  senha: string;
  email: string;
  admin?: boolean;
  ra?: string;
  turma?: string;
  curso?: string;
}

export { ICriarUsuarioDTO };