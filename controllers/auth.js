const { json } = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
const secret = "clef-secret";


exports.withAuth = function(req, res, next) {
    const token =
        req.body.token ||
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;
    if (!token) {
        res.status(400).json({ error: "pas autorisé" });
    } else {
        jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                res.status(401).send({ error: "invalide token" });
            } else {
                req._id = decoded._id;
                next();
            }
        });
    }
}

exports.navbar = function(req, res, next) {
    res.status(200).json({
        ouvrir_app: 'ouvrir iChat',
        deconnect: 'Se déconnecter'
    });
}