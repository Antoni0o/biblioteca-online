import { Router } from "express";

import { AutenticarUsuarioController } from "../../../modules/usuarios/useCases/Autenticar/AutenticarUsuarioController";
import { CriarUsuarioController } from "../../../modules/usuarios/useCases/Criar/CriarUsuarioController";
import { ProcurarPorNomeController } from "../../../modules/usuarios/useCases/Procurar/PorNome/ProcurarPorNomeController";

const usuarioRouter = Router();

const criarUsuarioController = new CriarUsuarioController();
const procurarUsuarioPorNomeController = new ProcurarPorNomeController();
const autenticarUsuarioController = new AutenticarUsuarioController();

usuarioRouter.post("/", criarUsuarioController.handle);
usuarioRouter.post("/login", autenticarUsuarioController.handle);
usuarioRouter.get("/:nome", procurarUsuarioPorNomeController.handle);

export { usuarioRouter };