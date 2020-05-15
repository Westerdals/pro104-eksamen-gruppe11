function createProject(event) {
    event.preventDefault();

    const projectName = document.getElementById("projectName").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const projectDesc = document.getElementById("projectDesc").value;


    const projectInfo = { projectName, startDate, endDate, projectDesc };


    window.localStorage.setItem("Projects", JSON.stringify(projectInfo))


    event.target.reset();

}