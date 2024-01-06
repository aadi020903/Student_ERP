const mongoose = require('mongoose');
const user_notification = process.env.DB_USER_NOTIFICATIONS;

const notificationSchema = new mongoose.Schema({

    type:{
        type:String,
        default:"",
     },

    title: {
        type: String,
        default: "",
    },

    message: {
        type: String,
        default: "",
    },

    class: {
        type: String,
        default: null,
    },

    sid: {
        type: String,
        default: null,
    },

    teacher: {
        type: String,
        default: "",
    },

    date: {
        type: String,
        default: "",
    },

});

module.exports = mongoose.model(user_notification , notificationSchema);;
