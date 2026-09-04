import React from "react";

function Postcard(props){
    return(
        <div style={{backgroundColor:"lightgreen", display:"flex",flexDirection:"column",padding:20,margin:20,width:500}}>
            <h1>Name : {props.name}</h1>
            <p>Email : {props.email}</p>
        </div>
    )   
}

export default Postcard;