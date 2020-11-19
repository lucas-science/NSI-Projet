const jwt = require('jsonwebtoken');
const secret = "clef-secret";


exports.auth = (req, res, next) => {
    const token = req.cookie.token;
    console.log(token);
    if (!token) {
        res.status(401).json({ error: "pas autorisé" });
    } else {
        jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                res.status(401).send({ error: "invalide token" });
            } else {
                req._id = decoded._id;
                next();
                console.log('tu as le droit')
            }
        });
    }
}