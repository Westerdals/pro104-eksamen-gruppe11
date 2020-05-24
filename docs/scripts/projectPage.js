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
- Render all the tasks for the selected project on the page.
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
    selectedProject = getSelectedProjectFromUrlHash();
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

let tasks = getTasksForProject(selectedProject);
renderTasks(tasks);

// When the project changes: create a new hash in the url and re-render all tasks
projectListEl.onchange = (changeEvent) => {
  setSelectedProjectToUrlHash(changeEvent.target.value);
  selectedProject = getSelectedProjectFromUrlHash();
  renderTasks(getTasksForProject(selectedProject));
}

//Drag and drop functions
function dragStart(event) {
  event.dataTransfer.setData("Text", event.target.id);
}
  
function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  const dataTransfer = event.dataTransfer.getData('Text');
  if(event.target.className != 'post-it-divs') {
    const droppedOnDiv = event.target;
    droppedOnDiv.appendChild(document.getElementById(dataTransfer));
    const taskId = dataTransfer;
    
    switch (droppedOnDiv) {
      case toDoDiv:
        saveTaskStatus(selectedProject, taskId, "TODO");
        break;

      case duringDiv:
        saveTaskStatus(selectedProject, taskId, "IN_PROGRESS");
        break;

      case finishedDiv:
        saveTaskStatus(selectedProject, taskId, "DONE");
      break;
      
      default:
        console.error(`Task dropped on unknown element ${droppedOnDiv}`);
    }    
  }
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

function createTaskElement(task) {
  const element = document.createElement('div');
  element.draggable = true;
  element.ondragenter = (event) => allowDrop(event);
  element.ondragleave = (event) => allowDrop(event);
  element.ondragstart = (event) => dragStart(event);
  element.id = task.id
  element.classList.add('post-it-divs');
  
  switch(task.priorities.toUpperCase()) {
    case "LOW":
      element.classList.add('lowPriority');
      break;
    case "MEDIUM":
      element.classList.add('mediumPriority');
      break;
    case "HIGH":
      element.classList.add('highPriority');
      break;
    default:
      element.classList.add('unknownPriority');
  }
  
  element.innerHTML = `<h3>${task.taskText}</h3>`;
  element.innerHTML += `<p>${task.taskStartDate}</p>`;
  element.innerHTML += `<p>${task.taskEndtDate}</p>`;
  element.innerHTML += `<p>${task.priorities}</p>`;

  return element;
}

// Function to render (and re-render) tasks on the board
function renderTasks(tasks) {
  // first remove all tasks on the board.
  removeAllChildren(toDoDiv);
  removeAllChildren(duringDiv);
  removeAllChildren(finishedDiv);

  // loop through all the tasks. Check their status.. todo, doing or done
  tasks.forEach((task) => {
    const status = task.status ?? "TODO";
    const element = createTaskElement(task);
    switch(status.toUpperCase()) {
      case "IN_PROGRESS":
        duringDiv.appendChild(element);
        break;
      case "DONE":
        finishedDiv.appendChild(element);
        break;
      default:
        toDoDiv.appendChild(element);
    }
  });
}

function createTask(event) {
  event.preventDefault();

  const taskText = document.getElementById('taskText').value;
  const priorities = document.getElementById('priorities').value;
  const taskStartDate = document.getElementById('taskStartDate').value;
  const taskEndtDate = document.getElementById('taskEndtDate').value;

  const task = {
      id: generateUuid(),
      taskText,
      priorities,
      taskStartDate,
      taskEndtDate,
      delegate: []
  };

  const projectList = getProjects();
  projectList.forEach((el) => {
      if (el.ProjectID === selectedProject) {
          el.tasks.push(task);
      }
  });

  saveProjects(projectList);
  renderTasks(getTasksForProject(selectedProject));

  // Close the popup
  const taskPopupWindow = document.getElementById("popUp");
  taskPopupWindow.style.zIndex = "-1";
  taskPopupWindow.style.display = "none";
}