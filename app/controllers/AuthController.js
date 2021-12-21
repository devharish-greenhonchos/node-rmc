const User = require('../models/User')
const JWT = require('../helpers/auth')
const Password = require('../helpers/secret')

const login = async (request, response) => {
    //Fetch user
    const user = await User.findOne({email: request.body.email}).exec();
    
    //Verify password
    const hasMatched = await Password.verify(request.body.password, user.password)
    if(!hasMatched) {
        response.send({
            data : {},
            status : false
        }).status(400)
    }

    //Check of user exists or not
    if(user) {
        //Send access token in cookie
        response.cookie(
            'accessToken', 
            JWT.createToken({ id : user._id }), 
            { httpOnly : true, maxAge : parseInt(process.env.COOKIE_AGE) }
        )
        //Send response
        response.send({
            data : {
                firstName : user.firstName,
                lastName : user.lastName,
            },
            status : true
        }).status(200)
    }
    //Send error message if user does not exists
    response.send({
        data : {},
        status : false
    }).status(400)
}

const register = async (request, response) => {
    try {
        const password = await Password.hash(request.body.password);
        if(password.status) {
            await User.create({
                firstName: request.body.firstName,
                lastName: request.body.lastName,
                email: request.body.email,
                password: password.hash,
            });
            response.json({ message: 'Account created successfully' }).status(201);
        }
        response.json({ message: 'Something went wrong' }).status(400);
    } catch (error) {
        if(error.code === 11000) {
            response.json({ message: 'User already exists' }).status(409);
        }
        response.json({ message: 'Something went wrong' }).status(400);
    }
}

const logout = (request, response) => {
    response.clearCookie(
        'accessToken', 
        { httpOnly : true, maxAge : parseInt(process.env.COOKIE_AGE) }
    )
    response.send({ message : 'Logged out successfully' }).status(200)
}

module.exports = {
    login,
    register,
    logout
}