
const mongoose = require('mongoose');
const teacher_notification = process.env.DB_TEACHER_NOTIFICATIONS;

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

    From: {
        type: String,
        default: "",
    },

    teacherId: {
        type: String,
        default: null,
    },

    date: {
        type: String,
        default: "",
    },

});

module.exports = mongoose.model(teacher_notification, notificationSchema);;
