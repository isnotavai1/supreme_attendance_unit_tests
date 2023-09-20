import React , {useContext} from 'react'
import './Home_pg.css'
import { AllContexts } from './App'
function Home_pg() {
    const changepg=useContext(AllContexts);
  return (
    <>
        <button onClick={()=>{changepg.movePgs(2)}}>Take Attendance As teacher</button>
        <br></br>
        <button onClick={()=>{changepg.movePgs(3)}}>Give Attendance</button>
        <br></br>
        <button onClick={()=>{changepg.movePgs(4)}}>check Attendance status</button>
    </>
  )
}

export default Home_pg
