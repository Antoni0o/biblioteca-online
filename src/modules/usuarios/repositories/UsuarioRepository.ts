import { Usuario } from "@prisma/client";
import prismaClient from "../../../prisma";

import { ICriarUsuarioDTO } from "../dtos/ICriarUsuarioDTO";
import { IUsuarioRepository } from "./IUsuarioRepository";

class UsuarioRepository implements IUsuarioRepository {
  
  async criar({
    nome,
    email,
    senha,
    admin,
    curso,
    ra,
    turma,
  }: ICriarUsuarioDTO): Promise<Usuario> {
      const user = await prismaClient.usuario.create({ data: {
        nome,
        email,
        senha,
        admin,
        curso,
        ra,
        turma,
      }});

      return user;
  }

  async procurarTodos(): Promise<Usuario[]> {
    const users = await prismaClient.usuario.findMany();

    return users;
  }

  async procurarPorId(id: number): Promise<Usuario> {
      const user = await prismaClient.usuario.findFirst({ where: {id} });

      return user;
  }

  async procurarPorNome(nome: string): Promise<Usuario[]> {
      const users = await prismaClient.usuario.findMany({ where: {nome} });

      return users;
  }

  async procurarPorRA(ra: string): Promise<Usuario> {
    const user = await  prismaClient.usuario.findFirst({ where: {ra} });
    
    return user;
  }

  async procurarPorEmail(email: string): Promise<Usuario> {
      const user = await prismaClient.usuario.findFirst({ where: {email} });

      return user;
  }

  procurarPorCurso(curso: string): Promise<Usuario[]> {
    const users = prismaClient.usuario.findMany({ where: {curso} });
      
    return users;
  }

  procurarPorTurma(turma: string): Promise<Usuario[]> {
    const users = prismaClient.usuario.findMany({ where: {turma} });
      
    return users;
  }

}

export { UsuarioRepository };