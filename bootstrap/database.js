const mongoose = require('mongoose');

const connect = async (env) => {
    try {
        const dsn = `${env.DB_CONNECTION}://${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`;
        return {
            status : true,
            response : await mongoose.connect(dsn, {
                useUnifiedTopology: true,
                useNewUrlParser: true
            })
        };
    } catch (error) {
        return {
            status : false,
            response : error
        }
    }
}

module.exports = {
    connect
}