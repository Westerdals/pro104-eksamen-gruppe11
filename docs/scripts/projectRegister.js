


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




// Popups the rest other register form to ease ux to complete a whole registration of a function.
function popUp(event) {

    const taskPopup = document.createElement("div");
    taskPopup.innerHTML = `    
    <form class="add-task-project" onsubmit="addTaskProject(event)">
            <h4>Opprett Oppgaver</h4>
            <label for="addTask">Add Task</label>
            <input type="text" id="taskText" placeholder="Add task" required>
            <label for="priority">Choose priority:</label>
            <input list="priority" name="priorities" id="priorities">
            <datalist id="priority">
                <option value="Low">
                <option value="Medium">
                <option value="High">
            </datalist>
            <br>

            <!-- Adding start and end date for the Project -->
            <label for="taskStartDate">Start Date</label>
            <input type="date" id="taskStartDate" name="taskStartDate" required>
            <label for="taskEndtDate">End Date</label>
            <input type="date" id="taskEndtDate" name="taskEndtDate" required>
            <br>
            <input class="add-task-project__submit" type="submit">
        </form>
    </div>
    <!-- delegate task to exisiting users -->
    <div style="display: none">
        <form class="add-task-project" onsubmit="delegate(event)>
            <h3>Deleger Oppgaver (alternativt) </h3>
            <label for="userList">Choose User</label>
            <select id="userList"></select>
            <label for="taskList">Choose Created Task</label>
            <select id="taskList"></select>
            <input type="submit" value="Legg til" />
        </form>`;

    document.body.appendChild(taskPopup);

    event.preventDefault();
    setTimeout(() => {
        document.querySelector('.add-task-project').addEventListener('submit', e => {
            e.preventDefault();
        })

    }, 1)

    document.querySelector('.add-task-project__submit').addEventListener('click', () => {
        document.querySelector('.add-task-project').style.display = 'block';
    })



}


function userPopup() {


}


//http://getbem.com/naming/

//const {id} = task;



//search in array
//https://www.w3schools.com/jsref/jsref_find.asp

