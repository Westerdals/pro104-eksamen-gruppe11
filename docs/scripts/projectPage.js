/* Elements on the page for quick access. */
let toDoContainer = document.getElementById("container");
let toDoButton = document.getElementById("button-todo");

let headContainer = document.getElementById("head-container");
let duringText= document.getElementById("during-text");
let finishedText = document.getElementById("finished-text");

let toDoDiv = document.getElementById("todo-div");
let duringDiv = document.getElementById("during-div");
let finishedDiv = document.getElementById("finished-div");

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
    const projectSelectorDiv = document.getElementById('projectSelector-div');
    removeAllChildren(projectSelectorDiv);
    
    const newElement = document.createElement('h3');
    newElement.innerHTML = `Seems like you do not have any projects. Click <a href="./projectRegister.html">here</a> to get started!`;
    projectSelectorDiv.appendChild(newElement);

    const projectInformationDiv = document.getElementById('projDescriptionSec');
    projectInformationDiv.style.display = 'none';
  }
} else {
  projectListEl.childNodes.forEach(child => {
    if(parseInt(child.value) === selectedProject) {
      child.selected = true;
    }
  })
}

if(selectedProject != null) {
  let tasks = getTasksForProject(selectedProject);
  renderProjectInformation();
  renderTasks(tasks);
} else {
  // remove add task button since there are no projects..
  const addTaskButtonDiv = document.getElementById('addTaskBtnDiv');
  removeAllChildren(addTaskButtonDiv);
}

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

function drop(event, element) {
  event.preventDefault();
  const dataTransfer = event.dataTransfer.getData('Text');
  const droppedOnDiv = event.target;
  const taskId = dataTransfer;
  switch (droppedOnDiv) {
    case toDoDiv:
      saveTaskStatus(selectedProject, taskId, "TODO");
      droppedOnDiv.appendChild(document.getElementById(dataTransfer));
      break;

    case duringDiv:
      saveTaskStatus(selectedProject, taskId, "IN_PROGRESS");
      droppedOnDiv.appendChild(document.getElementById(dataTransfer));
      break;

    case finishedDiv:
      saveTaskStatus(selectedProject, taskId, "DONE");
      droppedOnDiv.appendChild(document.getElementById(dataTransfer));
    break;
    
    default:
      console.error(`Task dropped on unknown element`);
  }    
}

