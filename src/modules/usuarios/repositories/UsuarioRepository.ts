import { Usuario } from "@prisma/client";
import prismaClient from "../../../prisma";

import { ICriarUsuarioDTO } from "../dtos/ICriarUsuarioDTO";
import { IUsuarioRepository } from "./IUsuarioRepository";

class UsuarioRepository implements IUsuarioRepository {
  
  async criar({
    nome,
    email,
    senha,
    curso,
    ra,
    turma,
  }: ICriarUsuarioDTO): Promise<void> {
      prismaClient.usuario.create({ data: {
        nome,
        email,
        senha,
        curso,
        ra,
        turma,
      }});
  }

  procurarPorId(id: number): Promise<Usuario> {
      const user = prismaClient.usuario.findFirst({ where: {id} });

      return user;
  }

  procurarPorNome(nome: string): Promise<Usuario> {
      const user = prismaClient.usuario.findFirst({ where: {nome} });

      return user;
  }

  procurarPorRA(ra: string): Promise<Usuario> {
    const user = prismaClient.usuario.findFirst({ where: {ra} });
    
    return user;
  }

  procurarPorEmail(email: string): Promise<Usuario> {
      const user = prismaClient.usuario.findFirst({ where: {email} });

      return user;
  }

  procurarPorCurso(curso: Curso): Promise<Usuario[]> {
    const users = prismaClient.usuario.findMany({ where: {curso} });
      
    return users;
  }

  procurarPorTurma(turma: Turma): Promise<Usuario[]> {
    const users = prismaClient.usuario.findMany({ where: {turma} });
      
    return users;
  }

}

export { UsuarioRepository };