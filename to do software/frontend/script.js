
let todos=[];
function add(){
    const values=document.querySelector("input");
    if (values.value.trim() == "") {
        alert("Please enter a todo.");
        return;
    }
    
    todos.push({
        title:values.value
    });
    render();
    values.value = "";


}
function del(i){
    todos.splice(i,1); 
    render();
}

function first_delete(){
    todos.splice(0,1);
    render();
}

function last_delete(){
    todos.splice(todos.length-1,1);
    render();
}
function render(){
    document.querySelector("#papa").innerHTML="";
    for(let i=0;i<todos.length;i++){
        const newdiv=document.createElement("div");
        newdiv.setAttribute(
            "style",
            "display:flex; justify-content:space-between; margin-top:20px;padding:10px;padding-top:-10px;background-color:rgba(230, 220, 81, 0.5);margin-left:100px;margin-right:100px;border-radius:10px;"
        );
        
        const spanel=document.createElement("h2");
        const buttonel=document.createElement("button");
        
        buttonel.onclick=function () {
            del(i);
        }
        
        
        buttonel.setAttribute(
            "style",
            "background-color: rgba(170, 64, 227,1); width: 90px; height: 30px; border-radius:8px;border-width:0px; font-weight:bold; cursor:pointer;"
        );
        
        spanel.innerHTML=todos[i].title;
        buttonel.innerHTML="Mark Done";
        
        newdiv.appendChild(spanel);
        newdiv.appendChild(buttonel);
        const father=document.querySelector("#papa");
        father.appendChild(newdiv);

    }
    
    
}





let ctr=1;
function addTodo(){
    const inputEl=document.querySelector("#nameInput");
    if (inputEl.value.trim() == "") {
        alert("Please enter a todo.");
        return;
    }

    const newdiv=document.createElement("div");
    const spanel=document.createElement("h2");
    const buttonel=document.createElement("button");

    spanel.innerHTML=inputEl.value;
    buttonel.innerHTML="Mark Done";
    newdiv.setAttribute("id",ctr);
    newdiv.appendChild(spanel);
    newdiv.appendChild(buttonel);
    const father=document.querySelector("#papa");
    father.appendChild(newdiv); 
    ctr++;
}
function deleteTodo(idd){
    const element=document.getElementById(idd);
    alert(element.firstChild.innerHTML+" is done");
    element.parentNode.removeChild(element);
}