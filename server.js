const express = require('express');
const app = express();
require('dotenv').config();
const Routes = require('./bootstrap/route');
const cookieParser = require('cookie-parser');
const Database = require('./bootstrap/database')

const PORT = process.env.PORT || 3000;

//Apply middlewares
app.use(express.urlencoded({ extended : true }));
app.use(express.json());
app.use(cookieParser());

//Connect to database
Database.connect(process.env)

//Load routing
Routes.load(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})