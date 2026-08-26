import React from "react";
import { useState } from "react";
const Couter=(props)=>{
    const [count,setCount]= useState(0);
    const [value,setValue]= useState("even");
    return(
        <div>
            <p>Count Componenet : {count}</p>
            <p> {count % 2===0? "even": "odd"}</p>
            <p>Counter is {value}</p>
            <button onClick={()=>setCount(count+1)}>Increment  </button>
            <button onClick={()=>setCount(count-1)}>Decrement  </button>
        </div>
 
        
         
    )
}
export default Couter;