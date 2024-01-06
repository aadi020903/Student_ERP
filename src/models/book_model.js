const mongoose = require('mongoose');
const librarySchema = new mongoose.Schema({
      primarykey: {
        type:Number
        }, 
        ISBN:{
          type:Number,
          default:""
        },
      booktitle: {
        type:String,
        default:"" },
    authorname: {
        type:String,
        default:""
        },
        genre:{
          type:String,
          default:""
        },
        publishedyear:{
          type:String,
          default:""
        },
        totalcopies:{
          type:Number,
          default:""
        },
        availablecopies:{
          type:Number,
          default:""
        },
        status:{
          type:String,
          default: "Active"
      }
     
        
});

module.exports  = mongoose.model('book', librarySchema);
   
  