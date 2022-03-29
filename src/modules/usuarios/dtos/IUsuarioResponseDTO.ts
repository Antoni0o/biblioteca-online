interface IUsuarioResponseDTO {
  id: number;
  nome: string;
  email: string;
  admin: boolean;
  ra?: string;
  turma?: string;
  curso?: string;
}

export { IUsuarioResponseDTO };