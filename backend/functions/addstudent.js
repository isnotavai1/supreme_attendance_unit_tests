const mongoose = require("mongoose");
const Student = require("../Models/Student");
const classes = require("../Models/Class")
const addStudent =  async (id , classid , name , lastname , image) =>{
    try{
        await classes.findOne({class_id : classid}).then((res)=>{
            console.log(classid)
            console.log(res);
            if(res === null)return;
            const newStud = new Student({
                student_id : id,
                class_id : classid,
                stu_fir_name : name,
                stu_last_name : lastname,
                default_img : image
            })
            saveStud(newStud);
        }).catch((err) => {
            return "e";
        })
    }catch(err){
        console.log("error occured details seem to be correct");
    }
}
const saveStud =async (newStud)=>{
    await newStud.save().then((res)=>{console.log(res)});
}
module.exports = addStudent