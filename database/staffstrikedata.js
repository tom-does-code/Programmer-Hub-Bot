const mongoose = require('mongoose');

const StaffStrikes = new mongoose.Schema({
    IssuedBy : {
        type : String,
        required : true
    },

    UserID : {
        type : Number,
        required : true
    },

    Reason : {
        type : String,
        required : true
    },

    Date : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('StaffStrikes', StaffStrikes);