const fs = require('fs');
const User = require('../models/user.model');

const profilePhoto =  (req, res) => {
    if (!req.body || !req.file) {
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    User.updateProfilePhoto(req.body.id, req.file.filename, (err, data) => {
        if (err){
            fs.unlink(req.file.path, () => {});
            return res.status(500).send({
                message: err.message || "Some error occurred while photo profile the user."
            });
        }
        res.send({message: 'Profile image uploaded successfully.'});
    });
}


module.exports = { profilePhoto };