const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.mdp, 15)
        .then(hash => {
            const user = new User({
                pseudo: req.body.pseudo,
                email: req.body.email,
                mdp: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: "utilisateur créer" }))
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
}


const secret = "clef-secret"

/*exports.signin = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: "utilisateur pas trouvé" })
            }
            bcrypt.compare(req.body.mdp, user.mdp)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: "mot de passe incorrecte" })
                    }
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
}*/

exports.signin = (req, res, next) => {
    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) {
            console.error(err);
            res.status(500)
                .json({
                    error: 'Internal error please try again'
                });
        } else if (!user) {
            res.status(401)
                .json({
                    error: 'Incorrect email or password'
                });
        } else {
            bcrypt.compare(req.body.mdp, user.mdp, function(err, result) {
                if (err) {
                    console.error(err);
                    res.status(500)
                        .json({
                            error: 'Internal error please try again'
                        });
                } else if (!result) {
                    res.status(401)
                        .json({
                            error: 'Incorrect password'
                        });
                } else {
                    const token = jwt.sign({ userId: user._id }, secret, {
                        expiresIn: '1h'
                    });
                    return res.cookie('token', token, { httpOnly: true }).status(200).json({ message: 'nice' });
                }
            });
        }
    });
}