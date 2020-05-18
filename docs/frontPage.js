/*<span>
<div>
<p>
 <h1>Prosjekt manager</h1>
 <h3></h3>
</p>
</div>
<div id="div-text" style=" width: 100%; height: 70px; border: 2px solid black">
<input type="textbox" id="todo-text-head" placeholder="Overskrift">
<input type="textbox" id="todo-text" placeholder="Tekst">
<br>
<label for="prioritySelector">Velg hastighetsgrad</label>
<select id="prioritySelector"> 
<option id="option1" class="options" value="green">Lav hastighetsgrad</option>
<option id="option2" class="options"  value="yellow">Medium hastighetsgrad</option>
<option id="option3" class="options" value="red">Høy hastighetsgrad</option>
</select>
<br>
<input type="button" id="button-todo" value="add todo">
</div>
</span>

<span id="main-container">

<span id="containerToGetDisplayHorizontal">
 <span id="container">
   <div id="todo-text-header" class="headers">TODO</div>
   <div id="todo-div" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
   <div id="during-text-head"class="headers">WORK IN PROGRESS</div>
   <div id="during-div" ondrop="drop(event)"  ondragover="allowDrop(event)"></div>
   <div id="finished-text-head"class="headers">FINISHED</div>
   <div id="finished-div"ondrop="drop(event)" ondragover="allowDrop(event)"></div>
 </span>
 </span>
 </span>
 
*/



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
