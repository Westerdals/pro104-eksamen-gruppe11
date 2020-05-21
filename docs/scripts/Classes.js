
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

