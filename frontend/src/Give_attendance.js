import React , { useState ,useRef, useEffect} from 'react'
import Axios from "axios"
import Webcam from "react-webcam";
function Give_attendance() {
    const [picture, setPicture] = useState('')
    const [userdets , setUserdets] = useState({"student_id" : "random" , "class_id" : "code" , "teacher_id" : "teacher_id"})
  const webcamRef = React.useRef(null)
  const HandleSubmit = React.useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot()
    // console.log(pictureSrc)
    let base64 = get_base64(pictureSrc);
    if(base64 === -1){
        alert("some error occured with picture");
        return;
    }
    // console.log(base64);
    AddStudent(base64)
    // alert(res);
    // setPicture(pictureSrc)
  })
  const AddStudent =  (img)=>{
    console.log("posting...")
    console.log(img)
    Axios.post("http://ipaddress:8080/addStudentToInstance" , 
      {...userdets , image : img} 
    ).then((res)=>{
      console.log(res);
    }).catch((res)=>{
      console.log(res);
    })
  }
  //There are some cases not taken care of
  const get_base64 =(picture)=>{
      let at = -1;
      for(let i = 0 ; i < picture.length ; ++i){
          if(picture.substring(i , i + 7) === "base64,"){
            let ans = "";
            for(i = i + 7 ; i < picture.length ; ++i){
                ans += picture[i];
            }
            return ans;
          }
      }
      return -1;
  }
 
  
  return (
    <>
        <p>Enter your student id:</p>
        <input type='text' onChange={(e)=>{setUserdets({...userdets , "student_id":e.target.value})}}/>
        <p>Enter the ClassCode:</p>
        <input type='text' onChange={(e)=>{setUserdets({...userdets , "class_id":e.target.value})}}/>
        <p>Enter the teacher id :</p>
        <input type='text' onChange={(e)=>{setUserdets({...userdets , "teacher_id":e.target.value})}}/>       
        <button onClick={(e)=>{e.preventDefault() ; HandleSubmit() }}>Submit</button>
        <div>
     {picture == '' ?  <Webcam
            audio={false}
            height={400}
            ref={webcamRef}
            width={400}
            screenshotFormat="image/jpeg"
          />: <img src={picture}/>}
    </div>
    </>
  )
}

export default Give_attendance
