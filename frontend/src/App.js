import {useState,createContext, useEffect} from 'react'
import './App.css';
import Home_pg from './Home_pg';
import Create_Attendance from './Create_Attendance';
import Give_attendance from './Give_attendance';
import CheckInstance from './CheckInstance';
export const AllContexts=createContext();
function App() {
  const [pg ,setPg] = useState((sessionStorage.getItem("pg") === null ? 1 : +sessionStorage.getItem("pg")));
  const movePgs=(val)=>{
    setPg(val);
  }
  useEffect(()=>{
    sessionStorage.setItem("pg" , pg);
  } , [pg]);
  return (
    <AllContexts.Provider value={{pg , movePgs}}>
    {pg === 1 && <Home_pg/>}
    {pg === 2 && <Create_Attendance/>}
    {pg === 3 && <Give_attendance/>}
    {pg === 4 && <CheckInstance/>}
      </AllContexts.Provider>
  );
}

export default App;
