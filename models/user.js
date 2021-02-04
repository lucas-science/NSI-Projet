const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

// model "user" de la base de donné 
const userSchema = mongoose.Schema({
    pseudo: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, },
    mdp: { type: String, required: true },
    friends: [{
        _id: { type: String, required: false },
        _pseudo: { type: String, required: false }
    }]
});

// fonction permettant de ne pas avoir de doublon
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);