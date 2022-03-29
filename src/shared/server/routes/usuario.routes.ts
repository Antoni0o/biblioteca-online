import { Router } from "express";

import { CriarUsuarioController } from "../../../modules/usuarios/useCases/Criar/CriarUsuarioController";
import { ProcurarPorNomeController } from "../../../modules/usuarios/useCases/Procurar/PorNome/ProcurarPorNomeController";
import { ProcurarPorNomeUseCase } from "../../../modules/usuarios/useCases/Procurar/PorNome/ProcurarPorNomeUseCase";

const usuarioRouter = Router();

const criarUsuarioController = new CriarUsuarioController();
const procurarUsuarioPorNomeController = new ProcurarPorNomeController();

usuarioRouter.post("/", criarUsuarioController.handle);
usuarioRouter.get("/:nome", procurarUsuarioPorNomeController.handle);

export { usuarioRouter };