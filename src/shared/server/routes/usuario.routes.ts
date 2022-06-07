import { Router } from "express";

import { AutenticarUsuarioController } from "../../../modules/usuarios/useCases/Autenticar/AutenticarUsuarioController";
import { CriarUsuarioController } from "../../../modules/usuarios/useCases/Criar/CriarUsuarioController";
import { EsqueceuASenhaController } from "../../../modules/usuarios/useCases/EsqueceuSenha/EsqueceuASenhaController";
import { ProcurarPorIdComTokenController } from "../../../modules/usuarios/useCases/Procurar/PorId/ComToken/ProcurarPorIdComTokenController";
import { ProcurarPorNomeController } from "../../../modules/usuarios/useCases/Procurar/PorNome/ProcurarPorNomeController";
import { ResetarSenhaController } from "../../../modules/usuarios/useCases/ResetarSenha/ResetarSenhaController";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";

const usuarioRouter = Router();

const criarUsuarioController = new CriarUsuarioController();
const procurarUsuarioPorNomeController = new ProcurarPorNomeController();
const autenticarUsuarioController = new AutenticarUsuarioController();
const procurarPorIdComTokenController = new ProcurarPorIdComTokenController();
const esqueceuASenhaController = new EsqueceuASenhaController();
const resetarASenhaController = new ResetarSenhaController();

usuarioRouter.post("/", criarUsuarioController.handle);
usuarioRouter.get("/", ensureAuthentication, procurarPorIdComTokenController.handle);
usuarioRouter.get("/all", ensureAuthentication, procurarPorIdComTokenController.handle)
usuarioRouter.post("/login", autenticarUsuarioController.handle);
usuarioRouter.get("/:nome", procurarUsuarioPorNomeController.handle);
usuarioRouter.post("/esqueceu-senha", esqueceuASenhaController.handle);
usuarioRouter.post("/resetar-senha/:token/:id", resetarASenhaController.handle);

export { usuarioRouter };