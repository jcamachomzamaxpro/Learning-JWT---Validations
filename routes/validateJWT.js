const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('auth-token');

    if(!token) return res.status(401).json({ error: 'Acceso denegado' })

    try {
        // el verify se podria decir que desencripta el token y nos devuelve los datos que le pasamos en el jwt.sign
        const verificar = jwt.verify(token, process.env.TOKEN_SECRET);

        console.log(verificar);

        // se crea una request user y le paso los datos
        req.user = verificar

        next();

    } catch (error) {
        res.status(400).json({error: 'token no es válido'})
    }

}

module.exports = verifyToken;