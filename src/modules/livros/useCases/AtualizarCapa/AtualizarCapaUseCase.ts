import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import { inject, injectable } from "tsyringe";
import prismaClient from "../../../../prisma";

import { AppError } from "../../../../shared/errors/AppError";
import { IUsuarioRepository } from "../../../usuarios/repositories/IUsuarioRepository";
import { LivroMap } from "../../mappers/LivroMap";
import { ILivrosRepository } from "../../repositories/ILivrosRepository";

interface ILivrosRequest {
  id: number;
  capa_url: string
}

dayjs.extend(utc);

@injectable()
class AtualizarCapaUseCase {
  constructor(
    @inject("LivrosRepository")
    private livrosRepository: ILivrosRepository,
    @inject("UsuariosRepository")
    private usuariosRepository: IUsuarioRepository
  ) {}

  async execute(user_id: number, {id, capa_url}: ILivrosRequest) {
    const usuario = await this.usuariosRepository.procurarPorId(user_id);
    const livro = await this.livrosRepository.procurarPorId(id)

    if(!usuario.admin) {
      throw new AppError("Este usuário não pode atualizar uma capa!", 400);
    }

    if(!livro) {
      throw new AppError("Livro não encontrado", 404);
    }

    const dateNow = dayjs().utc(true).format();

    const livroAtualizado = await prismaClient.livro.update({
      where: {
        id
      },
      data: {
        capa_url,
        updated_at: dateNow
      }
    });

    return LivroMap.paraDTO(livroAtualizado)
  }
}

export { AtualizarCapaUseCase }