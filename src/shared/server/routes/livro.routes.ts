import { Router } from 'express';
import { CriarLivroController } from '../../../modules/livros/useCases/Criar/CriarLivroController';
import { DeletarLivroController } from '../../../modules/livros/useCases/Deletar/DeletarLivroController';
import { EditarLivroController } from '../../../modules/livros/useCases/Editar/EditarLivroController';
import { ProcurarPorTituloController } from '../../../modules/livros/useCases/Procurar/PorTitulo/ProcurarPorTituloController';
import { ensureAuthentication } from '../middlewares/ensureAuthentication';

const livroRouter = Router();

const criarLivroController = new CriarLivroController();
const deletarLivroController = new DeletarLivroController();
const editarLivroController = new EditarLivroController();
const procurarPorTituloController = new ProcurarPorTituloController();

livroRouter.post("/", ensureAuthentication, criarLivroController.handle);
livroRouter.delete("/", ensureAuthentication, deletarLivroController.handle);
livroRouter.put("/:id", ensureAuthentication, editarLivroController.handle);
livroRouter.get("/:titulo", ensureAuthentication, procurarPorTituloController.handle);

export { livroRouter }