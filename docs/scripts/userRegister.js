
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



//Creates new user
function userRegister(event) {
    event.preventDefault();

    const userName = document.getElementById("userName").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;

    const userRegister = { id: userID(), userName, firstName, lastName };

    const userList = JSON.parse(window.localStorage.getItem("UserList")) || [];
    userList.push(userRegister);

    window.localStorage.setItem("UserList", JSON.stringify(userList));


    event.target.reset();



}



// //Pushes created users to list
function showUserList() {
    const userList = JSON.parse(window.localStorage.getItem("UserList")) || [];

    const userListEl = document.getElementById("userList");
    userList.innerHTML = "";


    for (const users of userList) {
        userListEl.innerHTML += `<option value = ${users.id}>${users.firstName}</option>"`;
    }
}

showUserList()





//https://stackoverflow.com/questions/24403732/check-if-array-is-empty-or-does-not-exist-js
