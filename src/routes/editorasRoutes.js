import { Router } from 'express'
import { EditorasController } from '../controllers/EditorasController.js'
import { Restrito } from '../utils/restrito.js'

const editorasRouter = Router()

editorasRouter
    .get('/editoras/', EditorasController.get_editoras)
    .get('/editoras/:id', EditorasController.get_editora_id)
    .get('/adm/editoras', Restrito,EditorasController.get_editora_adm)
    .get('/adm/editoras/:id', Restrito,EditorasController.get_editora_id_adm)
    .post('/editoras/', Restrito, EditorasController.post_editora)
    .put('/editoras/:id', Restrito, EditorasController.put_editora)
    .delete('/editoras/:id', Restrito, EditorasController.delete_editora)

export { editorasRouter }