import { ADM } from '../models/admModel.js'
import { rodaTestes } from '../utils/rodaTestes.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class ADMController {

    static temporarioGET(req, res) { // ROTA APENAS PARA FINS ILUSTRATIVOS
        ADM.find((e, results) =>  {
            res.send(results)
        })
    }

    static async Login(req, res) {

        const usuarioExistente = await ADM.findOne({USUARIO: req.body["USUARIO"]})

        if(!usuarioExistente) {
            res.status(400).send({message:'esse usuario não existe'})
            return
        }

        const senhacheck = await bcrypt.compare(req.body["SENHA"], usuarioExistente.SENHA)

        if(!senhacheck) {
            res.status(401).send("Acesso negado.")
            return
        }

        const userToken = jwt.sign({
            id:usuarioExistente._id
        }, process.env.secret)

        res.status(200).send(`Bem-vindo 
            ${userToken}`)
    }

    static async Cadastrar(req, res) {

        const resultado = await rodaTestes(req.body)

        if(typeof resultado === 'string') {
            res.status(422).send({message: resultado})
            return
        }

        const { usuario, senha } = req.body

        const salt = await bcrypt.genSalt() //default: 10
        const senhaCriptografada = await bcrypt.hash(senha, salt)

        const adm = new ADM({ USUARIO:usuario, SENHA:senhaCriptografada })

        adm.save((err) => {
            if(err){
                res.status(400).send({message:err})
                return
            }

            res.status(201).send("usuario criado com sucesso!")
        })

    }

    static async ModificaUsuario(req, res) {

        const resultado = await rodaTestes(req.body)

        if(typeof resultado === 'string') {
            res.status(422).send({message: resultado})
            return
        }

        const {id:_id} = req.params

        if(req.body.SENHA) {
            const salt = await bcrypt.genSalt()
            req.body.SENHA = await bcrypt.hash(req.body.SENHA, salt)
        }

        const changes = {...req.body, updatedAt: Date.now()}

        ADM.findByIdAndUpdate(_id, changes, (err, result) => {
            if(!result) {
                res.status(400).send({message: "ID não foi encontrado"})
            }

            if(err) {
                res.status(400).send({message: err})
            }

            res.status(200).send({message:"usuario modificado com sucesso!"})
        })
    }
}

export {ADMController}