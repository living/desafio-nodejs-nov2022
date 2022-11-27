import { Router } from "express";
import { ADMController } from "../controllers/admController.js";
import { Restrito } from "../utils/restrito.js";

const admRouter = Router()

admRouter
    .get('/adm', Restrito, ADMController.temporarioGET) // rota para fins de desenvolvimento
    .post('/adm/login', ADMController.Login)
    .post('/adm/cadastro', Restrito, ADMController.Cadastrar) // Só administradores podem cadastrar mais administradores
    .put('/adm/:id', Restrito, ADMController.ModificaUsuario)

export {admRouter}