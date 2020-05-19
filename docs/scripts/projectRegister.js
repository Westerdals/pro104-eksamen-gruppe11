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


    const projectInfo = { ProjectID: ProjectID(), projectName, startDate, endDate, projectDesc, task: [] };

    const projectList = JSON.parse(window.localStorage.getItem("Projects")) || [];
    projectList.push(projectInfo);


    window.localStorage.setItem("Projects", JSON.stringify(projectList));


    event.target.reset();

}


function taskPopup() {

    const taskPopup = document.createElement("DIV");



}



