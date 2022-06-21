const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { comparePass } = require('../helpers/utils');

const login = async(req, res) => {
    if (!req.body || !req.body.user || !req.body.password) {
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }else{
        User.findByUser(req.body.user, async(err, data) => {
            if (err) {
                return res.status(403).send({
                    message: `Unauthorized for user`
                });
            }
            
            if(!await comparePass(req.body.password, data.password)){
                return res.status(403).send({
                    message: `Unauthorized for user`
                });
            }

            data.accessToken = await jwt.sign({ user: req.body.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
            delete data['password'];
            res.send(data);
        });
    }
}


const createAuthToken = (req, res) => {
    if(!req.body || req.body.user != process.env.AUTH_USER || req.body.password != process.env.AUTH_PASS)
        return res.status(403).json({ message: 'Unauthorized, invalid credentials' });

    jwt.sign({ user: req.body.user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' }, function(err, token) {
        if (err) return res.status(403).json({ message: 'Unauthorized, invalid token' });
        return res.send(token);
    });
}

module.exports = { login, createAuthToken };