import { Router } from 'express';
import { LivrosController } from '../controllers/LivrosController.js';
import { Restrito } from '../utils/restrito.js';

const livrosRouter = Router();

livrosRouter
    .get('/livros/', LivrosController.get_livros)
    .get('/livros/:id', LivrosController.get_livro_id)
    .get('/adm/livros/', Restrito, LivrosController.get_livros_adm)
    .get('/adm/livros/:id', Restrito,LivrosController.get_livro_id_adm)
    .post('/livros/', Restrito, LivrosController.post_livro)
    .put('/livros/:id', Restrito, LivrosController.put_livro)
    .delete('/livros/:id',Restrito, LivrosController.delete_livro)

export { livrosRouter }