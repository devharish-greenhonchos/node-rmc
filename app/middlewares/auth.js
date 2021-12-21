const { verifyToken } = require('../helpers/auth');

const authenticateUser = (request, response, next) => {
    const token = verifyToken(request.cookies.accessToken);
    if(!token.status) {
        response.send({ message : 'Unauthenticated' }).status(401);
    }
    request.body._id = token.data.id;
    next();
}

module.exports = authenticateUser;