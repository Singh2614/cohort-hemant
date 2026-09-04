 import React from "react";
import Postcard from "./compo/Postcard";
 import { useEffect,useState } from "react";
 import getposts from "./compo";
 function App(){
  const [data,setdata]=useState(null);
  useEffect(()=>{
    getposts().then((c)=>setdata(c));
  },[]);
  
  return(
    <div className="App" style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
    {data?data.map((e)=> (<Postcard name={e.name} email={e.email}/>)):<p>no data found</p>}
    </div>
  )
}
export default App;