import React from "react";
import { useEffect,useState } from "react";
import Mount from "../Mount";
const Life=()=>{
    const [count1,setCount11]=useState(0);
    const [value,setVisbile]=useState(true);
    
    useEffect(()=>{
        console.log("App is lifing.....")
    },[])
    return (
        <div>
            <p>hii</p>
            {!value?<Mount/>:<></>}
            <button onClick={()=>setVisbile(!value)}>toggle</button>

        </div>
        
    )
}
export default Life;