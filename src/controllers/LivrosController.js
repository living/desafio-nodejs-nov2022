import { Livro } from "../models/livroSchema.js"
import { testaLivro } from "../utils/rodaTestes.js"

class LivrosController {

    static get_livros(req, res) {
        Livro.find({},'-PRECO -__v -createdAt -updatedAt')
            .populate('EDITORA', '-updatedAt -__v -createdAt -LIVROS')
            .exec((err, livros) => {
                if(err) {
                    res.status(400).send({message: `${err.message}`})
                }

                res.status(200).send(livros)
            }
        )
    }

    static get_livro_id(req, res) {
        Livro.findById(req.params.id,'-PRECO -__v -_id -createdAt -updatedAt')
            .populate('EDITORA', '-updatedAt -createdAt -__v -LIVROS')
            .exec((err, livro) => {

                if(!livro) {
                    res.status(404).send({
                        message: "ID não encontrado"
                    })
                    return
                }

                if(err){
                    res.status(404).send({message: `${err.message}`})
                    return
                }

                res.status(200).send(livro)
            }
        )
    }

    static get_livros_adm(req, res) {
        Livro.find()
            .populate('EDITORA', '-LIVROS')
            .exec((err, livros) => {
                if(err) {
                    res.status(400).send({message: `${err.message}`})
                }

                res.status(200).send(livros)
            }
        )
    }

    static get_livro_id_adm(req, res) {
        Livro.findById(req.params.id)
            .populate('EDITORA', '-LIVROS')
            .exec((err, livro) => {

                if(!livro) {
                    res.status(404).send({
                        message: "ID não encontrado"
                    })
                    return
                }

                if(err){
                    res.status(404).send({message: `${err.message}`})
                    return
                }

                res.status(200).send(livro)
            }
        )
    }

    static async post_livro(req, res) {

        const resultado = await testaLivro(req.body)
        
        if(typeof resultado === 'string') {
            res.status(400).send({message:resultado})
            return
        }

        const livro = new Livro(req.body)

        livro.save((err) => {
            if(err) {
                res.status(400).send({message: `${err.message}`})
                return
            }

            res.status(201).send({message:"Livro criado com sucesso!"})
        })
    }

    static put_livro(req, res) {

        const resultado = testaLivro(req.body)
        
        if(typeof resultado === 'string') {
            res.status(400).send({message:resultado})
            return
        }

        const {id: _id} = req.params
        const changes = {...req.body, updatedAt: Date.now()}

        Livro.findByIdAndUpdate(_id, changes, (err, result) => {

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
                message: 'Livro atualizado com sucesso',
            })

        })
    }

    static delete_livro(req, res) {
        Livro.findByIdAndDelete(req.params.id, (err, result) => {
            if(!result) {
                res.status(404).send({
                    message: "ID não encontrado"
                })
                return
            }

            if(err) {
                res.status(400).send({message: `${err.message}`})
                return
            }
            
            res.status(200).send({message:'Livro deletado com sucesso!'})
        })
    }
    
}

export { LivrosController }