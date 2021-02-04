const { json } = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
const secret = "clef-secret";


exports.withAuth = function(req, res, next) {
    // sélectionne les cookies
    const token =
        req.body.token ||
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;
    // si il n'y a pas de cookie
    if (!token) {
        res.status(400).json({ error: "pas autorisé" });
    } else {
        // si il y a des cookies, vérifier s'ils sont encore valide avec la fonction du package JSONwebtoken
        jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                res.status(401).send({ error: "invalide token" });
            } else {
                // si les cookie sont validé, passé à la prochaine fonction grâce à "next()"
                req._id = decoded._id;
                next();
            }
        });
    }
}