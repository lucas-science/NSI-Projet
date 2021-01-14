const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.signup = (req, res, next) => {
    console.log(req.body)
    let email = req.body.email;
    let pseudo = req.body.pseudo;
    let mdp = req.body.mdp;
    bcrypt.hash(mdp, 15).then(function(hash) {
        const user = new User({
            pseudo: pseudo,
            email: email,
            mdp: hash,
            friends: [{
                user_id: "test",
                _pseudo: "test"
            }]
        });
        user.save()
            .then(() => {
                const token = jwt.sign({ userId: user._id }, secret, {
                    expiresIn: '1h'
                });
                return res.cookie('token', token, { httpOnly: true }).status(200).json({ message: 'utilisateur créer' });
            })
            .catch(error => res.status(400).json({ message: "Nom du'ilisateur ou mot de passe ou Pseudo déjà utilisé" }));
    });
}

const secret = "clef-secret"


exports.signin = (req, res, next) => {
    console.log(req.body)
    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) {
            console.error(err);
            res.status(500)
                .json({
                    error: 'Internal error please try again'
                });
        } else if (!user) {
            res.status(402)
                .json({
                    error: 'Incorrect email or password'
                });
            console.log('here')
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
                    return res.cookie('token', token, { httpOnly: true }).status(200).json({ message: 'connexion réussi' });
                }
            });
        }
    });
}