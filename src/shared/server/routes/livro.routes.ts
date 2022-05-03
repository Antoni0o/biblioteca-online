import { Router } from 'express';
import multer from 'multer';

import { storage } from '../../../config/upload';
import { AtualizarCapaController } from '../../../modules/livros/useCases/AtualizarCapa/AtualizarCapaController';
import { CriarLivroController } from '../../../modules/livros/useCases/Criar/CriarLivroController';
import { DeletarLivroController } from '../../../modules/livros/useCases/Deletar/DeletarLivroController';
import { EditarLivroController } from '../../../modules/livros/useCases/Editar/EditarLivroController';
import { ProcurarPorTituloController } from '../../../modules/livros/useCases/Procurar/PorTitulo/ProcurarPorTituloController';
import { ensureAuthentication } from '../middlewares/ensureAuthentication';

const livroRouter = Router();
const upload = multer({ storage });

const criarLivroController = new CriarLivroController();
const deletarLivroController = new DeletarLivroController();
const editarLivroController = new EditarLivroController();
const procurarPorTituloController = new ProcurarPorTituloController();
const autalizarCapaController = new AtualizarCapaController();

livroRouter.post("/", ensureAuthentication, criarLivroController.handle);
livroRouter.delete("/:id", ensureAuthentication, deletarLivroController.handle);
livroRouter.put("/:id", ensureAuthentication, editarLivroController.handle);
livroRouter.patch("/capa/:id", ensureAuthentication, upload.single('img'), autalizarCapaController.handle);
livroRouter.get("/:titulo", ensureAuthentication, procurarPorTituloController.handle);

export { livroRouter }