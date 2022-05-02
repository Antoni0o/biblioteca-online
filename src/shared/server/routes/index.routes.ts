import { Router } from "express";
import { livroRouter } from "./livro.routes";
import { usuarioRouter } from "./usuario.routes";

const router = Router();

router.use("/usuarios", usuarioRouter);
router.use("/livros", livroRouter);

export { router };