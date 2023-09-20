const mongoose = require("mongoose");

const classinstance = new mongoose.Schema({
    teacher_id : {
        type : String ,
        required : true
    },
    class_id : {
        type : String , 
        required : true
    },
    student_data : {
        type : [{
            student_id : {
                type : String ,
                required : true
            },
            image : {
                type : String ,
                required : true
            }
        }] 
    }
} , {timestamps : true})

const ClassInstance = new mongoose.model("ClassInstance" , classinstance);

module.exports = ClassInstance;