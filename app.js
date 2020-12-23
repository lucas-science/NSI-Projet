const express = require('express');
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')

const connexionRoutes = require('./routes/user');

const authController = require('./controllers/auth');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
);
//connect DB
mongoose.connect('mongodb+srv://ichat:LjfNhCj0YwwryZiF@cluster0.uzln9.mongodb.net/<dbname>?retryWrites=true&w=majority', {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));



app.use('/authentification', connexionRoutes);
app.post('/test', (req, res, next) => {
    console.log(req.body)
})

app.get('/auth', authController.withAuth, (req, res, next) => {
    res.sendStatus(200);
});
module.exports = app;