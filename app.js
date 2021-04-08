const express = require('express');
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const User = require('./models/user');
const Groupe = require('./models/groupe');
const jwt = require('jsonwebtoken');

// routage pour le chemin /signup et /signin
const connexionRoutes = require('./routes/user');
//const appRoutes = require()

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
app.use('/app/statByUser', authController.withAuth, (req, res, next) => {
    const token =
        req.body.token ||
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;

    jwt.verify(token, secret, async function(err, decoded) {
        if (err) {
            res.status(401).send({ error: "invalide token" });
        } else {
            try {
                const GroupeDocs = await Groupe.find({ "membres._id": decoded.userId })
                const statistique = []
                for (let i = 0; i < GroupeDocs.length; i++) {
                    let nbr_message = GroupeDocs[i].message.length
                    let friend_id = GroupeDocs[i].membres.filter(friend => friend._id != decoded.userId)
                    const pseudoFriend = await User.find({ _id: friend_id[0]._id })
                    let friendName = pseudoFriend[0].pseudo
                    statistique.push({ friend_name: friendName, nbr_message: nbr_message })
                }
                res.status(200).json(statistique)
            } catch (err) {
                res.status(401).json({ err })
            }
        }
    })
});
app.use('/app/changeName', authController.withAuth, (req, res, next) => {
    const token =
        req.body.token ||
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;

    jwt.verify(token, secret, async function(err, decoded) {
        if (err) {
            console.log("here")
            res.status(401).send({ error: "invalide token" });
        } else {
            try {
                let doc = await User.findOneAndUpdate({ _id: decoded.userId }, { pseudo: req.body.newName });
                console.log(doc.pseudo)
                res.status(200).send({ message: 'OK' })
            } catch (err) {
                res.status(401).json({ err })
            }
        }
    });
})
app.use('/app/friendlist', authController.withAuth, (req, res, next) => {
    const token =
        req.body.token ||
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;

    jwt.verify(token, secret, async function(err, decoded) {
        if (err) {
            res.status(401).send({ error: "invalide token" });
        } else {
            try {
                const UserDocs = await User.findOne({ _id: decoded.userId })
                let data = []
                for (let i = 0; i < UserDocs.friends.length; i++) {
                    let friendid = UserDocs.friends[i]._id
                    const GetFriendName = await User.find({ _id: friendid })
                    data.push({ id: friendid, pseudo: GetFriendName[0].pseudo })
                }
                res.status(200).send({ data: data, firstFriend: UserDocs.friends[0]._id, pseudo: UserDocs.pseudo })
            } catch (err) {
                res.status(401).json({ err })
            }
        }
    });
});

app.use('/app/getFriendName', authController.withAuth, (req, res, next) => {
    const token =
        req.body.token ||
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;

    jwt.verify(token, secret, function(err, decoded) {
        if (err) {
            res.status(401).send({ error: "invalide token" });
        } else {
            //console.log("decoded id : ", decoded)
            // si les cookie sont validé, passé à la prochaine fonction grâce à "next()"
            User.findOne({ _id: req.body.name }, function(err, docs) {
                if (err) {
                    res.status(401).send({ error })
                } else {
                    res.json(docs.pseudo)
                }
            });
        }
    });
})



app.use('/app/getgroupeid', authController.withAuth, (req, res, next) => {
    const token =
        req.body.token ||
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;

    jwt.verify(token, secret, function(err, decoded) {
        if (err) {
            res.status(401).send({ error: "invalide token" });
        } else {
            //console.log("decoded id : ", decoded)
            // si les cookie sont validé, passé à la prochaine fonction grâce à "next()"
            Groupe.find({ $and: [{ "membres._id": decoded.userId }, { "membres._id": req.body.friendID }] }, function(err, docs) {
                if (err) {
                    console.log("problem is here")
                    res.status(401).send({ error })
                } else {
                    //console.log("le groupe : ", docs)
                    res.json(docs)
                }
            })
        }
    });
})
app.use('/app/getgroupechatlist', authController.withAuth, (req, res, next) => {
    const token =
        req.body.token ||
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;

    jwt.verify(token, secret, function(err, decoded) {
        if (err) {
            res.status(401).send({ error: "invalide token" });
        } else {
            //console.log("decoded id : ", decoded)
            // si les cookie sont validé, passé à la prochaine fonction grâce à "next()"
            Groupe.find({ $and: [{ "membres._id": decoded.userId }, { "membres._id": req.body.friendID }] }, function(err, docs) {
                if (err) {
                    console.log("problem is here")
                    res.status(401).send({ error })
                } else {
                    //console.log("le groupe : ", docs)
                    res.json(docs)
                }
            })
        }
    });
})

app.use('/app/getname', authController.withAuth, (req, res, next) => {
    const token =
        req.body.token ||
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;

    jwt.verify(token, secret, function(err, decoded) {
        if (err) {
            res.status(401).send({ error: "invalide token" });
        } else {
            //console.log("decoded id : ", decoded)
            // si les cookie sont validé, passé à la prochaine fonction grâce à "next()"
            User.find({ _id: decoded.userId }, function(err, docs) {
                if (err) {
                    console.log(err)
                } else if (docs == null) {
                    res.status(400).send({ error: "introuvable" });
                } else {
                    res.json(docs.pseudo)
                }
            })
        }
    });
})
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
            //console.log("user findone", docs)
            const friendID = docs._id
            jwt.verify(token, secret, function(err, decoded) {
                if (err) {
                    res.status(401).send({ error: "invalide token" });
                } else {
                    User.findOne({ _id: decoded.userId, "friends._pseudo": req.body.new_friend }, function(err, docs) {
                        if (err) {
                            console.log(err)
                        } else if (docs == null) {
                            const userID = decoded.userId
                            User.updateOne({
                                _id: decoded.userId
                            }, {
                                $push: {
                                    friends: {
                                        _id: friendID,
                                        _pseudo: req.body.new_friend
                                    }
                                }
                            }, function(err, docs) {
                                if (err) {
                                    console.log(err)
                                } else {
                                    //console.log("docs1 update : ", docs)
                                    User.findOne({ _id: userID }, function(err, docs) {
                                        if (err) {
                                            console.log(err)
                                        } else {
                                            const userPseudo = docs.pseudo
                                            User.updateOne({
                                                _id: friendID,
                                            }, {
                                                $push: {
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
                                    res.status(200).send({ message: "demande d'amis envoyé" })
                                    const groupe = new Groupe({
                                        membres: [
                                            { _id: friendID },
                                            { _id: userID }
                                        ],
                                        message: [
                                            { text: "wesh", author: "david" },
                                            { text: "wesh david", author: "thierry" }
                                        ]
                                    })
                                    groupe.save()
                                        .then(() => {
                                            console.log("groupe créer")
                                            res.status(200)
                                        })
                                        // renvois éventuelles érreurs
                                        .catch(error => res.status(401));
                                }
                            })
                        } else {
                            res.status(402).send({ error: "utilisateur déja amis" })
                            console.log("c est deja ton amis zbi")
                        }
                    })
                }
            });
        }
    })
})

module.exports = app;