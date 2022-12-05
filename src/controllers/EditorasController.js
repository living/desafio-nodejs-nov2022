import { Editora } from "../models/editoraSchema.js"
import { Livro } from "../models/livroSchema.js"
import { testaEditora } from "../utils/rodaTestes.js"

class EditorasController {

    static get_editoras(req, res) {
        Editora.find(req.query,'_id NOME CNPJ' ,(err, editoras) => {
            if(err) {
                res.status(400).send({message: `${err.message}`})
                return
            }

            res.status(200).send(editoras)
        })
    }

    static get_editora_id(req, res) {
        Editora.findById(req.params.id, '_id NOME CNPJ LIVROS', (err, editora) => {

            if(!editora) {
                res.status(404).send({
                    message: "ID não encontrado"
                })
                return
            }

            if(err){
                res.status(400).send({message: `${err.message}`})
                return
            }

            Livro.find({EDITORA: editora._id},'TITULO AUTOR _id', (err, livros) => {

                if(err) {
                    res.status(400).send({message: `${err.message}`})
                    return
                }
                
                livros.forEach((livro) => {
                    editora.LIVROS.push(livro)
                })
                
                res.status(200).send(editora)

            })

        })
    }

    static get_editora_adm(req, res) {
        Editora.find(req.query, (err, editoras) => {
            if(err) {
                res.status(400).send({message: `${err.message}`})
                return
            }

            const editorasModificadas = []

            editoras.map(editora => {
                Livro.find({EDITORA: editora._id}, (err, livros) => {
    
                    if(err) {
                        res.status(400).send({message: `${err.message}`})
                        return
                    }
    
                    if(livros.lenght === 0) {
                        editora.LIVROS = [];
                        return
                    }
                    
                    livros.forEach((livro) => {
                        editora.LIVROS.push(livro)
                    })

                    editorasModificadas.push(editora)

                    if(editorasModificadas.length === editoras.length) {
                        res.status(200).send(editorasModificadas)
                    }
                  
                })
            })

        })
    }

    static get_editora_id_adm(req, res) {
        Editora.findById(req.params.id, (err, editora) => {
            if(!editora) {
                res.status(404).send({
                    message: "ID não encontrado"
                })
                return
            }

            if(err){
                res.status(400).send({message: `${err.message}`})
                return
            }

            Livro.find({EDITORA: editora._id},'-EDITORA', (err, livros) => {

                if(err) {
                    res.status(400).send({message: `${err.message}`})
                    return
                }

                if(livros.lenght === 0) {
                    editora.LIVROS = [];
                    return
                }
                
                livros.forEach((livro) => {
                    editora.LIVROS.push(livro)
                })
    
                res.status(200).send(editora)
            })

        })
    }

    static post_editora(req, res) {

        const resultado = testaEditora(req.body)
        
        if(typeof resultado === 'string') {
            res.status(400).send({message:resultado})
            return
        }

        Editora.findOne({NOME:req.body.NOME}, (err, result) => {
            if(result) {
                res.status(400).send({message:"editora ja existe"})
                return
            }

            if(err) {
                res.status(400).send({message:err.message})
                return
            }

            const editora = new Editora(req.body)
    
            editora.save((err) => {
                if(err){
                    res.status(400).send({message: `${err.message}`})
                    return
                }
    
                res.status(200).send({message:"Editora adicionada com sucesso!"})
            })
        })
        
    }

    static put_editora(req, res) {

        const resultado = testaEditora(req.body)
        
        if(typeof resultado === 'string') {
            res.status(400).send({message:resultado})
            return
        }

        const {id:_id} = req.params
        const changes = {...req.body, updatedAt: Date.now()}
        
        Editora.findByIdAndUpdate(_id, changes, (err, result) => {

            if(!result) {
                res.status(404).send({
                    message: "ID não encontrado"
                })
                return
            }

            if(err) {
                res.status(400).send({
                    message: err,
                })
                return
            }

            res.status(200).send({
                changes,
                message:'Editora atualizada com sucesso!'
            })
        })
    }

    static delete_editora(req, res) {
        Editora.findByIdAndDelete(req.params.id, (err, result) => {
            if(!result) {
                res.status(404).send({
                    message: "ID não encontrado"
                })
                return
            }

            if(err){
                res.status(400).send({message: `${err.message}`})
                return
            } 

            res.status(200).send({message:'Editora deletada com sucesso!'})
        })
    }
    
}

export { EditorasController }