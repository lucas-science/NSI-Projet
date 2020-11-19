const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const app = express();
const mongoose = require('mongoose');

const userRoutes = require('./routes/user')
const Auth = require('./controllers/auth');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cookieParser());

//connect DB
mongoose.connect('mongodb+srv://ichat:LjfNhCj0YwwryZiF@cluster0.uzln9.mongodb.net/<dbname>?retryWrites=true&w=majority', {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use('/api/auth', userRoutes);
app.use('/api/message', Auth.auth, function(req, res, next) {
    res.status(200).json({ message: "Message caché" })
});

module.exports = app;