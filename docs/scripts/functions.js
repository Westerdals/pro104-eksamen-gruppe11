// File with common functions used across the project.

function getAllMembersFromLocalStorage() {
    return JSON.parse(window.localStorage.getItem('UserList')) ?? [];
}

function saveMembers(members) {

}

function getAllProjectsFromLocalStorage() {
    // [] in project here is for situation where local storage is emtpy
    return JSON.parse(window.localStorage.getItem("Projects")) ?? [];
}

function saveProjects(projects) {
    window.localStorage.setItem("Projects", JSON.stringify(projects));
}
