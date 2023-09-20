const mongoose = require("mongoose");
const classes = require("../Models/Class")
const getClass = async (id)=>{
    await classes.findOne({class_id : id}).then((res)=>{
        // console.log(res);
        if(res === null)return null;
        return res;
    }).catch((err) => {
        return "e";
    })

}
module.exports = getClass