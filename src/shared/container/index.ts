 import { container } from "tsyringe";
 
import { IUsuarioRepository } from "../../modules/usuarios/repositories/IUsuarioRepository";
import { UsuarioRepository } from "../../modules/usuarios/repositories/UsuarioRepository";

container.registerSingleton<IUsuarioRepository>(
  "UsuarioRepository",
  UsuarioRepository
);