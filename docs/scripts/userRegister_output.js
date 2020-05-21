
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



//Pushes created users to list
function showUserList() {
    const userList = JSON.parse(window.localStorage.getItem("UserList")) || [];

    const userListEl = document.getElementById("userOutput");
    userListEl.innerHTML = "";


    for (const users of userList) {
        userListEl.innerHTML += `<option value = ${userList.id}>${firstName}</option>"`;
        
        const userEl = document.createElement("div");

        userListEl.appendChild(userEl);
    }
}



//https://stackoverflow.com/questions/24403732/check-if-array-is-empty-or-does-not-exist-js


//const inpUserNameEl = document.getElementById("userName");
//const inpFirstNameEl = document.getElementById("firstName");
//const inpLastNameEl = document.getElementById("lastName");

//const btnInsert = document.getElementById("sendButton");
//const userOutput = document.getElementById("userOutput");


//btnInsert.onclick = function(){
//    const outputUserName = inpUserNameEl.value;
//    const outputFirstName = inpFirstNameEl.value;
//    const outputLastName = inpLastNameEl.value;

    //console.log(outputUserName);
    //console.log(outputFirstName);
    //console.log(outputLastName);

//    for (let i = 0; i < localStorage.length; i++){
//        const userList = localStorage.key(i);
//        const inpUserName = localStorage.getItem(userName);
//        const inpFirstName = localStorage.getItem(firstName);
//        const inpLastName = localStorage.getItem("lastName");
    
    
//       userOutput.innerHTML += `
//      Username: ${inpUserName} <br>
//       Name: ${inpFirstName}
//       ${inpLastName}<br>
//       <br>
//       <br>
//       `;
//    }

//}







//showUserList.innerHTML += `${userName}: ${firstName}, ${lastName}`;

//if (key && value){
    //localStorage.setItem(key, value);
    //location.reload();
//}