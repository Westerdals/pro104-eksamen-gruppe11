// File with common functions used across the project.

function getMembers() {
    return JSON.parse(window.localStorage.getItem('Members')) ?? [];
}

function getMemberById(memberId){
    const allMembers = getMembers();
    const foundMember = allMembers.find(member => member.id === memberId);
    return foundMember ?? null;
}

function saveMembers(members) {
    window.localStorage.setItem('Members', JSON.stringify(projects));
}

function delegateMemberToTask(projectId, task, memberId) {
    const allProjects = getProjects();

    allProjects
        .find(project => project.ProjectID === projectId)
        .tasks
        .find(t => t.id == task.id)
        .delegate
        .push({ userId: memberId });
    
    saveProjects(allProjects);
}

function removeMemberFromTask(projectId, task, memberId) {
    const allProjects = getProjects();

    const filtered = allProjects
        .find(project => project.ProjectID === projectId)
        .tasks
        .find(t => t.id == task.id)
        .delegate 
        .filter(d => d.userId != memberId)
    
    allProjects
        .find(project => project.ProjectID === projectId)
        .tasks
        .find(t => t.id == task.id)
        .delegate = filtered;

    saveProjects(allProjects);
}

function getProjects() {
    return JSON.parse(window.localStorage.getItem('Projects')) ?? [];
}

function saveProjects(projects) {
    window.localStorage.setItem('Projects', JSON.stringify(projects));
}

function getTasksForProject(projectId) {
    const allProjects = getProjects();
    const selectedProject = allProjects.find(project => project.ProjectID === projectId);
    return selectedProject.tasks ?? [];
}

function saveTaskStatus(projectId, taskId, status) {
    let allProjects = getProjects();

    allProjects
        .find(project => project.ProjectID === projectId)
        .tasks
        .find(task => task.id == taskId)
        .status = status;

    saveProjects(allProjects);
}

function removeAllChildren(parent) {
    if (parent.length != 0) {
        while (parent.lastElementChild) {
            parent.removeChild(parent.lastElementChild);
        }
    }
}

function generateUuid() {
    // Whenever we need something random.
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}