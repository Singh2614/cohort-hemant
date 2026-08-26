import React, { useEffect, useState } from "react";

const Timer=()=>{
    const [count,setCount]=useState(0);
    const [running,setrun]=useState(true);

    useEffect(()=>{
        if(!running) return;
        console.log("new interval added");
        const timer=setInterval(()=>setCount(count=>count+1),1000);
        return function(){
            console.log("clear interval");
            clearInterval(timer);
        }
    },[running])
    return(
        <div>
            <h1>Stopwatch</h1>
            <p>{count}</p>
            <button onClick={()=>setrun(true)}>Stop</button>
            <button onClick={()=>setrun(false)}>Stop</button>
        </div>
    )
}
export default Timer;