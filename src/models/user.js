const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    fullName: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    picture: {
        required: true,
        type: String
    },
    googleId: {
        required: false,
        type: String
    },

},{
    versionKey: false
})

module.exports = mongoose.model('users', UserSchema)
