import React, { useState } from 'react'
import Axios from 'axios'
function CheckInstance() {
  const [teacherId , setTeacherId] = useState("no_id");
  const [displayRes , setDisplayRes] = useState([]);
  const FindIt = (teacherId) => {
    Axios.get(`http://ipaddress:8080/CheckInstance/${teacherId}`).then((res)=>{
        console.log(res.data)
        setDisplayRes(res.data);
    }).catch((err)=>{
        console.log(err);
    })
  } 
  const listItems = displayRes.map((item) =>
  <li key={item.student_id.toString()}>
    <p>{item.student_id}</p>
    <img src = {"data:image/jpeg;base64,"+item.image}/>
    
  </li>
);
  return (
        <>
            <div>Enter Teacher Id:</div>
            <input type = "text" onChange={(e) => setTeacherId(e.target.value)}/>
            <button onClick={()=>{FindIt(teacherId)}}>Submit</button>
            <ul>{listItems}</ul>
        </>
  )
}

export default CheckInstance
