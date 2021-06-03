const express = require('express');
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const User = require('./models/user'); // model "User" de la DB
const Groupe = require('./models/groupe'); // model "Groupe" de la DB
const jwt = require('jsonwebtoken');

// routage pour le chemin /signup et /signin
const connexionRoutes = require('./routes/user');

// fonction pour vérifier si la personne est connecté
const authController = require('./controllers/auth');
const user = require('./models/user');

// initialisation body parser pour récupérer donné au format json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// initialisation cookie parser pour récupérer les cookies
app.use(cookieParser());

// configuration CORS
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true // laisser passer les cookie entre différent url
    })
);

//connection à mongoDB
mongoose.connect('<mongoDB>', {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


// routeur réunissant /authentification/signin et /authentification/signup
app.use('/authentification', connexionRoutes);


// vérification si la personne possède les cookie de conneion, avec middelware analysant ceci
app.post('/auth', authController.withAuth, (req, res, next) => {
    res.sendStatus(200);
});



// récupere le nombre de message envooyé entre deux personnes
const secret = "clef-secret"; // clef de JsonWebToken
app.use('/app/statByUser', authController.withAuth, (req, res, next) => {
    // récupère le cookie "token"
    const token =
        req.body.token ||
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;
    // si il y a des cookies, vérifier s'ils sont encore valide avec la fonction du package JSONwebtoken
    jwt.verify(token, secret, async function(err, decoded) {
        if (err) {
            res.status(401).send({ error: "invalide token" });
        } else {
            try {
                // récupère les donné du groupe voulue
                const GroupeDocs = await Groupe.find({ "membres._id": decoded.userId })
                const statistique = []
                    // boucle qui récupère chaque groupe où est présent le user
                for (let i = 0; i < GroupeDocs.length; i++) {
                    let nbr_message = GroupeDocs[i].message.length // récupère le nopmbre de message dans le groupe
                    let friend_id = GroupeDocs[i].membres.filter(friend => friend._id != decoded.userId) // récupère l'id de l'ami qui est dans le groupe avec le user
                    const pseudoFriend = await User.find({ _id: friend_id[0]._id }) // cherche l'id de l'ami dans la DB
                    let friendName = pseudoFriend[0].pseudo // prend le pseudo de l'ami
                    statistique.push({ friend_name: friendName, nbr_message: nbr_message }) // stocke dans une Array le nom de l'ami et le nombre de message
                }
                res.status(200).json(statistique) // retourne l'array "statistique"
            } catch (err) {
                res.status(401).json({ err }) // renvois une erreur
            }
        }
    })
});

// change le pseudo d'une personne
app.use('/app/changeName', authController.withAuth, (req, res, next) => {
    // récupère le cookie "token"
    const token =
        req.body.token ||
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;
    // si il y a des cookies, vérifier s'ils sont encore valide avec la fonction du package JSONwebtoken
    jwt.verify(token, secret, async function(err, decoded) {
        if (err) {
            console.log("here")
            res.status(401).send({ error: "invalide token" });
        } else {
            try {
                let doc = await User.findOneAndUpdate({ _id: decoded.userId }, { pseudo: req.body.newName }); // cherche le user qu'il faut changer de nom
                console.log(doc.pseudo)
                res.status(200).send({ message: 'OK' }) // renvois le message 'OK' si la modification à bien été effectué
            } catch (err) {
                res.status(401).json({ err }) // renvois une erreur en cas d'échec
            }
        }
    });
})

// récupère la liste d'ami d'un utilisateur
app.use('/app/friendlist', authController.withAuth, (req, res, next) => {
    // récupère le cookie "token"
    const token =
        req.body.token ||
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;
    // si il y a des cookies, vérifier s'ils sont encore valide avec la fonction du package JSONwebtoken
    jwt.verify(token, secret, async function(err, decoded) {
        if (err) {
            res.status(401).send({ error: "invalide token" });
        } else {
            try {
                const UserDocs = await User.findOne({ _id: decoded.userId }) // cherche l'utilisateur dans la DB
                let data = []
                for (let i = 0; i < UserDocs.friends.length; i++) { // boucle qui fait le tour de chaque ami
                    let friendid = UserDocs.friends[i]._id // récupère l'ID de l'ami [i]
                    const GetFriendName = await User.find({ _id: friendid }) // cherche dans la DB l'ami grace à son ID
                    data.push({ id: friendid, pseudo: GetFriendName[0].pseudo }) // ajoute l'ID de l'ami et son pseudo dans une Array
                }
                res.status(200).send({ data: data, firstFriend: UserDocs.friends[0]._id, pseudo: UserDocs.pseudo }) // retourne le la liste d'ami, l'id du première ami et le pseudo de l'utilisateur
            } catch (err) {
                res.status(401).json({ err }) // retourne une erreur
            }
        }
    });
});

// récupère le nom d'un ami
app.use('/app/getFriendName', authController.withAuth, (req, res, next) => {
    // récupère le cookie "token"
    const token =
        req.body.token ||
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;
    // si il y a des cookies, vérifier s'ils sont encore valide avec la fonction du package JSONwebtoken
    jwt.verify(token, secret, function(err, decoded) {
        if (err) {
            res.status(401).send({ error: "invalide token" });
        } else {
            //console.log("decoded id : ", decoded)
            // si les cookie sont validé, passé à la prochaine fonction grâce à "next()"
            User.findOne({ _id: req.body.name }, function(err, docs) { // cherche un ami grâce à son id
                if (err) {
                    res.status(401).send({ error })
                } else {
                    res.json(docs.pseudo) // renvois le pseudo de l'ami rechercher
                }
            });
        }
    });
})

// cherche le groupe dans la DB celon l'id du User et de son ami
app.use('/app/getgroupeid', authController.withAuth, (req, res, next) => {
    // récupère le cookie "token"
    const token =
        req.body.token ||
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;
    // si il y a des cookies, vérifier s'ils sont encore valide avec la fonction du package JSONwebtoken
    jwt.verify(token, secret, function(err, decoded) {
        if (err) {
            res.status(401).send({ error: "invalide token" });
        } else {
            Groupe.find({ $and: [{ "membres._id": decoded.userId }, { "membres._id": req.body.friendID }] }, function(err, docs) { // cherche groupe possédant l'id de l'utilisateur et l'id de l'ami
                if (err) {
                    console.log("problem is here")
                    res.status(401).send({ error })
                } else {
                    //console.log("le groupe : ", docs)
                    res.json(docs) // renvois le groupe trouvé
                }
            })
        }
    });
})

// récupere la liste des messages dans un groupe
app.use('/app/getgroupechatlist', authController.withAuth, (req, res, next) => {
    // récupère le cookie "token"
    const token =
        req.body.token ||
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;
    // si il y a des cookies, vérifier s'ils sont encore valide avec la fonction du package JSONwebtoken
    jwt.verify(token, secret, function(err, decoded) {
        if (err) {
            res.status(401).send({ error: "invalide token" });
        } else {
            Groupe.find({ $and: [{ "membres._id": decoded.userId }, { "membres._id": req.body.friendID }] }, function(err, docs) { // cherche un groupe ou les membres sont composé de l'utilisateur et l'id de son ami
                if (err) {
                    console.log("problem is here")
                    res.status(401).send({ error })
                } else {
                    res.json(docs) // renvois la collection du groupe
                }
            })
        }
    });
})


// cherche le nom d'une personne grâce à son id
app.use('/app/getname', authController.withAuth, (req, res, next) => {
    // récupère le cookie "token"
    const token =
        req.body.token ||
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;
    // si il y a des cookies, vérifier s'ils sont encore valide avec la fonction du package JSONwebtoken
    jwt.verify(token, secret, function(err, decoded) {
        if (err) {
            res.status(401).send({ error: "invalide token" });
        } else {
            User.find({ _id: decoded.userId }, function(err, docs) { // cherche un User avec un ID donné
                if (err) {
                    console.log(err)
                } else if (docs == null) {
                    res.status(400).send({ error: "introuvable" }); // renvois une erreur comme quoi la personne recherché est introuvable
                } else {
                    res.json(docs.pseudo) // renvois le pseudo de la personne cherché
                }
            })
        }
    });
})

// ajout d'un amis
app.post('/app/newfriend', authController.withAuth, (req, res, next) => {
    console.log("demande d'ami à " + req.body.new_friend);
    // récupère le cookie "token"
    const token =
        req.body.token ||
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;
    // si il y a des cookies, vérifier s'ils sont encore valide avec la fonction du package JSONwebtoken
    User.findOne({ pseudo: req.body.new_friend }, function(err, docs) {
        if (err) {
            console.log(err)
        } else if (docs == null) {
            res.status(400).send({ error: "introuvable" });
        } else {
            //console.log("user findone", docs)
            const friendID = docs._id // récupère l'ID de l'amis
            jwt.verify(token, secret, function(err, decoded) {
                if (err) {
                    res.status(401).send({ error: "invalide token" });
                } else {
                    User.findOne({ _id: decoded.userId, "friends._id": friendID }, function(err, docs) { // cherche l'utilisateur avec son ID et voir s'il a déja en amis la personne recherché
                        if (err) {
                            console.log(err)
                        } else if (docs == null) { // Si pas d'utilisateur trouvé, alors la personne recherché n'est pas encore son amis
                            const userID = decoded.userId
                            User.updateOne({ // modifie la collection de l'utilisateur 
                                _id: decoded.userId
                            }, {
                                $push: { // ajout du nouvel amis avec son id et son prénom
                                    friends: {
                                        _id: friendID,
                                        _pseudo: req.body.new_friend
                                    }
                                }
                            }, function(err, docs) {
                                if (err) {
                                    console.log(err)
                                } else {
                                    User.findOne({ _id: userID }, function(err, docs) { // cherche l'utilisateur dans la DB 
                                        if (err) {
                                            console.log(err)
                                        } else {
                                            const userPseudo = docs.pseudo // récupère le pseudo de l'utilisateur
                                            User.updateOne({ // modifie la collection de l'ami
                                                _id: friendID,
                                            }, {
                                                $push: { // ajoute l'utilisateur en amis
                                                    friends: {
                                                        _id: userID,
                                                        _pseudo: userPseudo
                                                    }
                                                }
                                            }, function(err, docs) {
                                                if (err) {
                                                    console.log(err)
                                                } else {
                                                    console.log("great")
                                                }
                                            })
                                        }
                                    })
                                    res.status(200).send({ message: "demande d'amis envoyé" }) // renvois que la demande d'avis a été envoyé
                                        // création d'un nouveau groupe composé de l'utilisateur et de son amis ajouté
                                    const groupe = new Groupe({
                                        membres: [
                                            { _id: friendID },
                                            { _id: userID }
                                        ]
                                    })
                                    groupe.save() // enregistre le nouveau groupe
                                        .then(() => {
                                            console.log("groupe créer")
                                            res.status(200) // renvois un status 200 (succes) pour montrer qu'il n'y a pas d'erreur
                                        })
                                        // renvois éventuelles érreurs
                                        .catch(error => res.status(401)); // renvois une erreur en cas d'échec d'enregistrement
                                }
                            })
                        } else {
                            res.status(402).send({ error: "utilisateur déja ami" }) // si trouvé la collection de l'utilisateur avers la personne rechercher déja son ami
                            console.log("c est deja ton amis")
                        }
                    })
                }
            });
        }
    })
})

module.exports = app;
