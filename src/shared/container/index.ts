import { container } from "tsyringe";

import "./providers"

import { ILivrosRepository } from "../../modules/livros/repositories/ILivrosRepository";
import { LivrosRepository } from "../../modules/livros/repositories/LivrosRepository";
 
import { IUsuarioRepository } from "../../modules/usuarios/repositories/IUsuarioRepository";
import { UsuarioRepository } from "../../modules/usuarios/repositories/UsuarioRepository";

container.registerSingleton<IUsuarioRepository>(
  "UsuariosRepository",
  UsuarioRepository
);

container.registerSingleton<ILivrosRepository>(
  "LivrosRepository",
  LivrosRepository
);