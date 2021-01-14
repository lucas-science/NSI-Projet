const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    pseudo: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, },
    mdp: { type: String, required: true },
    friends: [{
        user_id: { type: String, required: false },
        _pseudo: { type: String, required: false }
    }]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);