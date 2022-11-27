import { ADM } from "../models/admModel.js"
import { Editora } from '../models/editoraSchema.js'

async function rodaTestes(conta) {

    let resultado = 1

    for(let item in conta) {
        switch(item) {
            case "USUARIO":
                const usuarioExiste = await ADM.findOne({USUARIO: conta["USUARIO"]})
                if(usuarioExiste) {
                    resultado = "nome de usuário já existe, escolha outro"
                }
                if(conta["USUARIO"].length < 10 || conta["USUARIO"].length > 20){
                    resultado = "usuário deve ter entre 10 e 20 caracteres"
                }
                break
            
            case "SENHA":
                if(conta["SENHA"].length < 10 || conta["SENHA"].length > 20){
                    resultado = "sua senha deve ter entre 10 e 20 caracteres"
                } 
                break

        }
    }
    
    return resultado
}

/**
 * Eu fiz essa gambiarra tremenda no testaEditora e no testaLivro
 * pra poder usar ambos nos metodos put e post sem precisar 
 * refazer código, acho que acabou dando mais trabalho assim até
 */

function testaEditora(editora) { 

    let resultado = 1

    const testeCNPJ = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/

    for(let item in editora) {
        switch(item) {
            case "NOME":
                /**
                 * mensagem rápida sobre esssa parte
                 * 
                 * aqui ele estava reclamando que editora["NOME"] não existia quando era usado no metodo put
                 * ja que as vezes o usuario pode querer mudar so o CNPJ e por isso nao tem porque colocar "NOME"
                 * no body da requisição.
                 * 
                 * então eu faço primeiro a checagem da propriedade "NOME" e depois faço o teste em si
                 * 
                 * melhor do que fazer um:
                 * if(teste) {
                 *  if(teste) {
                 *      resultado
                 *  }
                 * }
                 * varias vezes
                 * 
                 * fim da carta kkkk pode apagar pra não atrapahar
                 */
                if(editora.NOME.length > 20 || editora.NOME.length < 2){
                    resultado = "O Nome deve ter menos entre 2 e 20 caracteres"
                }
                break

            case "CNPJ":
                if(!(testeCNPJ.test(editora.CNPJ))) {
                    resultado = "Formato de CNPJ está errado, tente XX.XXX.XXX/XXXX-XX"
                }
                break
        }
    }

    return resultado
}

async function testaLivro(livro) {

    let resultado = 1

    for(let item in livro) {
        switch(item) {
            case "TITULO":
                if(livro.TITULO.length < 1 || livro.TITULO.length > 30){
                    resultado = "O Titulo do livro deve conter entre 1 e 30 caracteres."
                }
                break

            case "AUTOR":
                if(livro.AUTOR.length < 3 || livro.AUTOR.length > 20) {
                    resultado = "O Nome do autor do livro deve conter entre 3 e 20 caracteres."
                }
                break

            case "QUANTIDADE":
                if(livro.QUANTIDADE < 0 ) {
                    resultado = "A quantidade de livros não pode ser negativa"
                }
                break

            case "PRECO":
                if(livro.PRECO < 0 ) {
                    resultado = "O preço do livro não pode ser negativo"
                }
                break

            case "EDITORA":
                if(livro.EDITORA.length !== 24) {
                    resultado = "Cheque o id da editora, ele tem exatamente 24 caracteres."
                    return
                }

                const editora = await Editora.findById(livro.EDITORA)
                if(!editora) {
                    resultado = "Editora não existe"
                }

                break
            
        }
    }

    return resultado
}

export {rodaTestes, testaEditora, testaLivro}

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