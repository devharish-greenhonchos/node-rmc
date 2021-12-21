const load = (app) => {
    app.use('/', require('../routes/auth'));
    // app.use('/web', require('../routes/web'));
    // app.use('/api', require('../routes/api'));
}

module.exports = {
    load
}