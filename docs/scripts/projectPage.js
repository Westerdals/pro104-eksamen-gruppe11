/* Elements on the page for quick access. */
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

let counter= 0;

// Handy function to create option elements for html select
const createOption = (parentEl, id, value) => {
  let option = document.createElement('option');
  option.setAttribute('value', id);
  option.innerHTML = value;
  parentEl.appendChild(option);
};


/* Start rendering the page.
- Get all projects from local storage and create html select options for them
- Look for a # in the url. If there is a hashtag, use that number as the selected project
- Change the hash in the url whenever a project changes.
*/

const projectList = getProjects();
const projectListEl = document.getElementById('projectSelector');

for (let project of projectList) {
    createOption(projectListEl, project.ProjectID, project.projectName);
}

let selectedProject = getSelectedProjectFromUrlHash();

if(selectedProject === null) {
  const firstProjectInList = projectListEl.childNodes[0] ?? null;
  if(firstProjectInList != null) {
    firstProjectInList.selected = true;
    setSelectedProjectToUrlHash(firstProjectInList.value);
  } else {
    console.log("No projects.");
  }
} else {
  projectListEl.childNodes.forEach(child => {
    if(parseInt(child.value) === selectedProject) {
      child.selected = true;
    }
  })
}

projectListEl.onchange = (changeEvent) => {
  setSelectedProjectToUrlHash(changeEvent.target.value);
  selectedProject = getSelectedProjectFromUrlHash();
}



//The event that happens when you click create task - div is created. 
toDoButton.onclick = () => {

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



  
   
// Function to make taskregister popup.
toDoButton.onclick = function() {
  const taskPopupWindow = document.getElementById("popUp");
  taskPopupWindow.style.zIndex = "2";
  taskPopupWindow.style.display = "flex";
  fetch('/docs/taskPopUp.html')
    .then(data => data.text())
    .then(html => document.getElementById('popUp').innerHTML = html)
    .then(() => {
          // Close-button to close the taskregister window.
          const close = document.getElementById("closeButton");

          close.onclick = function(){
            taskPopupWindow.style.zIndex = "-1";
            taskPopupWindow.style.display = "none";
          }

          const openModalButtons = document.querySelectorAll(`[data-modal-target]`);
          const closeModalButtons = document.querySelectorAll(`[data-close-button]`);
        
          openModalButtons.forEach(toDoButton =>{
            toDoButton.addEventListener(`click`, () => {
              const modal = document.querySelector(toDoButton.dataset.modalTarget)
              openModal(modal);
          })
        })

        closeModalButtons.forEach(toDoButton =>{
          toDoButton.addEventListener(`click`, () => {
            const modal = toDoButton.closest(`.modal`);
            closeModal(modal);
          })
        })

    });  
}
  
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

function getSelectedProjectFromUrlHash() {
  if(window.location.hash) { 
    const projectId = window.location.hash.split(`#`)[1];
    return parseInt(projectId);
  } else {
    console.log(`No project selected.`);
    return null;
  }
}

function setSelectedProjectToUrlHash(projectId) {
  window.location.hash = projectId;
}