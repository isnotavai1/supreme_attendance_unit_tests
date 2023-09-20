const mongoose = require("mongoose");
const ClassInstance = require("../Models/ClassInstance");
const Student = require("../Models/Student");
const Class = require("../Models/Class");
const checkExistenceAndTiming = (teacher_id , class_id)=>{
    // console.log(`check for ${teacher_id} and ${class_id}`)
    try{   
        const ctc = ClassInstance.findOne({teacher_id : teacher_id , class_id : class_id}).then((res)=>{
            console.log(res);
            if(res === null)return false;
            // console.log(res);
            const cur_time = +new Date().getTime();
            if(cur_time >= +res["createdAt"].getTime() + 300000){
                console.log("Time passed")
                return false;
            }
            // console.log(cur_time)
            return true;
        })
        return ctc;
    }catch(err){
        console.log("error")
        return false;
    }
}
const addStudentToInstance = async (req  , res) => {
    // console.log(req.body)
    const newStudent = {
        student_id : req.body.student_id,
        image : req.body.image
    }
    const b1 = await checkExistenceAndTiming(req.body.teacher_id , req.body.class_id);
    console.log(b1);
    if(!await checkClass(req.body.student_id , req.body.class_id)){
        res.send("student id or class don't match");
        return;
    }
    if(!b1){
        res.send("Cannot perform the action")
        return;
    }
    await ClassInstance.findOneAndUpdate({teacher_id : req.body.teacher_id , class_id : req.body.class_id}, { $push : {student_data : newStudent}}).then((resp)=>res.send("done"))
    .catch((err)=>{res.send("error occured")});
}//Multiple submissions have to be handeled

const checkClass = (student_id , class_id) => {
    try{
        const ctc = Student.findOne({student_id}).then((res)=>{
            if(res === null || res.class_id !== class_id)return false;
            return true;
        })
        return ctc;
    }catch(err){
        return false;
    }
}
module.exports = addStudentToInstance