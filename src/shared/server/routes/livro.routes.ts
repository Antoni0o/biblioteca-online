import { Router } from 'express';
import { CriarLivroController } from '../../../modules/livros/useCases/Criar/CriarLivroController';
import { DeletarLivroController } from '../../../modules/livros/useCases/Deletar/DeletarLivroController';

const livroRouter = Router();

const criarLivroController = new CriarLivroController();
const deletarLivroController = new DeletarLivroController();

livroRouter.post("/", criarLivroController.handle);
livroRouter.delete("/", deletarLivroController.handle);

export { livroRouter }