const mongoose = require("mongoose");
const Teacher = require("../Models/Teacher");

const addteach = async (id , name , lastname , password) =>{
    const newTeach = new Teacher({
        teach_id : id , 
        teach_fir_name : name,
        teach_sec_name : lastname,
        password : password
    })
    await newTeach.save();
    console.log(newTeach)
}
module.exports = addteach