import React, { useDebugValue, useState } from 'react'
import Axios from 'axios';
function Create_Attendance() {
  const [generated , setGenerated] = useState(true);
  const [end_time , setEndTime] = useState(Date());
  const [code , setCode] = useState("random");
  const [user , setUser] = useState({
    "teacher_id" : "noone",
    "password" : "password",
    "class_id" : "class_id"
  })
  const generateClass = ()=>{
    console.log(user)
    Axios.post("http://ipaddress:8080/addClassInstance",user).then((res)=>{
        console.log(res);
    }).catch((err)=>{
      console.log(err);
    })
  }
  return (
    <>
        <p>teacher_id:</p>
        <input type='text' onChange={(e)=>setUser({...user , "teacher_id" : e.target.value})}/>
        <p>Password:</p>
        <input type='password'onChange={(e)=>setUser({...user , "password" : e.target.value})}/>
        <p>class_id: </p>
        <input type='text' onChange={(e)=>setUser({...user , "class_id" : e.target.value})}/>
        <button onClick={()=>{generateClass()}}>Submit</button>
        {generated && <p>{`Code is ${code} and end Time is ${end_time}`}</p>}
    </>
  )
}

export default Create_Attendance
