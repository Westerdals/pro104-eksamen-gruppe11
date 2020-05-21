

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

//The event that happens when you click create task - div is created. 
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

//Drag and drop functions
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


 //Dette er en funksjon som vi kan bruke til å sette påminnelser. 
 // https://www.plus2net.com/javascript_tutorial/timer-set.php
    //mytime = setTimeout(expression, msec); 

    
   
    document.getElementById("button-todo").onclick = function() {
      document.getElementById("popUp").style.zIndex = "2";
    }

      
      const taskPopupWindow = document.createElement("div");
      
      taskPopupWindow.setAttribute("id", "popUp");
      
      document.body.appendChild(taskPopupWindow);
      

      document.getElementById("popUp").innerHTML = `
    
    <br> 
    <br> 
    <br> 
    
    <div>
    <input type="button" value="Close" id="closeButton">
        <form>
            <h4>Opprett Oppgaver</h4>
            <label for="addTask">Add Task</label>
            <input type="text" placeholder="Add task" required>
            <label for="priority">Choose priority:</label>
            <input list="priority" name="priorities" id="priorities">
            <datalist id="priority">
                <option value="Low">
                <option value="Medium">
                <option value="High">
            </datalist>
            <br>

            <!-- Adding start and end date for the Project -->
            <label for="taskStartDate">Start Date</label>
            <input type="date" name="taskStartDate" required>
            <label for="taskEndtDate">End Date</label>
            <input type="date" name="taskEndtDate" required>
            <br>
            <input type="submit">
        </form>
    </div>
    
    <!-- delegate task to exisiting users -->
    <div>
        <form onsubmit="delegate(event)">
            <h3>Deleger Oppgaver (alternativt) </h3>
            <input list="userList" id="user" name="memberListInput" type="text" placeholder="Velg person..." required>
            <datalist id="userList"></datalist>
            <input list="taskList" id="taskListInput" name="taskListInput" type="text"
                placeholder="Tildel registrert oppgave..." required>
            <datalist id="taskList"></datalist>

            <input type="submit" value="Legg til" />
        </form>

    </div>
    
    `;

    let close = document.getElementById("closeButton");

    close.onclick = function(){
      taskPopupWindow.style.zIndex = "-1";
  }  