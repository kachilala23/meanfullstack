const bcrypt = require('bcryptjs')
const User = require('../models/User');

module.exports.login = function (req, res) {

}

module.exports.register = async function(req, res) {
    // email password
    const candiadate = await User.findOne({email:req.body.email})
    if (candiadate) {
        // return error if user exist
        res.status(409).json({
            message: 'This email is already taken. Try another'
        })
    } else {
        // Need to create a user
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })
        try {
            await user.save()
            res.status(201).json(user)
        } catch(e) {
            // Обработать ошибку
        }

    }
}