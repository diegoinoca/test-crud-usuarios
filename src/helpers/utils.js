const bcrypt = require('bcryptjs');

const encryptedPass = async(password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

const comparePass = async(password, hashed) => {
    return await bcrypt.compare(password, hashed);
}

module.exports = { encryptedPass, comparePass };