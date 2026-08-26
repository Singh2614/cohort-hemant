import React from "react";

const Todoitem=(props)=>{
    return(<li className="task">
        <span>
            {props.completed ? <></>: <input type="checkbox"/> }
            <span>{props.item}</span>
        </span>
        <span>...</span>
        
        
         
    </li>);
}
export default Todoitem;