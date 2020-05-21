//project list 



function projectListShow() {
    const projectList = JSON.parse(window.localStorage.getItem("Projects")) ?? [];

    const projectListEl = document.getElementById("createdProject");

    for (const projects of projectList) {
        projectListEl.innerHTML += `<option value = "${'ProjectID: ' + projects.ProjectID + ' name: ' + projects.projectName}">`
    }
}




//Attach task to project

function attachTaskToProj(addTask) {

    const chosenProject = document.getElementById("createdProject").value;
    const crap = chosenProject.value;

    const projectList = JSON.parse(window.localStorage.getItem("Projects"));

    for (let i = 0; i = projectList.length; i++) {

        if (projectList[i].includes(crap)) {
            const taskIndex = projectList[i].indexOf(task)
            taskIndex.push(addTask);
        }

    }


}


function createTask(event) {
    event.preventDefault();

    const taskText = document.getElementById("taskText").value;
    const priorities = document.getElementById("priorities").value;
    const taskStartDate = document.getElementById("taskStartDate").value;
    const taskEndtDate = document.getElementById("taskEndtDate").value;

    const addTask = { taskText, priorities, taskStartDate, taskEndtDate }
    attachTaskToProj(addTask)

    //  attachTaskToProj(regTask)

    window.localStorage.setItem("TaskList", JSON.stringify(Task.taskArray));



    event.target.reset();
}





projectListShow()