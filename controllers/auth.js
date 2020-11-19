const jwt = require('jsonwebtoken');
const secret = "clef-secret";


const withAuth = function(req, res, next) {
    const token =
        req.body.token ||
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;

    if (!token) {
        res.status(401).json({ error: "pas autorisé" });
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

module.exports = withAuth;