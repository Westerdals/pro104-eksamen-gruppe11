

let toDoContainer = document.getElementById("container");
let toDoButton = document.getElementById("button-todo");
let toDoHeadtext = document.getElementById("todo-text-head");
let toDoText = document.getElementById("todo-text");

let headContainer = document.getElementById("head-container");
let toDoTextHeader = document.getElementById("todo-text");
let duringText= document.getElementById("during-text");
let finishedText = document.getElementById("finished-text");


let toDoDiv = document.getElementById("todo-div");
let duringDiv = document.getElementById("during-div");
let finishedDiv = document.getElementById("finished-div");


counter= 0;
toDoButton.onclick = function dothis(){

  const priorityColor= document.getElementById("prioritySelector").value;

toDoDiv.innerHTML +=
`<div class="post-it-divs" draggable="true" ondragenter="allowDrop(event)" 
ondragleave="allowDrop(event)" ondragstart="dragStart(event)" id="dragtarget${counter}" 
style="background-color:white; border: 5px solid ${priorityColor}">
<p>
<h3>${toDoHeadtext.value}</h3>
${toDoText.value}<p>
</div>`;
counter++;
}
var data = "";
function dragStart(event) {
  event.dataTransfer.setData("Text", event.target.id);
  }
  
function allowDrop(event) {
    event.preventDefault();
  }
function drop(event) {
    event.preventDefault();
   
 var data = event.dataTransfer.getData("Text");
  if(event.target.className !='post-it-divs'){
    event.target.appendChild(document.getElementById(data));
  }
    data = "";
   
  }





   function colorChange(){
     if(options1){
       return `background-color: green`;
    }else if(options2){
      return `background-color: yellow`;
    }else if(options3){
      return `background-color: red`;
    }
    //  return `background-color:rgb(${Math.random()*100},${Math.random()*100}, ${Math.random()*100})`;
    
    }
 
    mytime = setTimeout(expression, msec); 
    