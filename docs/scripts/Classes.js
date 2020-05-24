class Project {

    saveProjects = window.localStorage.setItem('Projects', JSON.stringify(getProjects));

    getProjects = JSON.parse(window.localStorage.getItem('Projects')) ?? [];


    constructor(projectID, projectName, startDate, endDate, projectDesc, tasks, delegate, memberList) {
        projectID = Project.projectCount();
        projectName = this.projectName;
        startDate = this.startDate;
        endDate = this.endDate;
        projectDesc = this.projectDesc;
        tasks = [];
        delegate = [];
        memberList = [];

        Project.getProjects.push(this);


    }


    projectCount() {
        let IdCounter = "";

        let projects = this.getProjects;

        if (projects === null || projects.length == 0) {
            IdCounter = 2000
        } else {
            IdCounter = 2000 + projects.length
        }

        return IdCounter;

    }



    static dummyProjects = () => {

        new Project(Project.projectCount(), "Web Prosjekt", "2020-05-01", "2020-05-24");


    }



}



Project.dummyProjects();





class Task {




    constructor(taskText, priority, startDate, endDate) {
        this.taskId = this.idNumber();
        this.taskText = taskText;
        this.priority = priority;
        this.startDate = startDate;
        this.endDate = endDate;
        Task.taskArray.push(this);


    }

    idNumber() {
        let IdCounter = "";

        if (Task.taskArray.length == null) {
            IdCounter = 4000;
        } else {

            IdCounter = 4000 + Task.taskArray.length
        }

        return IdCounter;

    }

}

