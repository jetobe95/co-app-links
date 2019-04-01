const bcrypt = require('bcryptjs');
const helpers = {};

helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash;
}

helpers.matchPassword = async (passord, savedPassword) => {
    try {
       const validPassword =  await bcrypt.compare(passord, savedPassword)
       return validPassword

    } catch (error) {
        console.log(error);
    }

}
module.exports = helpers;