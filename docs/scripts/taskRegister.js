//Show the created project in the datalist

const projectList = JSON.parse(window.localStorage.getItem('Projects')) ?? [];

let projectListEl = '';
projectListEl = document.getElementById('createdProject');

for (const projects of projectList) {
    projectListEl.innerHTML += `<option value = ${projects.ProjectID}>${projects.projectName}</option>"`;
}

//User IdGenerator
function taskGen() {
    taskId();

    let counter = JSON.parse(window.localStorage.getItem('taskCounter'));

    IdCounter = 1999 + counter.length;

    return IdCounter;
}

//fake localstorage to a store id numbers
function taskId() {
    const counter = JSON.parse(window.localStorage.getItem('taskCounter')) || [];
    counter.push('0');
    window.localStorage.setItem('taskCounter', JSON.stringify(counter));
}

// Creates new task
function createTask(event) {
    event.preventDefault();
    const taskText = document.getElementById('taskText').value;
    const priorities = document.getElementById('priorities').value;
    const taskStartDate = document.getElementById('taskStartDate').value;
    const taskEndtDate = document.getElementById('taskEndtDate').value;

    const task = {
        id: taskGen(),
        taskText,
        priorities,
        taskStartDate,
        taskEndtDate,
        delegate: [],
        memberList: []
    };

    attachTaskToProj(task);

    event.target.reset();
}

//Attach new task to project
function attachTaskToProj(task) {
    const createdProject = document.getElementById('createdProject').value;

    const projectList = JSON.parse(window.localStorage.getItem('Projects'));

    //for each loop
    projectList.forEach((el) => {
        if (el.ProjectID == createdProject) {
            el.tasks.push(task);
        }
    });

    window.localStorage.setItem('Projects', JSON.stringify(projectList));
}


//removes taskList after chosen
function removeOptions(selectElement) {
    var i,
        L = selectElement.options.length - 1;
    for (i = L; i >= 0; i--) {
        selectElement.remove(i);
    }
}

const createOption = (parentEl, id, value) => {
    // Create Option Element
    let option = document.createElement('option');
    option.setAttribute('value', id);
    option.innerHTML = value;
    parentEl.appendChild(option);
};

//task popup version

//shows creating task
document
    .querySelector('.create-task-form-submit__submit')
    .addEventListener('click', () => {
        document.querySelector('.delegate-form-submit').style.display = 'block';
    });

document.querySelector('.create-task-form-submit').style.display = 'none';
document.querySelector('.delegate-form-submit').style.display = 'none';
const taskList = document.querySelector('#taskList');

document.querySelector('#createdProject').addEventListener('change', (e) => {
    removeOptions(taskList);

    const projectList = JSON.parse(window.localStorage.getItem('Projects')) ?? [];

    for (const projects of projectList) {
        if (e.target.value == projects.ProjectID) {
            document.querySelector(
                '.create-task-form-submit__h4',
            ).innerHTML = `Opprett Oppgave ${projects.ProjectID}`;
            document.querySelector('.create-task-form-submit').style.display =
                'block';

            for (const task of projects.tasks) {
                let { id, taskText } = task;
                createOption(taskList, id, taskText);
            }

            document
                .querySelector('.delegate-form-submit__legg--til')
                .addEventListener('click', (e) => {
                    e.preventDefault();
                    const userList = document.querySelector('#userList').value;
                    const taskList = document.querySelector('#taskList').value;
                });
        }
    }
});
