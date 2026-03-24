const mongoose = require("mongoose");


const collectionSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    images:{
        type:[String],
        default:[],
    },
}, {timestamps:true});

module.exports = mongoose.model("Collection",collectionSchema);