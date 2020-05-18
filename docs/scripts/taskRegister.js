//project list 



function projectListShow() {
    const projectList = JSON.parse(window.localStorage.getItem("Projects")) ?? [];

    let projectListEl = document.getElementById("createdProject");


    for (const projects of projectList) {
        projectListEl.innerHTML += `<option value = "${projects.projectName}">`


    }


}

projectListShow()
