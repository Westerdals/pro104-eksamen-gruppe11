showTaskList()
projectListShow()


//Show the created project in the datalist
function projectListShow() {
    const projectList = JSON.parse(window.localStorage.getItem("Projects")) ?? [];

    const projectListEl = document.getElementById("createdProject");

    for (const projects of projectList) {
        projectListEl.innerHTML += `<option value = ${projects.ProjectID}>${projects.projectName}</option>"`;
    }
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


//Creates new task
function createTask(event) {
    event.preventDefault();

    const taskText = document.getElementById("taskText").value;
    const priorities = document.getElementById("priorities").value;
    const taskStartDate = document.getElementById("taskStartDate").value;
    const taskEndtDate = document.getElementById("taskEndtDate").value;

    const task = { taskText, priorities, taskStartDate, taskEndtDate }

    attachTaskToProj(task);

    event.target.reset();
}


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

//Pushes created task to list
function showTaskList() {
    const projectTaskList = JSON.parse(window.localStorage.getItem("Projects")) || [];

    const taskListEl = document.getElementById("taskList");
    taskListEl.innerHTML = "";

    for (const project of projectTaskList) {
        for (const task of project) {

            taskListEl.innerHTML += `<option value = ${task.taskText}>${task.taskText}</option>"`;
        }
    }
}


