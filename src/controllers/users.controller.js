const User = require('../models/user.model');
const { encryptedPass } = require('../helpers/utils');

const find = (req, res) => {
    User.getAll((err, data) => {
        if (err)
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        res.send(data);
    });
}

const findById = (req, res) => {
    User.findBy(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Not found User with id ${req.params.id}.`
                });
            } 
            return res.status(500).send({
                message: "Error retrieving User with id " + req.params.id
            });
        } 
        res.send(data);
    });
}

const create = async(req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email.toLowerCase(),
        username: req.body.username.toLowerCase(),
        password: await encryptedPass(req.body.password)
    });

    User.create(user, (err, data) => {
        if (err)
            return res.status(500).send({
                message: err.message || "Some error occurred while creating the user."
            });
        res.send(data);
    });
}

const update = async(req, res) => {

    if (!req.body) {
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const {firstname, lastname, email, username } = req.body;
    const password = await encryptedPass(req.body.password)
    User.findBy(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Not found User with id ${req.params.id}.`
                });
            } 
            return res.status(500).send({
                message: "Error retrieving User with id " + req.params.id
            });
        } 
        
        const user = new User({
            firstname: (firstname) ? firstname : data.firstname,
            lastname: (lastname) ? lastname : data.lastname,
            email: (email) ? email : data.email.toLowerCase(),
            username: (username) ? username : data.username.toLowerCase(),
            password:(password) ? password: data.password, 
        })

        User.updateById(req.params.id, user, (err, data) => {
            if (err)
                return res.status(500).send({
                    message: err.message || "Some error occurred while update the user."
                });
            res.send(data);
        });
    });
}


const remove = (req, res) => {
    User.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Not found User with id ${req.params.id}.`
                });
            }
            return res.status(500).send({
                message: "Could not delete User with id " + req.params.id
            });
        } 
        res.send({ message: `User was deleted successfully!` });
    });
}

module.exports = { find, findById, create, update, remove };