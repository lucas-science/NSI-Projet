const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

// model "user" de la base de donné 
const userSchema = mongoose.Schema({
    membres: [{ _id: { type: String, required: true } }],
    message: [{
        text: { type: String, required: false },
        author: { type: String, required: false }
    }]
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Groupe', userSchema);