
//User IdGenerator
function userID() {
    let IdCounter = "";
    let userList = JSON.parse(window.localStorage.getItem("Members"));

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

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;

    const userRegister = { id: userID(), firstName, lastName };

    const userList = JSON.parse(window.localStorage.getItem("Members")) || [];
    userList.push(userRegister);

    getItems()
    window.localStorage.setItem("Members", JSON.stringify(userList));
    RegisteredMembersDropdownList();

    window.alert(firstName + " " + lastName + " is added to user list!")
    event.target.reset();
}

const registeredMembersOpenBtn = document.getElementById("openBtn");
const registeredMembersCloseBtn = document.getElementById("closeBtn")
const registeredMembers = document.getElementById("registeredMembersDropdown");

registeredMembersOpenBtn.onclick = function () {
    registeredMembers.style.visibility = "visible";
    registeredMembersCloseBtn.style.visibility = "visible";

}

registeredMembersCloseBtn.onclick = function () {
    registeredMembers.style.visibility = "hidden";
    registeredMembersCloseBtn.style.visibility = "hidden";
}

// Function to get desired items from localStorage.
function getItems() {
    return JSON.parse(window.localStorage.getItem('Members')) ?? [];
}

// function to create option for the select element.

const createElOption = (parentElement, id, name) => {
    const option = document.createElement('option');
    option.setAttribute('value', id);
    option.textContent = name;
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