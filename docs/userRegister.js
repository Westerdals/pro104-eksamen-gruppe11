let userList = JSON.parse(window.localStorage.getItem("UserList")) || [];

let userID = (function () {
    var id = 4000; // This is the private persistent value
    // The outer function returns a nested function that has access
    // to the persistent value.  It is this nested function we're storing
    // in the variable uniqueID above.
    return function () { return id++; };  // Return and increment
})(); // Invoke the outer function after defining it.


function userRegister(event) {
    event.preventDefault();

    const userName = document.getElementById("userName").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;




    const userRegister = { userId: userID(), userName, firstName, lastName };

    userList = JSON.parse(window.localStorage.getItem("UserList")) || [];


    userList.push(userRegister);

    window.localStorage.setItem("UserList", JSON.stringify(userList));



    event.target.reset();



}




// function User(user, first, last) {
//     this.userName = user;
//     this.firstName = first;
//     this.lastName = last;

//     return userId() + userName + firstName + LastName
// }

// function UserSetup() {
//     new User(userID(), "Are546", "Arne", "Nilsen");
//     new User(userID(), "Nilse456", "Nils", "Johansen");







// }






//https://stackoverflow.com/questions/24403732/check-if-array-is-empty-or-does-not-exist-js
