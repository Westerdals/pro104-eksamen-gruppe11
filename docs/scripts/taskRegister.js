

//Show the created project in the datalist
function projectListShow() {
    const projectList = JSON.parse(window.localStorage.getItem("Projects")) ?? [];

    const projectListEl = document.getElementById("createdProject");

    for (const projects of projectList) {
        projectListEl.innerHTML += `<option value = ${projects.ProjectID}>${projects.projectName}</option>"`;
    }
}

//Creates new task
function createTask(event) {
    event.preventDefault();

    const taskText = document.getElementById("taskText").value;
    const priorities = document.getElementById("priorities").value;
    const taskStartDate = document.getElementById("taskStartDate").value;
    const taskEndtDate = document.getElementById("taskEndtDate").value;

    const task = { ID: new ID(), taskText, priorities, taskStartDate, taskEndtDate }

    attachTaskToProj(task);

    event.target.reset();
}


//Attach new task to project
function attachTaskToProj(task) {

    const createdProject = document.getElementById("createdProject").value;

    const projectList = JSON.parse(window.localStorage.getItem("Projects"));

    //for each loop
    projectList.forEach((el) => {
        console.log(el.ProjectID);
        if (el.ProjectID == createdProject) {
            el.task.push(task)
        }
    })

    console.log(projectList);

    window.localStorage.setItem("Projects", JSON.stringify(projectList));
}


let idCounter = 2000;

//User IdGenerator
function taskID() {

    return idCounter++;
}

//Pushes created task to list
// function showTaskList() {
//     const projectTaskList = JSON.parse(window.localStorage.getItem("Projects")) || [];

//     const taskListEl = document.getElementById("taskList");
//     taskListEl.innerHTML = "";

//     for (const project of projectTaskList) {
//         for (const task of project) {

//             taskListEl.innerHTML += `<option value = ${task.taskText}>${task.taskText}</option>"`;
//         }
//     }
// }


//showTaskList()
projectListShow()


class ID {

    static idCounter = 0;

    constructor() {
        this.ID = ID.idCounter++;
    }



}


