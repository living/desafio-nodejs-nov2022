import express from "express";
import { editorasRouter } from './editorasRoutes.js'
import { livrosRouter } from './livrosRoutes.js'
import { admRouter } from "./admRoute.js";

function appConfig(app) {
    app.use(
        express.json(),
        livrosRouter,
        editorasRouter,
        admRouter
    )
}
// TEMPLATES DE REQUISIÇÃO PARA LIVROS E EDITORA RESPECTIVAMENTE

/*
    {
        "TITULO": "legal",
        "AUTOR": "Celso",
        "EDITORA": "63827f8e6122e601188e7907",
        "QUANTIDADE": 32,
        "PRECO": 120
    }
 */

/*
   {
    "NOME": "12",
    "CNPJ": "22.222.122/9241-08"
   }
*/

export { appConfig }