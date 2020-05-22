// File with common functions used across the project.

function getMembers() {
    return JSON.parse(window.localStorage.getItem('Members')) ?? [];
}

function saveMembers(members) {
    window.localStorage.setItem('Members', JSON.stringify(projects));
}

function getProjects() {
    return JSON.parse(window.localStorage.getItem('Projects')) ?? [];
}

function saveProjects(projects) {
    window.localStorage.setItem('Projects', JSON.stringify(projects));
}