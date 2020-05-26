//User IdGenerator
function ProjectID() {
    let IdCounter = "";

    let projects = JSON.parse(window.localStorage.getItem("Projects"));

    if (projects === null || projects.length == 0) {
        IdCounter = 2000
    } else {
        IdCounter = 2000 + projects.length
    }

    return IdCounter;

}

//Creating new project
function createProject(event) {
    event.preventDefault();

    const projectName = document.getElementById("projectName").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const projectDesc = document.getElementById("projectDesc").value;

    const projectInfo = { ProjectID: ProjectID(), projectName, startDate, endDate, projectDesc, tasks: [], delegate: [], memberList: [] };

    const projectList = getProjects();

    // Don't add the project if form is not valid or the project name is duplicate

    if (isValidProjectInput() && isNotDuplicateProjectName(projectName, projectList) && isProjectDateValid(startDate, endDate)) {
        projectList.push(projectInfo);
        saveProjects(projectList);
        showStatusMessage("Project created.", true);

        // Display the new member list to the user.
        createMembersDropdownList();
        showAssignedProject();
        showAddProjectDetails();
        renderProjectList();
    }

}

// This function is a part of projectregister popup. Add task to the new created project.

function addTaskProject(event) {

    event.preventDefault();

    const taskText = document.getElementById("taskText").value;
    const priorities = document.getElementById("priorities").value;
    const taskStartDate = document.getElementById("taskStartDate").value;
    const taskEndDate = document.getElementById("taskEndDate").value;
    const task = { id: generateUuid(), taskText, priorities, taskStartDate, taskEndtDate: taskEndDate, delegate: [] }

    const projects = getProjects();

    const lastProject = projects[projects.length - 1];

    if (isTaskDateValidForProject(taskStartDate, taskEndDate, lastProject)) {
        lastProject.tasks.push(task);
        saveProjects(projects)
        event.target.reset();
        showStatusMessage("Added task to project", true);
    }
}

// function to create option for the select element
const createOption = (parentElement, id, value) => {
    const option = document.createElement('option');
    option.setAttribute('value', id);
    option.textContent = value;
    parentElement.appendChild(option);
}

// create the dropdown menu for selecting member
function createMembersDropdownList() {
    const members = document.querySelector('#add-members-form__assigned-members');
    const userList = getMembers();

    // Make the dropdown empty before creating the new elements.
    if (members.length != 0) {
        while (members.lastElementChild) {
            members.removeChild(members.lastElementChild);
        }
    }
    for (const list of userList) {
        const { id, firstName, lastName } = list;
        createOption(members, id, firstName + ' ' + lastName);
    }
}

function showAssignedProject() {
    const projectElement = document.querySelector('#add-members-form__project');
    const allProjects = getProjects();
    projectElement.innerHTML = allProjects[allProjects.length - 1].projectName;
}

// Event Listener for delegating members to a project
document.querySelector('.add-members-form__submit').addEventListener('click', (e) => {
    e.preventDefault();
    const members = document.querySelector('#add-members-form__assigned-members');
    const projects = document.querySelector('#add-members-form__project');
    const userValue = members.value;
    const projectValue = projects.value;
    const memberList = { userId: userValue, projectId: projectValue };
    const projectList = getProjects();
    const lastProject = projectList[projectList.length - 1]
    const checkUserExist = lastProject.memberList.some(user => user.userId === userValue)

    if (checkUserExist) {
        showStatusMessage("User is already assigned to this project", false);
    } else {
        showStatusMessage("Added member to project.", true);
        lastProject.memberList.push(memberList);
        saveProjects(projectList);
    }
});

/**
 * For some() funksjon
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
 */

// Add task Popup by changing display
//if no input in the form the next form wont show. Returns true if project is valid
function isValidProjectInput() {

    if (document.getElementById("projectName").value != "" && document.getElementById("startDate").value != "" &&
        document.getElementById("endDate").value != "" && document.getElementById("projectDesc").value != "") {

        document.querySelector(".add-task-form").style.display = "block";

        // Add delegate task Popup by changing display
        document.querySelector(".add-delegate-project__submit").addEventListener('click', () => {
            if (document.getElementById("taskText").value != "" && document.getElementById("priorities").value != ""
                && document.getElementById("taskStartDate").value != "" && document.getElementById("taskEndDate").value != "") {
                return true;
            } else {
                showStatusMessage("Please fill out the blanks..", false);
                return false;
            }
        })
        return true;
    } else {
        showStatusMessage("Please fill out the blanks..", false);
        return false;
    }
}

// returns true if the project name is not in the project list. We do not want duplicate project names.
function isNotDuplicateProjectName(projectName, projectList) {
    const duplicateProjectName = projectList.filter(project => project.projectName == projectName) ?? [];

    if (duplicateProjectName.length != 0) {
        showStatusMessage(`Project with name: ${projectName} already exists.`, false);
        return false;
    } else return true;
}

function isProjectDateValid(projectStartDateAsString, projectEndDateAsString) {
    const projectStartDate = new Date(projectStartDateAsString);
    const projectEndDate = new Date(projectEndDateAsString);

    if (projectStartDate > projectEndDate) {
        showStatusMessage("Project can't end before start date..", false);
        return false;
    } else {
        return true;
    }

}

// returns true if the task start and end date is within the projects dates
function isTaskDateValidForProject(taskStartDateAsString, taskEndDateAsString, project) {
    const taskStartDate = new Date(taskStartDateAsString);
    const taskEndDate = new Date(taskEndDateAsString);
    const projectStartDate = new Date(project.startDate);
    const projectEndDate = new Date(project.endDate);


    if (taskStartDate < projectStartDate) {
        showStatusMessage("Task can't start before project start..", false);
        return false;
    } else if (taskEndDate > projectEndDate) {
        showStatusMessage("Task can't end after project end..", false);
        return false;
    } else if (taskStartDate > taskEndDate) {
        showStatusMessage("Task can't end before start date..", false);
        return false;
    } else {
        return true;
    }
}

function showAddProjectDetails() {
    document.getElementById('add-project-details-container').style = "block";
}

function showStatusMessage(message, isSuccess) {
    const statusBox = document.getElementById('status');
    statusBox.style.display = 'block';

    if (isSuccess) {
        statusBox.style.backgroundColor = '#00ca4e';
    } else {
        statusBox.style.backgroundColor = '#ff605c';
    }

    statusBox.innerHTML = `<p>${message}</p>`;
}


// function that renders prject list to the page. 
function renderProjectList() {

    const projectList = getProjects();
    const projectListEl = document.getElementById("project-container");
    removeAllChildren(projectListEl);

    for (project of projectList) {
        let projectEl = document.createElement("div");
        let { ProjectID, endDate, projectDesc, projectName, startDate } = project;

        //The parts of the project that is shown on the webpage, inside the divs. 
        projectEl.innerHTML = `<a class="project-link" href="projectPage.html#${ProjectID}">
            <p class="project-name-text">Project name <h2 class="project-name-header">${projectName}</h2></p>
            <p class="project-description">Description <p> ${projectDesc}</p></p>
            <p class="project-dates"> Start date: ${startDate}  End date: ${endDate}</p>
            </a>
        `;

        projectListEl.appendChild(projectEl);


        //The divs containing the project information is assinged the class projectBoxes
        projectEl.classList.add(`projectBoxes`);
        projectEl.style.cursor = "pointer"; // TODO: probably better with css.
    }
}


// Fill the members & project dropdown once the page loads
createMembersDropdownList();
// render all the projects
renderProjectList();

//Icon project adder

function addProjectForm() {
    document.getElementById("add-project-form").style = "block";
}