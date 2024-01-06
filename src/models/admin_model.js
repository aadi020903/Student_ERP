
const mongoose = require('mongoose');
const REGISTRY_ADMIN = process.env.DB_REGISTRY_ADMIN;

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        default: "",
 
    },
    file:{
        type:String,
        default:""
     },
    email: {
        type: String,
        unique: true,
        default: "",

    },
    password: {
        type: String,

        default: null,
    },
    
        phone: {
            type: Number,
            default: null,
        },
    authKey: {
        type: String,
        default: null
    },
});

module.exports = mongoose.model(REGISTRY_ADMIN , adminSchema);;
