
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
//function showUserList() {
    //const userList = JSON.parse(window.localStorage.getItem("UserList")) || [];

    //const userListEl = document.getElementsByClassName("userList");
      //userListEl.innerHTML = "";


    //for (let users of userList) {
        //userListEl.innerHTML += `<option value = ${users.id}>${users.firstName}</option>"`;
   // }
//}

//showUserList()

//https://stackoverflow.com/questions/24403732/check-if-array-is-empty-or-does-not-exist-js
const registeredMembersOpenBtn = document.getElementById("testBtn");
const registeredMembersCloseBtn = document.getElementById("testBtn2")
const registeredMembers = document.getElementById("registeredMembersDropdown");

registeredMembersOpenBtn.onclick = function(){
    registeredMembers.style.visibility = "visible";
    registeredMembersCloseBtn.style.visibility = "visible";

}

registeredMembersCloseBtn.onclick = function(){
    registeredMembers.style.visibility = "hidden";
    registeredMembersCloseBtn.style.visibility = "hidden";
}

// Function to get desired items from localStorage.
function getItems() {
    return JSON.parse(window.localStorage.getItem('UserList')) ?? []; 
}

// function to create option for the select element.
const createElOption = (parentElement, id, value) => {
    const option = document.createElement('option');
    option.setAttribute('value', id);
    option.textContent = value;
    parentElement.appendChild(option);
}

// create the dropdown menu for selecting member
function RegisteredMembersDropdownList() {
    const registeredMembers = document.querySelector('#registeredMembersDropdown');
    const userList = getItems();


    // Emptying the dropdown menu, then creating the new elements.
    if (registeredMembers.length != 0) {
        while (registeredMembers.lastElementChild) {
            registeredMembers.removeChild(registeredMembers.lastElementChild);
        }
    }
    
    for (const list of userList) {
        const { id, firstName, lastName } = list;
        createElOption(registeredMembers, id, firstName + ' ' + lastName);
    }
}

    // Finally prints the content to the drop-down menu.
    RegisteredMembersDropdownList();

    