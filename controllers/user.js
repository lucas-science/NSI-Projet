const User = require('../models/user');
const Groupe = require('../models/groupe')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.signup = (req, res, next) => {
    console.log(req.body)
        // récupérer les données suivantes
    let email = req.body.email;
    let pseudo = req.body.pseudo;
    let mdp = req.body.mdp;
    // utilisation de bcrypt pour ne pas laisser les mot de passe en clair dans la base de donnée
    bcrypt.hash(mdp, 15).then(function(hash) {
        const user = new User({
            pseudo: pseudo,
            email: email,
            mdp: hash,
            friends: {
                _id: "6076e163d47a913b0c2b0b0f",
                _pseudo: "Equipe iChat"
            }
        });

        user.save()
            // crétion de la session qui exprire dans 1h
            .then(() => {
                const token = jwt.sign({ userId: user._id }, secret, {
                    expiresIn: '1h'
                });
                User.updateOne({ _id: "6076e163d47a913b0c2b0b0f" }, {
                    $push: {
                        friends: {
                            _id: user._id,
                            _pseudo: req.body.pseudo
                        }
                    }
                }, function(err, docs) {
                    if (err) {
                        console.log(err)
                    } else {
                        const groupe = new Groupe({
                            membres: [
                                { _id: user._id },
                                { _id: "6076e163d47a913b0c2b0b0f" }
                            ],
                            message: [
                                { text: "Bienvenue dans iChat, vous pouvez désormais ajoutez des amis dans la section dédiée et vous partagez vos plus belles histoires !", author: "Equipe iChat" }
                            ]
                        })
                        groupe.save()
                        return res.cookie('token', token, { httpOnly: true }).status(200).json({ message: 'utilisateur créer' });
                    }
                })

            })
            // renvois éventuelles érreurs
            .catch(error => res.status(400).json({ message: "Nom du'ilisateur ou mot de passe ou Pseudo déjà utilisé" }));

    });
}

const secret = "clef-secret"


exports.signin = (req, res, next) => {
    console.log(req.body)
        // cherche un utilisateur avec l'email voulue
    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) {
            console.error(err);
            res.status(500)
                .json({
                    error: 'Internal error please try again'
                });
        } else if (!user) {
            // si on ne trouve pas l'utilisateur en question
            res.status(402)
                .json({
                    error: 'Incorrect email or password'
                });
            console.log('here')
        } else {
            // si utilisateur trouvé, comparé les deux mot de passe
            bcrypt.compare(req.body.mdp, user.mdp, function(err, result) {
                if (err) {
                    console.error(err);
                    res.status(500)
                        .json({
                            error: 'Internal error please try again'
                        });
                } else if (!result) {
                    // si mot de passe incorrect
                    res.status(401)
                        .json({
                            error: 'Incorrect password'
                        });
                } else {
                    // si mot de passe correct, création de la session
                    const token = jwt.sign({ userId: user._id }, secret, {
                        expiresIn: '1h'
                    });
                    return res.cookie('token', token, { httpOnly: true }).status(200).json({ message: 'connexion réussi' });
                }
            });
        }
    });
}