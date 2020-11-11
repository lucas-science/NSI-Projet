const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const mongoose = require('mongoose');

const userRoutes = require('./routes/user')


app.use(bodyParser.urlencoded({ extended: false }))

//connect DB
mongoose.connect('mongodb+srv://ichat:LjfNhCj0YwwryZiF@cluster0.uzln9.mongodb.net/<dbname>?retryWrites=true&w=majority', {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use('/api/auth', userRoutes);

console.log('test')

module.exports = app;