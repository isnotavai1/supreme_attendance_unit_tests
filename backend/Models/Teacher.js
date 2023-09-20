const mongoose = require("mongoose")

const teacherSchema = new mongoose.Schema({
    teach_id : {
        type: String ,
        required : true
    },
    teach_fir_name : {
        type: String , 
        required : true
    },
    teach_sec_name : {
        type: String , 
        required : true
    },
    password : {
        type : String,
        required : true
    }
})

const Teacher = new mongoose.model("Teacher" , teacherSchema);
module.exports = Teacher