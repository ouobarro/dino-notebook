const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Dinosaure = new Schema({
    login: {
        type: String
    },
    password: {
        type: String
    },
    age: {
        type: Number
    },
    family: {
        type: String
    },
    race: {
        type: String
    },
    food: {
        type: String
    },
    friends: {
        type: Array
    }
}, {
    collection: 'dinosaures'
})

module.exports = mongoose.model('Dinosaure', Dinosaure)
