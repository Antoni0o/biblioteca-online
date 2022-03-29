import { IUsuarioResponseDTO } from "../dtos/IUsuarioResponseDTO";
import { Usuario } from '@prisma/client';
import { classToClass } from "class-transformer";

class UsuarioMap {
  static paraDTO({
    nome,
    email,
    id,
    admin,
    curso,
    ra,
    turma
  }: Usuario): IUsuarioResponseDTO {
    const usuario = classToClass({
      id,
      nome,
      email,
      admin,
      curso,
      ra,
      turma
    });

    return usuario;
  }
}

export { UsuarioMap };