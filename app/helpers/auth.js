const jwt = require('jsonwebtoken')

const createToken = (payload, expiry='1d') => {
    return jwt.sign(payload, process.env.APP_KEY, { expiresIn : expiry });
}

const verifyToken = (token) => {
    return jwt.verify(
        token, 
        process.env.APP_KEY, 
        (err, data) => {
            if(err) {
                return {
                    status  : false,
                    error   : err,
                    data    : null
                }
            }
            return {
                status  : true,
                error   : null,
                data    : data
            }
        }
    )
}

module.exports = {
    createToken,
    verifyToken
}