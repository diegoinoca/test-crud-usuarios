const jwt = require('jsonwebtoken');

const authToken = (req, res, next) => {
    const token = (req.header('Authorization')) ? req.header('Authorization').replace('Bearer ', ''):null;
    if (!token)
        return res.status(403).json({ message: 'Unauthorized, Empty token' });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, resp) => {
        if (err) return res.status(403).json({ message: 'Unauthorized, invalid token' })
        next()
    })
}

module.exports = { authToken };