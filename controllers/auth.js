const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys');

module.exports.login = async function(req, res) {
    const candidate = await User.findOne({email: req.body.email});

    if (candidate) {
        // Password check, user exists
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
        if (passwordResult) {
            // Token generation, passwords match
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60 * 60});

            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            // Passwords did not match
            res.status(401).json({
                message: 'Passwords do not match. try it again.'
            })
        }
    } else {
        // No user found, return error
        res.status(404).json({
            message: 'User with such email was not found.'
        })
    }
};

module.exports.register = async function(req, res) {
    // email password
    const candidate = await User.findOne({email: req.body.email});

    if (candidate) {
        // return error if user exist
        res.status(409).json({
            message: 'This email is already taken. Try another.'
        })
    } else {
        // Need to create a user
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        });

        try {
            await user.save();
            res.status(201).json(user)
        } catch(e) {
            errorHandler(res, e)
        }

    }
};