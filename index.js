let myForm = document.getElementById("my-form");

const retrieveData = () => {
    let data = localStorage.getItem("user-details");
    if (data) {
        data = JSON.parse(data);
    } else {
        data = [];
    }
    return data;
}

let userData = retrieveData();
 

function saveUserData(userData) {
    // Retrieve existing user data or initialize an empty array
    const existingUserData = JSON.parse(localStorage.getItem('userList')) || [];
    existingUserData.push(userData);

    // Save the updated user data list to localStorage
    localStorage.setItem('userList', JSON.stringify(existingUserData));
}

const displayData = () => {
    const data = retrieveData();
    let tableEntries = '';
    for (const entry of data) {
        const nameCell = `<td>${entry.name}</td>`;
        const emailCell = `<td>${entry.email}</td>`;
        const passwordCell = `<td>${entry.password}</td>`;
        const dobCell = `<td>${entry.dob}</td>`;
        const acceptTermsCell = `<td>${entry.accept terms ? 'true' : 'false'}</td>`;

        const row = `<tr>${nameCell}${emailCell}${passwordCell}${dobCell}${acceptTermsCell}</tr>`;
        tableEntries += row;
    }
    const table = `<table><thead><tr><th>Name</th><th>Email</th><th>Password</th><th>Dob</th><th>Accepted Terms?</th></tr></thead><tbody>${tableEntries}</tbody></table>`;
    let details = document.getElementById("user-details");
    details.innerHTML = table;
}

const saveForm = (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const accept terms = document.getElementById("accept terms").checked;

    const entry = {
        name,
        email,
        password,
        dob,
        accept terms,
    };

    // Remove duplicate entries with the same email
    userData = userData.filter((existingEntry) => existingEntry.userEmail !== userEmail);

    userData.push(entry);
    localStorage.setItem("user-details", JSON.stringify(userData));
    displayData();
}

myForm.addEventListener("submit", saveForm);
displayData();
