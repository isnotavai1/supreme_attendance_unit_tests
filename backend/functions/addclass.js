const mongoose = require("mongoose");
const Class = require("../Models/Class");

const addClass = async (id , branch , year , section) =>{
    const newClass = new Class({
        class_id : id , 
        branch : branch,
        year : year,
        section : section
    })
    await newClass.save();
    console.log(newClass)
}
module.exports = addClass