import React from "react";
import { useEffect,useState } from "react";
 
const Mount=()=>{
    const [count1,setCount11]=useState(0);
    const [count2,setVisbile]=useState(true);
    useEffect(()=>{
        console.log("App is mounting...");
        return function (){
            console.log("unmountinggg...")
        }
    },[])
    useEffect(()=>{
        console.log("mounting done on count1,2")
        return function(){
            console.log(`returning value ${count1}`)
        }
    },[count1])
    return (
        <div>
            <p>hii</p>
            <button onClick={()=>setCount11(count1+1)}>count1</button>
            <button onClick={()=>setVisbile(count2+1)}>count2</button>

        </div>
        
    )
}
export default Mount;