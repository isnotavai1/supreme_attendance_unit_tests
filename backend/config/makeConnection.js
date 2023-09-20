const mongoose = require('mongoose');
async function makeConnection(con){
    try{
        await mongoose.connect(con)
        console.log("done")
    }
    catch(err){
        console.log(err);
    }
}
module.exports = makeConnection