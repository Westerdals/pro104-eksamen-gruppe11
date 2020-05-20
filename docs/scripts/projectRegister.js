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

    popUp();

    event.target.reset();

}




// Popups the rest other register form to ease ux to complete a whole registration of a function.
function popUp() {

    const taskPopup = document.createElement("div");
    taskPopup.innerHTML =
        `

    <br> 
    
    <div>
        <form>
            <h4>Opprett Oppgaver</h4>
            <label for="addTask">Add Task</label>
            <input type="text" placeholder="Add task" required>
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
            <input type="date" name="taskStartDate" required>
            <label for="taskEndtDate">End Date</label>
            <input type="date" name="taskEndtDate" required>
            <br>
            <input type="submit">
        </form>
    </div>
    
    <!-- delegate task to exisiting users -->
    <div>
        <form onsubmit="delegate(event)">
            <h3>Deleger Oppgaver (alternativt) </h3>
            <input list="userList" id="user" name="memberListInput" type="text" placeholder="Velg person..." required>
            <datalist id="userList"></datalist>
            <input list="taskList" id="taskListInput" name="taskListInput" type="text"
                placeholder="Tildel registrert oppgave..." required>
            <datalist id="taskList"></datalist>

            <input type="submit" value="Legg til" />
        </form>

    </div>`;

    document.body.appendChild(taskPopup);

}








