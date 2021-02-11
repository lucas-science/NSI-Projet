const express = require('express');
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const User = require('./models/user');
const jwt = require('jsonwebtoken');

// routage pour le chemin /signup et /signin
const connexionRoutes = require('./routes/user');

// fonction pour vérifier si la personne est connecté
const authController = require('./controllers/auth');
const user = require('./models/user');
const { decode } = require('punycode');

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
const secret = "clef-secret";

app.use('/app/friendlist', authController.withAuth, (req, res, next) => {
    const token =
        req.body.token ||
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;

    jwt.verify(token, secret, function(err, decoded) {
        if (err) {
            res.status(401).send({ error: "invalide token" });
        } else {
            console.log("decoded id : ", decoded)
                // si les cookie sont validé, passé à la prochaine fonction grâce à "next()"
            User.findOne({ _id: decoded.userId }, function(err, docs) {
                if (err) {
                    res.status(401).send({ error })
                } else {
                    console.log("la", docs.friends)
                    res.json(docs.friends)
                }
            });
        }
    });
});

app.post('/app/newfriend', authController.withAuth, (req, res, next) => {
    console.log("demande d'amis à " + req.body.new_friend)
    const token =
        req.body.token ||
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;

    User.findOne({ pseudo: req.body.new_friend }, function(err, docs) {

        if (err) {
            console.log(err)
        } else if (docs == null) {
            res.status(400).send({ error: "introuvable" });
        } else {
            console.log("user findone", docs)
            jwt.verify(token, secret, function(err, decoded) {
                if (err) {
                    res.status(401).send({ error: "invalide token" });
                } else {
                    // si les cookie sont validé, passé à la prochaine fonction grâce à "next()"
                    console.log('id', decoded.userId)
                    User.updateOne({
                        _id: decoded.userId
                    }, {
                        $push: {
                            friends: {
                                _id: docs._id,
                                _pseudo: req.body.new_friend
                            }
                        }
                    }, function(err, docs) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log("docs update : ", docs)
                            res.status(200).send({ message: "demande d'amis envoyé" })
                        }
                    })
                }
            });
        }
    })
})

module.exports = app;