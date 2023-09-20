const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    student_id : {
        type: String ,
        required : true
    },
    class_id : {
        type: String , 
        required : true
    },
    stu_fir_name : {
        type: String , 
        required : true
    },
    stu_last_name : {
        type : String,
        required : true,
        uppercase : true
    },
    default_img : {
        type : String , 
        required : true
    }
})

const Student = new mongoose.model("Student" , studentSchema);
module.exports = Student