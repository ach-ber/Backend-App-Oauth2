const modelUser = require('../models/user.js')
const passport = require('passport');
require('../config/passport.js');

const getUserDetails = ((req, res) => {
    res.status(200).json({ email: req.user.email });
    console.log(req.user.email);
});

const createUser = (async (req, res) => {
    const newUser = new modelUser ({
        name: req.body.name,
        age: req.body.age
    })
    try {
        const dataToSave = await newUser.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

const getAllUser = ((req, res) => {
    modelUser.find({})
        .then(result => res.status(200).json({ result }))
        .catch(error => res.status(500).json({msg: error}))
});

const getAuthGoogle = (() => passport.authenticate('google', { scope: [ 'email', 'profile' ] }));

const getAuthGoogleCB = (() => passport.authenticate( 'google', {
    successRedirect: 'http://localhost:3000/LoginSuccess',
    failureRedirect: '/auth/google/failure'
    })
);

module.exports = {
    getUserDetails,
    createUser,
    getAllUser,
    getAuthGoogle,
    getAuthGoogleCB,
}