

let toDoContainer = document.getElementById("container");
let toDoButton = document.getElementById("button-todo");
let toDoHeadtext = document.getElementById("todo-text-head");
let toDoText = document.getElementById("todo-text");

let headContainer = document.getElementById("head-container");
let toDoTextHeader = document.getElementById("todo-text");
let duringText = document.getElementById("during-text");
let finishedText = document.getElementById("finished-text");


let toDoDiv = document.getElementById("todo-div");
let duringDiv = document.getElementById("during-div");
let finishedDiv = document.getElementById("finished-div");

counter = 0;

//The event that happens when you click create task - div is created. 
toDoButton.onclick = function dothis() {

  const priorityColor = document.getElementById("prioritySelector").value;

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
  if (event.target.className != 'post-it-divs') {
    event.target.appendChild(document.getElementById(data));
  }
  data = "";

}


//Dette er en funksjon som vi kan bruke til å sette påminnelser. 
// https://www.plus2net.com/javascript_tutorial/timer-set.php
//mytime = setTimeout(expression, msec); 



document.getElementById("button-todo").onclick = function () {
  document.getElementById("popUp").style.zIndex = "2";
}


const taskPopupWindow = document.createElement("div");

taskPopupWindow.setAttribute("id", "popUp");

document.body.appendChild(taskPopupWindow);


document.getElementById("popUp").innerHTML = `
    
   
<<<<<<< HEAD
    
    <div>
    <input type="button" value="Close" id="closeButton" class="large-button">
=======
    // Function to make taskregister popup.
    toDoButton.onclick = function() {
      document.getElementById("popUp").style.zIndex = "2";
      taskPopupWindow.style.display = "flex";
    }

      
      const taskPopupWindow = document.createElement("div");
      
      taskPopupWindow.setAttribute("id", "popUp");
      
      document.body.appendChild(taskPopupWindow);
      

      document.getElementById("popUp").innerHTML = `
    
    <br> 
    <br> 
    <br> 
    
    <div id="modal" class="modal">
    <input type="button" data-close-button value="Close" id="closeButton">
>>>>>>> 965ad5b1e0334836d8d19c48ccd8645ec4dd17db
        <form>
            <h4>Opprett Oppgaver</h4>
            <label for="addTask">Add Task</label>
            <input type="text" class="small-textbox" placeholder="Add task" required><br>
            <label for="priority">Choose priority:</label>
            <input list="priority" name="priorities" id="priorities" class="urgency-select">
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
            <input type="submit" class="large-button">
        </form>
    </div>

    
    <!-- delegate task to exisiting users -->
    <div>
    <br>
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

<<<<<<< HEAD
// Close-button to close the taskregister window.
const close = document.getElementById("closeButton");

close.onclick = function () {
  taskPopupWindow.style.zIndex = "-1";
  taskPopupWindow.style.display = "none";
}

const openModalButtons = document.querySelectorAll(`[data-modal-target]`);
const closeModalButtons = document.querySelectorAll(`[data-close-button]`);
const overlay = document.getElementById(`overlay`);

openModalButtons.forEach(toDoButton => {
  toDoButton.addEventListener(`click`, () => {
    const modal = document.querySelector(toDoButton.dataset.modalTarget)
    openModal(modal);
  })
})

// Make popUp close when clicking outside in the overlay
//overlay.addEventListener(`click`, () => {
//const modals = document.querySelectorAll(`.modal.active`);
//modals.forEach(modal => {
//closeModal(modal);
//})
//})

closeModalButtons.forEach(toDoButton => {
  toDoButton.addEventListener(`click`, () => {
    const modal = toDoButton.closest(`.modal`);
    closeModal(modal);
  })
})

function openModal(modal) {
  if (modal == null) return
  modal.classList.add(`active`);
  overlay.classList.add(`active`);
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove(`active`);
  overlay.classList.remove(`active`);
=======
    // Close-button to close the taskregister window.
    const close = document.getElementById("closeButton");

    close.onclick = function(){
      taskPopupWindow.style.zIndex = "-1";
      taskPopupWindow.style.display = "none";
  }  

  const openModalButtons = document.querySelectorAll(`[data-modal-target]`);
  const closeModalButtons = document.querySelectorAll(`[data-close-button]`);
  const overlay = document.getElementById(`overlay`);

  openModalButtons.forEach(toDoButton =>{
    toDoButton.addEventListener(`click`, () => {
      const modal = document.querySelector(toDoButton.dataset.modalTarget)
      openModal(modal);
  })
})

// Make popUp close when clicking outside in the overlay
//overlay.addEventListener(`click`, () => {
  //const modals = document.querySelectorAll(`.modal.active`);
  //modals.forEach(modal => {
    //closeModal(modal);
  //})
//})

closeModalButtons.forEach(toDoButton =>{
  toDoButton.addEventListener(`click`, () => {
    const modal = toDoButton.closest(`.modal`);
    closeModal(modal);
  })
})
  
function openModal(modal){
  if(modal == null) return
  modal.classList.add(`active`);
  overlay.classList.add(`active`);
}

function closeModal(modal){
  if(modal == null) return
  modal.classList.remove(`active`);
  overlay.classList.remove(`active`);
}
>>>>>>> 965ad5b1e0334836d8d19c48ccd8645ec4dd17db
