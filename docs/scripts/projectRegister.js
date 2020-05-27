//User IdGenerator
function ProjectID() {
    let IdCounter = 0;
    const projects = getProjects();

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

        // Re-render the project list and close
        renderProjectList();
        closeCreateProjectForm(event);
    }

}

function closeCreateProjectForm(event) {
    event.target.reset();
    const createProjectFormDiv = document.getElementById('add-project-form');
    createProjectFormDiv.style.display = 'none';
}

// Returns true if all fields has content
function isValidProjectInput() {
    const projectName = document.getElementById("projectName").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const projectDesc = document.getElementById("projectDesc").value

    if (projectName != "" && startDate != "" && endDate != "" && projectDesc != "") {
        return true;
    } else {
        showStatusMessage("Please fill out the blanks..", false);
        return false;
    }
}

// Returns true if the project name is not in the project list. We do not want duplicate project names.
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

// Function that renders project list to the page. 
function renderProjectList() {

    const projectList = getProjects();
    const projectListEl = document.getElementById("project-container");
    removeAllChildren(projectListEl);

    for (project of projectList) {
        const projectEl = document.createElement("div");
        const { ProjectID, endDate, projectDesc, projectName, startDate } = project;

        //The parts of the project that is shown on the webpage, inside the divs. 
        projectEl.innerHTML = `<a class="project-link" href="projectPage.html#${ProjectID}">
            <p class="project-name-text">Project name <h2 class="project-name-header">${projectName}</h2></p>
            <p class="project-description">Description <p> ${projectDesc}</p></p>
            <p class="project-dates"> Start date: ${getFormattedDate(startDate)}  End date: ${getFormattedDate(endDate)}</p>
            </a>
        `;
        
        projectListEl.appendChild(projectEl);

        //The divs containing the project information is assinged the class projectBoxes
        projectEl.classList.add(`projectBoxes`);
        projectEl.style.cursor = "pointer";
    }
}

// render all the projects on page load
renderProjectList();

// Icon project adder
let projectFormOpened = false;
function openCloseProjectForm(element) {
    const icon = document.getElementById('openCloseIcon');
    const projectContainer = document.getElementById("add-project-form");

    if(projectFormOpened) {
        projectContainer.style.display = "none";
        icon.src = "./images/plus.png";
        icon.alt = "Click to open create project dialog";
    } else {
        projectContainer.style.display = "block";
        icon.src = "./images/minus.png";
        icon.alt = "Click close create project dialog";
    }
    projectFormOpened = projectFormOpened ? false : true;
}