const mongoose = require("mongoose");
const ClassInstance = require("../Models/ClassInstance")
const Teacher = require("../Models/Teacher");
const Class = require("../Models/Class")
const addClassInstance = async (teacher_id , class_id , password ,  resp)=>{
       
        try{
            const val1 = await Teacher.findOne({teach_id : teacher_id , password}).then((res)=>{
                if(res === null){
                    resp.send("Wrong credentials");
                    return false;
                }
                return true;
            })
            if(!val1)return;
            const val2 = await Class.findOne({class_id}).then((res)=>{
                if(res === null){
                    resp.send("Wrong class id");
                    return false;
                }
                return true;
            })
            if(!val2)return;
            await ClassInstance.findOne({teacher_id : teacher_id}).then((res)=>{
                if(res === null){
                    const newclassinst = new ClassInstance({
                        teacher_id : teacher_id ,
                        class_id : class_id 
                    })
                    newclassinst.save().then((res)=>{resp.send("done"); return;}).catch((err)=>{
                        resp.send("error occured");
                        return;
                    })
                    return;
                }
                else{
                    resp.send("already exsits")
                    return;
                }
            })
        }catch(err){
            console.log(err);
            resp.send(err);
        }
    
}

module.exports =  addClassInstance;