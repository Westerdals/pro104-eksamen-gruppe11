const createOption = (parentEl, id, value) => {
    // Create Option Element
    let option = document.createElement('option');
    option.setAttribute('value', id);
    option.innerHTML = value;
    parentEl.appendChild(option);
};
// Render the page:
// LocalStorage Items
const projectList = getProjects();
const projectListEl = document.getElementById('createdProject');

for (let project of projectList) {
    createOption(projectListEl, project.ProjectID, project.projectName);
}

function getSelectedProject() {
    return document.getElementById('createdProject').value;
}

function refreshMembersDropdown() {
    const membersOption = document.querySelector('#add-members-form__assigned-members');
    const membersOption2 = document.querySelector('#userList');
    const memberList = getMembers();

    // Looping through the userList Storage
    for (let member of memberList) {
        // Destructuring the objects 
        const { id, firstName, lastName } = member;
        createOption(membersOption, id, firstName + " " + lastName);
        createOption(membersOption2, id, firstName + " " + lastName);
    }
}

function refreshTaskDropdown() {
    const selectedProject = getSelectedProject();
    const taskList = document.querySelector('#taskList');
    const projectList = getProjects();

    if (taskList.length != 0) {
        while (taskList.lastElementChild) {
            taskList.removeChild(taskList.lastElementChild);
        }
    }

    for (let project of projectList) {
        if (selectedProject == project.ProjectID) {
            for (let task of project.tasks) {
                const { id, taskText } = task;
                createOption(taskList, id, taskText);
            }
        }
    }
}

function refreshProjectTitle() {
    const projectName = getProjects().find(project => project.ProjectID == getSelectedProject()).projectName;
    document.getElementById('add-members-form__project').innerHTML = projectName;
}

// Creates new task
function createTask(event) {
    event.preventDefault();
    const taskText = document.getElementById('taskText').value;
    const priorities = document.getElementById('priorities').value;
    const taskStartDate = document.getElementById('taskStartDate').value;
    const taskEndtDate = document.getElementById('taskEndtDate').value;

    const task = {
        id: generateUuid(),
        taskText,
        priorities,
        taskStartDate,
        taskEndtDate,
        delegate: []
    };

    const selectedProject = getSelectedProject();
    const projectList = getProjects();
    projectList.forEach((el) => {
        if (el.ProjectID == selectedProject) {
            el.tasks.push(task);
        }
    });

    event.target.reset();

    saveProjects(projectList);
    refreshTaskDropdown();
}

// Event Listener to check if DOM is on Change
document.querySelector('#createdProject').addEventListener('change', (e) => {
    showTaskRegisterDetails();
    refreshTaskDropdown();
    refreshMembersDropdown();
    refreshProjectTitle();

    const selectUserElement = document.querySelector('#userList');
    const selectedProject = getSelectedProject();
    // Click Event to save delegate the user is going to assign the task
    document.querySelector('.delegate-form-submit__legg--til').addEventListener('click', (e) => {
        e.preventDefault();

        // Getting the values from the option
        const userId = selectUserElement.value;
        const taskId = taskList.value;

        //TODO, få navn og alt fra arrayet
        const selectedMember = { userId: userId };

        const projectList = getProjects();
        for (let i = 0; i < projectList.length; i++) {
            if (selectedProject == projectList[i].ProjectID) {
                const thisTask = projectList[i].tasks.find(task => task.id == taskId);
                console.log(thisTask);
                const checkTaskExisted = thisTask.delegate.some(user => user.taskId == taskId && user.userId == userId);

                if (checkTaskExisted) {
                    throw 'Task already exist on this user!';
                } else {
                    console.log('Added task to the user');
                    projectList[i].tasks.find(task => task === thisTask).delegate.push(selectedMember);
                    saveProjects(projectList);
                }
            }
        }
    })
});

// Event Listener for delegating members to a project
document.querySelector('.add-members-form__submit').addEventListener('click', (e) => {
    e.preventDefault();
    const userValue = document.querySelector('#add-members-form__assigned-members').value;
    const projectValue = getSelectedProject();
    const memberList = { userId: userValue, projectId: projectValue };

    for (let project of projectList) {
        if (projectValue == project.ProjectID) {
            // some() function will loop through the array and will return value if is either true or false
            const checkUserExist = project.memberList.some(user => user.userId === userValue);
            if (checkUserExist) {
                throw 'User Already Exist!';
            } else {
                console.log('Added User to the memberList');
                project.memberList.push(memberList);
                saveProjects(projectList);
            }
        }
    }
});


function showTaskRegisterDetails() {
    // Default is the element displayed none, but changing when
    document.querySelector('.create-task-form-submit').style.display = 'block';
    document.querySelector('.delegate-form-submit').style.display = 'block';
    document.querySelector('.add-members-form').style.display = 'block';
}

//setatributes
//https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_element_setattribute1