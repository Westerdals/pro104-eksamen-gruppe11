//project list 



function projectListShow() {
    const projectList = JSON.parse(window.localStorage.getItem("Projects")) ?? [];

    const projectListEl = document.getElementById("createdProject");

    for (const projects of projectList) {
        projectListEl.innerHTML += `<option value = ${projects.ProjectID}>${projects.projectName}</option>"`//$ {'ProjectID: ' + projects.ProjectID + 
        //' name: ' + projects.projectName}" id = '${projects.ProjectID}'>`
    }
}




//Attach task to project

function attachTaskToProj(task) {

    const createdProject = document.getElementById("createdProject").value;
    console.log(createdProject);


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


function createTask(event) {
    event.preventDefault();

    const taskText = document.getElementById("taskText").value;
    const priorities = document.getElementById("priorities").value;
    const taskStartDate = document.getElementById("taskStartDate").value;
    const taskEndtDate = document.getElementById("taskEndtDate").value;

    const task = { taskText, priorities, taskStartDate, taskEndtDate }

    attachTaskToProj(task);



    //event.target.reset();
}





projectListShow()



