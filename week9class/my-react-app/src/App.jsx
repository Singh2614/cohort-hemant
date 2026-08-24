import {useState} from "react";
export default function App(){
  const [count,setCount]=useState(0);
  const [todos,settodos]=useState([{
    title:"go to gym",
    discription:"yes i will go to gym",
    done:false
  }])
  function onclickhandler(){
      setCount(count+1);
  }
  function oncl(){
    let n=todos.length;
    let arr=[];
    for(let i=0;i<n;i++){
      arr.push(todos[i]);
    }
    arr.push({
      title:document.getElementById("title").value,
      discription:document.getElementById("discription").value,
      status: false
    })
    settodos(arr);

  }
  return (
    
    <div>
      <button onClick={onclickhandler}> counter {count}</button>
      
      
      <div>
      <input id="title" placeholder="Enter title" />
      <input id="discription" placeholder="Enter Discription"/>
      <input id="status" placeholder="Enter status"/>
      </div>
      <button onClick={oncl}> Add To Do </button>
      {todos.map((todo)=>(
        <Todo
          title={todo.title}
          discription={todo.discription}
          status={todo.status}
        />
      ))}
    </div>

     
  );
  function Todo(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <h2>{props.discription}</h2>
      <h1>{props.status ? "Task is done" : "Task is not done"}</h1>
    </div>
  );
  }
}