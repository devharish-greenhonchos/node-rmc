const bcrypt = require('bcrypt');

const hash = async (password, saltRounds=10) => {
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        return {
            status  :   true,
            hash    :   hash
        }
    } catch (error) {
        return {
            status  :   false,
            error   :   error
        }   
    }
}

const verify = async (password, hash) => {
    try {
        return await bcrypt.compare(password, hash)
    } catch (error) {
        return false;
    }
}

module.exports = {
    hash,
    verify
}