// Function to make taskregister popup.
toDoButton.onclick = function() {
  const taskPopupWindow = document.getElementById("popUp");
  taskPopupWindow.style.zIndex = "2";
  taskPopupWindow.style.display = "flex";
  fetch('./taskPopUp.html')
  .then(data => data.text())
  .then(html => document.getElementById('popUp').innerHTML = html)
  .then(() => {
        // Close-button to close the taskregister window.
        const close = document.getElementById("closeButton");

        close.onclick = function(){
          taskPopupWindow.style.zIndex = "-1";
          taskPopupWindow.style.display = "none";
        }
  }); 
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
  element.ondblclick = () => createTaskSettingsPopup(task.id);
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

  const delegates = task.delegate ?? [];

  element.innerHTML += `<h4 class="header-for-tasks">${task.taskText}</h4>`;
  element.innerHTML += `<p class="priority-for-tasks">Priority: <b>${task.priorities}<b></p>`;
  element.innerHTML += `<p class="date-for-tasks">Start date: ${getFormattedDate(task.taskStartDate)}</p>`;
  element.innerHTML += `<p class="date-for-tasks"> Due date: ${getFormattedDate(task.taskEndtDate)}</p>`;
 
  
  if(delegates.length != 0){
    let taskDelegates = ""
    delegates.forEach(delegate => {
      const member = getMemberById(parseInt(delegate.userId));
      if(member != null) {
        taskDelegates += `${member.firstName} ${member.lastName}, `
      } else {
        console.error(`Could not find member with id: ${delegate}`);
      }
    });
    element.innerHTML += `<p class="responsible-for-tasks"> ${taskDelegates.slice(0, -2)}</p>`;
  }
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

// Function to render project information on the board
function renderProjectInformation(){
  const project = getProjectById(selectedProject);

  const projectDescriptionElement = document.getElementById('projectDescription');
  projectDescriptionElement.innerHTML = project.projectDesc;

  const projectStartDateElement = document.getElementById('projectStartDate');
  projectStartDateElement.innerHTML = getFormattedDate(project.startDate);

  const projectEndDateElement = document.getElementById('projectEndDate');
  projectEndDateElement.innerHTML = getFormattedDate(project.endDate);
}

function createTask(event) {
  event.preventDefault();

  const taskText = document.getElementById('taskText').value;
  const priorities = document.getElementById('priorities').value;
  const taskStartDateAsString = document.getElementById('taskStartDate').value;
  const taskEndDateAsString = document.getElementById('taskEndtDate').value;

  const task = {
      id: generateUuid(),
      taskText,
      priorities,
      taskStartDate: taskEndDateAsString,
      taskEndtDate: taskEndDateAsString,
      delegate: []
  };

  const taskStartDate = new Date(taskStartDateAsString);
  const taskEndDate = new Date(taskEndDateAsString);

  const project = getProjectById(selectedProject);
  const projectStartDate = new Date(project.startDate);
  const projectEndDate = new Date(project.endDate);

  if (taskStartDate < projectStartDate) {
      showStatusMessage("Task can't start before project start..", false);
  } else if (taskEndDate > projectEndDate) {
      showStatusMessage("Task can't end after project end..", false);
  } else if (taskStartDate > taskEndDate) {
      showStatusMessage("Task can't end before start date..", false);
  } else {
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
}

function createTaskSettingsPopup(taskId) {
  const taskPopupWindow = document.getElementById("popUp");
  taskPopupWindow.style.zIndex = "2";
  taskPopupWindow.style.display = "flex";
  fetch('./taskSettingsPopUp.html')
  .then(data => data.text())
  .then(html => document.getElementById('popUp').innerHTML = html)
  .then(() => {
        const close = document.getElementById("closeButton");
        close.onclick = () => {
          taskPopupWindow.style.zIndex = "-1";
          taskPopupWindow.style.display = "none";
          renderTasks(getTasksForProject(selectedProject));
        }

        const task = getTasksForProject(selectedProject).find(task => task.id == taskId);
        createMemberResponsibilityTable(task);
        createPrioritySelector(task);
        createTaskStartDateSelector(task);
        createTaskEndDateSelector(task);
  });
}

function createMemberResponsibilityTable(task) {
  const memberList = getMembers();
  const memberTable = document.getElementById('membersTable');

  if(memberList.length == 0) {
    removeAllChildren(memberTable);
    const errorMsgElement = document.createElement('p');
    errorMsgElement.innerHTML = `<p>You have not registered any members. You can do that <a href="./userRegister.html">here</a></p>`;
    document.getElementById('modal').appendChild(errorMsgElement);
  }

  memberList.forEach(member => {
    const tableRow = document.createElement('tr');
    const tableCellMember = document.createElement('td');
    const tableCellResponsible = document.createElement('td');

    tableCellMember.innerText = `${member.firstName} ${member.lastName}`;

    const responsibleCheckBox = document.createElement('input');
    responsibleCheckBox.type = 'checkbox';
    
    responsibleCheckBox.value = member.id;
    responsibleCheckBox.checked = task.delegate.find(d => d.userId == member.id) ? true : false;

    tableCellResponsible.appendChild(responsibleCheckBox);
    tableRow.appendChild(tableCellMember);
    tableRow.appendChild(tableCellResponsible);
    memberTable.appendChild(tableRow);

    responsibleCheckBox.onclick = (event) => event.target.checked ? delegateMemberToTask(selectedProject, task, event.target.value) : removeMemberFromTask(selectedProject, task, event.target.value);
  });
}

function createPrioritySelector(task) {
  const priorityElement = document.getElementById('taskPriority');
  createOption(priorityElement, 'Low', 'Low');
  createOption(priorityElement, 'Medium', 'Medium');
  createOption(priorityElement, 'High', 'High');
  
  priorityElement.childNodes.forEach(option => {
    if(option.value == task.priorities) {
      option.selected = true;
    }
  })

  priorityElement.onchange = (event) => setTaskPriority(selectedProject, task, event.target.value);
}

function createTaskStartDateSelector(task) {
  const taskStartDateElement = document.getElementById('taskStartDate');
  taskStartDateElement.value = task.taskStartDate;
  taskStartDateElement.onchange = (event) => {
    const project = getProjectById(selectedProject);
    const taskStartDate = new Date(event.target.value);
    const taskEndDate = new Date(document.getElementById('taskEndtDate').value);
    const projectStartDate = new Date(project.startDate);

    if (taskStartDate < projectStartDate) {
      showStatusMessage("Task can't start before project start..", false);
      taskStartDateElement.value = task.taskStartDate;
    } else if(taskStartDate > taskEndDate){
      showStatusMessage("Task can't start can't start before task end..", false);
      taskStartDateElement.value = task.taskStartDate;
    } else {
      document.getElementById('status').style.display = 'none';
      setTaskStartDate(selectedProject, task, event.target.value);
    }
  }
}

function createTaskEndDateSelector(task) {
  const taskEndDateElement = document.getElementById('taskEndtDate');
  taskEndDateElement.value = task.taskEndtDate;
  taskEndDateElement.onchange = (event) => {
    const project = getProjectById(selectedProject);
    const taskStartDate = new Date(document.getElementById('taskStartDate').value);
    const taskEndDate = new Date(event.target.value);
    const projectEndDate = new Date(project.endDate);

    if (taskEndDate > projectEndDate) {
      showStatusMessage("Task can't end after project end..", false);
      taskEndDateElement.value = task.taskEndtDate;
    } else if (taskStartDate > taskEndDate) {
      showStatusMessage("Task can't end before start date..", false);
      taskEndDateElement.value = task.taskEndtDate;
    } else {
      document.getElementById('status').style.display = 'none';
      setTaskEndDate(selectedProject, task, event.target.value);
    }
  }
}