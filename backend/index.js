if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const addTeach = require('./functions/addteacher')
const addClass = require('./functions/addclass')
const getClass = require('./functions/getClass')
const classes = require('./Models/Class')
const app = express()
app.use(bodyParser.urlencoded({ extended: false , limit : '50mb' }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: "POST, PUT, PATCH, GET, DELETE, OPTIONS",
    headers: "Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization"
  }));
const makeConnection = require('./config/makeConnection');
const addStudent = require("./functions/addstudent");
const addClassInstance = require("./functions/addClassInstance");
const ClassInstances = require("./Models/ClassInstance")
const addStudentToClassInstance = require("./functions/addStudenttoInstance")
makeConnection(process.env.DB_CONNECTION);
app.get("/",(req , res)=>{
    console.log(req.body)
    res.json({"hello" : "world"});
})
app.post("/addTeach/:id/:name/:lastname/:password" , (req , res) => {
    addTeach(req.params.id , req.params.name , req.params.lastname , req.params.password);
    res.send("Teacher add or not idk")
})
app.post("/addClass/:id/:branch/:year/:section" , (req , res) => {
    addClass(req.params.id , req.params.branch , req.params.year , req.params.section);
    res.send("class add or not idk")
})
app.get("/class/:id" , async (req , res) => {
    await classes.findOne({class_id : req.params.id}).then((resp)=>{
        if(resp === null){
            res.send("no such class exists");
            return;
        }
        res.send(resp);
    }).catch((err) => {
        res.send("some error occured");
    })
})
app.post("/addstud" , (req , res)=>{
    console.log("To add a student")
    addStudent(req.body.id , req.body.classid , req.body.name , req.body.lastname , req.body.image)
    res.send("added maybe")
})
app.post("/addClassInstance" , (req , res) => {
    addClassInstance(req.body.teacher_id , req.body.class_id , req.body.password , res);
})
app.get("/InstanceTiming" , async (req , res) => {
    try{
        await ClassInstances.findOne({teacher_id : req.body.teacher_id , class_id : req.body.class_id}).then((resp)=>{
            if(resp === null){
                res.send("not found")
                return;
            }
            res.send(resp);
        })
    }catch(err){
        res.send("error occured")
    }
})
app.post("/addStudentToInstance" , (req , res) => {
    addStudentToClassInstance(req , res);//expects tid , cid , sid , photo
})
app.get("/CheckInstance/:teacher_id" , async (req , res) =>{
    await ClassInstances.findOne({teacher_id : req.params.teacher_id}).then((resp)=>{
        // console.log("response : " , req.body.teacher_id);
        // console.log(resp);
        if(resp === null){
            res.send([]);
            return;
        }
        res.send(resp.student_data);
    }).catch((err) => {
        res.send([]);
    })
})
app.listen(process.env.PORT , 'ipaddress' || 'localhost',()=>{
    console.log("server active on " , process.env.PORT)
})
