let userList = JSON.parse(window.localStorage.getItem("delegateTaskList"));




//User IdGenerator
function userID() {
    let IdCounter = "";

    let userList = JSON.parse(window.localStorage.getItem("UserList"));

    if (userList === null || userList.length == 0) {
        IdCounter = 4000
    } else {
        IdCounter = 4000 + userList.length
    }

    return IdCounter;

}







function userRegister(event) {
    event.preventDefault();

    const userNa = document.getElementById("userName").value;
    const firstNa = document.getElementById("firstName").value;
    const lastNa = document.getElementById("lastName").value;

    const userRegister = { id: Task.userID(), userName: userNa, firstName: firstNa, lastName: lastNa };

    const userList = JSON.parse(window.localStorage.getItem("UserList")) || [];


    userList.push(userRegister);

    window.localStorage.setItem("UserList", JSON.stringify(userList));

    //using confirm as an extra control, if person
    confirm("New user has been created");

    event.target.reset();



}



class User {

    static IdCounter = 1000;

    constructor(userName, firstName, lastName) {
        this.ID = user.IdCounter;
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;

    }

}


//https://stackoverflow.com/questions/24403732/check-if-array-is-empty-or-does-not-exist-js
