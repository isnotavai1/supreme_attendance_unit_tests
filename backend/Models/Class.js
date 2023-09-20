const mongoose = require("mongoose")

const classSchema = new mongoose.Schema({
    class_id : {
        type: String ,
        required : true
    },
    branch : {
        type: String , 
        required : true
    },
    year : {
        type: Number , 
        required : true
    },
    section : {
        type : String,
        required : true,
        uppercase : true
    }
})

const Class = new mongoose.model("Class" , classSchema);
module.exports = Class