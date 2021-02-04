const express = require('express');
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const User = require('./models/user');

// routage pour le chemin /signup et /signin
const connexionRoutes = require('./routes/user');

// fonction pour vérifier si la personne est connecté
const authController = require('./controllers/auth');

// initialisation body parser pour récupérer donné au format json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// initialisation cookie parser pour récupérer les cookies
app.use(cookieParser());

// configuration CORS
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
);

//connection DB
mongoose.connect('mongodb+srv://ichat:LjfNhCj0YwwryZiF@cluster0.uzln9.mongodb.net/<dbname>?retryWrites=true&w=majority', {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


// routeur réunissant /authentification/signin et /authentification/signup
app.use('/authentification', connexionRoutes);

// test
app.post('/test', (req, res, next) => {
    console.log(req.body)
})

// vérification si la personne possède les cookie de conneion, avec middelware analysant ceci
app.post('/auth', authController.withAuth, (req, res, next) => {
    res.sendStatus(200);
});

// test d'ajout d'amis dans la base de donné pour un utilisateur précis
app.post('/app/newfriend', authController.withAuth, (req, res, next) => {
    console.log("demande d'amis à " + req.body.new_friend)

    User.updateOne({
        _id: "60046c3664d2b733b87fe5fd"
    }, {
        $push: {
            friends: {
                _id: req.body.new_friend,
                _pseudo: req.body.new_friend
            }
        }
    }, function(err, docs) {
        if (err) {
            console.log(err)
        } else {
            console.log("docs update : ", docs)
        }
    })
})

module.exports = app;