const mongoose = require('mongoose');

const Reports = new mongoose.Schema({
    ReportAuthor: {
        type: String,
        required: true
    },

    ReportedUser: {
        type: String,
        required: true
    },

    ReportedUserID: {
        type: Number,
        required: true
    },

    ReportReason: {
        type: String,
        required: true
    },

    ReportDate: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('ReportData', Reports);