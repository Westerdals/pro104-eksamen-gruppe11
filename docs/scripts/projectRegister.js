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

    const projectList = getAllProjectsFromLocalStorage();

    // Don't add the project if form is not valid or the project name is duplicate
    if(isValidProjectInput() && isNotDuplicateProjectName(projectName, projectList)){
        projectList.push(projectInfo);
        window.localStorage.setItem("Projects", JSON.stringify(projectList));

        // Display the new member list and project list to the user.
        createProjectDropdownList();
        createMembersDropdownList();
    }
}


// This function is a part of projectregister popup. Add task to the new created project.

function addTaskProject(event) {

    event.preventDefault();

    const taskText = document.getElementById("taskText").value;
    const priorities = document.getElementById("priorities").value;
    const taskStartDate = document.getElementById("taskStartDate").value;
    const taskEndtDate = document.getElementById("taskEndtDate").value;
    const task = { taskText, priorities, taskStartDate, taskEndtDate }

    const projects = getAllProjectsFromLocalStorage();

    const lastProject = projects[projects.length - 1];

    lastProject.tasks.push(task);

    window.localStorage.setItem("Projects", JSON.stringify(projects));

    // console.log(lastProject.task.push)
    event.target.reset();
}

function getAllMembersFromLocalStorage() {
    return JSON.parse(window.localStorage.getItem('UserList')) ?? [];
}

function getAllProjectsFromLocalStorage() {
    // [] in project here is for situation where local storage is emtpy
    return JSON.parse(window.localStorage.getItem("Projects")) ?? [];
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
    const userList = getAllMembersFromLocalStorage();

    // Make the dropdown empty before creating the new elements.
    if(members.length != 0) {
        while (members.lastElementChild) {
            members.removeChild(members.lastElementChild);
          }
    }
    for (const list of userList) {
        const { id, firstName, lastName } = list;
        createOption(members, id, firstName + ' ' + lastName);
    }
}

// create the dropdown menu for selecting project
function createProjectDropdownList() {
    const projects = document.querySelector('#add-members-form__project');
    const projectList = getAllProjectsFromLocalStorage();
    
    // Make the dropdown empty before creating the new elements.
    if(projects.length != 0) {
        while (projects.lastElementChild) {
            projects.removeChild(projects.lastElementChild);
          }
    }

    for (const list of projectList) {
        const { ProjectID, projectName } = list;
        createOption(projects, ProjectID, projectName);
    }
}

// Event Listener for delegating members to a project
document.querySelector('.add-members-form__submit').addEventListener('click', (e) => {
    e.preventDefault();
    const members = document.querySelector('#add-members-form__assigned-members');
    const projects = document.querySelector('#add-members-form__project');
    const userValue = members.value;
    const projectValue = projects.value;
    const memberList = { userId: userValue, projectId: projectValue };
    const projectList = getAllProjectsFromLocalStorage();
    const checkUserExist = projectList[0].memberList.some(user => user.userId === userValue)

    if (checkUserExist) {
        throw 'User Already Exist!';
    } else {
        console.log('Added User to the memberList');
        projectList[0].memberList.push(memberList);
        window.localStorage.setItem('Projects', JSON.stringify(projectList));
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
                && document.getElementById("taskStartDate").value != "" && document.getElementById("taskEndtDate").value != "") {
                document.querySelector(".delegate-form").style.display = "block";
            } else {
                alert("please fill the blank");
                return false;
            }
        })
        return true;
    } else {
        alert("please fill the blank");
        return false;
    }
}

// returns true if the project name is not in the project list. We do not want duplicate project names.
function isNotDuplicateProjectName(projectName, projectList) {
    const duplicateProjectName = projectList.filter(project => project.projectName == projectName) ?? [];
    if(duplicateProjectName.length != 0) {
        console.error(`Project with name: ${projectName} already exists.`);
        // TODO: Disply the text to the user?
        return false;
    } else return true;
}

// Fill the members & project dropdown once the page loads
createMembersDropdownList();
createProjectDropdownList();

//https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
//http://getbem.com/naming/

//const {id} = task;



//search in array
//https://www.w3schools.com/jsref/jsref_find.asp