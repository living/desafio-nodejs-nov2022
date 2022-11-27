import jwt from 'jsonwebtoken';

function Restrito(req, res, next) {
    const tokenEnviado = req.headers['authorization']

    if(!tokenEnviado) {
        res.status(401).send("Acesso negado")
        return
    }

    const token = tokenEnviado.split(" ")[1]

    try {
        jwt.verify(token, process.env.secret)

        next()
    } catch(e) {
        res.status(401).send(e)
    }
}

export { Restrito }