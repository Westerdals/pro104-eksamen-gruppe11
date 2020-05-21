


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

    const projectList = JSON.parse(window.localStorage.getItem("Projects")) || [];
    projectList.push(projectInfo);
    window.localStorage.setItem("Projects", JSON.stringify(projectList));

}


// This function is a part of projectregister popup. Add task to the new created project.

function addTaskProject(event) {

    event.preventDefault();

    const taskText = document.getElementById("taskText").value;
    const priorities = document.getElementById("priorities").value;
    const taskStartDate = document.getElementById("taskStartDate").value;
    const taskEndtDate = document.getElementById("taskEndtDate").value;
    const task = { taskText, priorities, taskStartDate, taskEndtDate }

    // [] in project here is for situation where local storage is emtpy
    const projects = JSON.parse(window.localStorage.getItem("Projects")) || [];

    const lastProject = projects[projects.length - 1];

    lastProject.tasks.push(task);

    window.localStorage.setItem("Projects", JSON.stringify(projects));

    // console.log(lastProject.task.push)
    event.target.reset();
}

// Adding members to prject
const members = document.querySelector('#add-members-form__assigned-members');
const projects = document.querySelector('#add-members-form__project');
const projectList = JSON.parse(window.localStorage.getItem('Projects')) ?? [];
const userList = JSON.parse(window.localStorage.getItem('UserList')) ?? [];

// function to create option for the select element
const createOption = (parentElement, id, value) => {
    const option = document.createElement('option');
    option.setAttribute('value', id);
    option.textContent = value;
    parentElement.appendChild(option);
}

for (const list of projectList) {
    const { ProjectID, projectName } = list;
    createOption(projects, ProjectID, projectName);
}
for (const list of userList) {
    const { id, firstName, lastName } = list;
    createOption(members, id, firstName + ' ' + lastName);
}

// Reloader the webpage after assigning a project name
document.querySelector('#projectRegBtn').addEventListener('click', (e) => {
    for (const list of projectList) {
        const projectName = list.projectName;
        const projectNameInput = document.querySelector('#projectName').value;

        // Checking if projectName of the object is equal with the user inputing the text field
        if (projectName == projectNameInput) {
            throw "Project name already Exist";

        } else {
            location.reload();
        }
    }
})

// Event Listener for delegating members to a project
document.querySelector('.add-members-form__submit').addEventListener('click', (e) => {
    e.preventDefault();
    const userValue = members.value;
    const projectValue = projects.value;
    const memberList = { userId: userValue, projectId: projectValue };
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
//if no input in the form the next form wont show
document.querySelector(".add-task-project__submit").addEventListener('click', () => {

    if (document.getElementById("projectName").value != "" && document.getElementById("startDate").value != "" &&
        document.getElementById("endDate").value != "" && document.getElementById("projectDesc").value != "") {

        document.querySelector(".add-task-form").style.display = "block";

        // Add delegate task Popup by changing display
        document.querySelector(".add-delegate-project__submit").addEventListener('click', () => {
            if (document.getElementById("taskText").value != "" && document.getElementById("priorities").value != ""
                && document.getElementById("taskStartDate").value != "" && document.getElementById("taskEndtDate").value != "") {

                document.querySelector(".delegate-form").style.display = "block";
            } else alert("please fill the blank");
        })

    } else {

        alert("please fill the blank");

    }
})












//https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
//http://getbem.com/naming/

//const {id} = task;



//search in array
//https://www.w3schools.com/jsref/jsref_find.asp

