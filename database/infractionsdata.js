const mongoose = require('mongoose');

const Infractions = new mongoose.Schema({

    UserID : {
        type : Number,
        required: true
    },

    ModeratorID : {
        type : String,
        required: true
    },

    Type : {
        type : String,
        required: true
    },

    Reason : {
        type : String,
        required: true
    },

    Date : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('Infractions', Infractions);