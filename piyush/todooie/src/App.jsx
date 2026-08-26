import React from "react";
import { useState } from "react";
import Header from './componenets/header'
import Todoitem from "./componenets/Todoitem";
import Button from "./componenets/Button";
import Counter from "./componenets/Counter";
import Life from "./componenets/life";
import Timer from "./componenets/Timer";
import './App.css';
 
 const app=()=>{
  


  return ( 
    
    
    <div className="todo-conatiner">
      <Counter/>
      
      <Header title="Kaam Ki List"/>
      <Todoitem item="Break Fast" completed={false} />
      <Todoitem item="Lunch"/>
      <Todoitem item="Dinner"/>
      <Todoitem item="Snacks"/>
      <Todoitem item="Sports"/>
      <Button/>
      
      <div>
         <Life/>
         <Timer/>
      
      </div>
    </div>
    
    
  );
 }
 export default app;