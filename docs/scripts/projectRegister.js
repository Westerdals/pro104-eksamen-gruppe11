


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


    const projectInfo = { ProjectID: ProjectID(), projectName, startDate, endDate, projectDesc, tasks: [] };

    const projectList = JSON.parse(window.localStorage.getItem("Projects")) || [];
    projectList.push(projectInfo);
    window.localStorage.setItem("Projects", JSON.stringify(projectList));

    popUp(event);
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





// function 

// document.querySelector('.add-task-project__submit').addEventListener('click', () => {
//     document.querySelector('.delegate-form').style.display = 'block';
// })




//http://getbem.com/naming/

//const {id} = task;



//search in array
//https://www.w3schools.com/jsref/jsref_find.asp

