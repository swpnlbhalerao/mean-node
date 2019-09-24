const jwt = require('jsonwebtoken')
const keys = require('../keys');



 module.exports = function auth(req, res, next) {
    const token = req.header('auth-token')
    

    if (!token) {
        return res.status(401).send('Access Denied')
    }

    try {
        const verified=jwt.verify(token,keys.Secret_Token)
            req.user=verified;
            console.log(req.user);
            next();

    } catch (error) {
        return res.status(400).send('Invalid Token',error);
    }


}