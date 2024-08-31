const jwt = require('jsonwebtoken');
const secretKey = 'lh:&9A![Ipp*,:7cA_@-okrww[a.^Sk^fyH|)SpK';

const authMiddleware = (req, res, next) => {
    console.log(req.headers);
    const token = req.headers['authorization']?.split(' ')[1];
    console.log("token", token);
    if (!token) {
        return res.status(401).json({ message: 'Access token is missing' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        console.log(err);
        console.log(decoded);
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(403).json({ message: 'Token has expired' });
            }
            return res.status(403).json({ message: 'Invalid token' });
        }
        else {
            req.user = decoded;
            next();
        }
    });
};

module.exports = authMiddleware;
