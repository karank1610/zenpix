const Mongoose = require('mongoose');

const userContactSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    companySize: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },

}, { timestamps: true });

module.exports = Mongoose.model("UserContact", userContactSchema);