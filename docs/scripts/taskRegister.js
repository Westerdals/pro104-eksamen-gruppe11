// LocalStorage Items
const projectList = JSON.parse(window.localStorage.getItem('Projects')) ?? [];
const userList = JSON.parse(window.localStorage.getItem('UserList')) ?? [];


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
document.querySelector('.create-task-form-submit__submit').addEventListener('click', () => {
    document.querySelector('.add-members-form').style.display = 'block';
});

const taskList = document.querySelector('#taskList');
const userOption = document.querySelector('#add-members-form__assigned-members');
const delegateMembers = document.querySelector('#add-members-form__assigned-members');
const selectUserElement = document.querySelector('#userList');

// Event Listener to check if DOM is on Change
document.querySelector('#createdProject').addEventListener('change', (e) => {
    // Default is the element displayed none, but changing when
    document.querySelector('.create-task-form-submit').style.display = 'block';
    document.querySelector('.delegate-form-submit').style.display = 'block';
    document.querySelector('.add-members-form').style.display = 'block';

    // Target value for the project
    const projectTaskVal = e.target.value;

    // Remove the Option DOM after changing the DOM from the Project add to task
    removeOptions(selectUserElement);
    removeOptions(taskList);

    // Looping through the userList Storage
    for (const list of userList) {
        // Destructuring the objects 
        const { id, firstName, lastName } = list;
        createOption(selectUserElement, id, firstName + " " + lastName);
    }

    // Looping through the ProjectList Storage
    for (const list of projectList) {
        if (projectTaskVal == list.ProjectID) {
            for (const task of list.tasks) {
                const { id, taskText } = task;
                createOption(taskList, id, taskText);
            }
        }
    }

    // Click Event to save delegate the user is going to assign the task
    document.querySelector('.delegate-form-submit__legg--til').addEventListener('click', (e) => {
        e.preventDefault();

        // Getting the values from the option
        const userId = selectUserElement.value;
        const taskId = taskList.value;
        const memberList = { userId: userId, taskId: taskId };

        for (const list of projectList) {
            if (projectTaskVal == list.ProjectID) {
                const checkTaskExisted = list.delegate.some(user => user.taskId === taskId && user.userId === userId);

                if (checkTaskExisted) {
                    throw 'Task already exist on this user!';
                } else {
                    console.log('Added task to the user');
                    projectList[0].memberList.push(memberList);
                    window.localStorage.setItem('Projects', JSON.stringify(projectList));
                }
            }
        }
    })
});



const members = document.querySelector('#add-members-form__assigned-members');
const projects = document.querySelector('#add-members-form__project');

for (const list of projectList) {
    const { ProjectID, projectName } = list;
    createOption(projects, ProjectID, projectName);
}
for (const list of userList) {
    const { id, firstName, lastName } = list;
    createOption(members, id, firstName + ' ' + lastName);
}

// Event Listener for delegating members to a project
document.querySelector('.add-members-form__submit').addEventListener('click', (e) => {
    e.preventDefault();
    const userValue = members.value;
    const projectValue = projects.value;
    const memberList = { userId: userValue, projectId: projectValue };

    for (const list of projectList) {
        if (projectValue == list.ProjectID) {
            // some() function will loop through the array and will return value if is either true or false
            const checkUserExist = list.memberList.some(user => user.userId === userValue);
            if (checkUserExist) {
                throw 'User Already Exist!';
            } else {
                console.log('Added User to the memberList');
                list.memberList.push(memberList);
                window.localStorage.setItem('Projects', JSON.stringify(projectList));
            }
        }
    }
});


//setatributes
//https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_element_setattribute1