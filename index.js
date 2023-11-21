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
 if (!validateUserData(userData)) {
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Value must be 09/11/1967 or later';
        errorMessage.classList.add('error-message');
        const dateField = document.getElementById('dob');
        dateField.parentNode.appendChild(errorMessage);
    } else {
        saveUserData(userData);
        updateUserDataTable();
        clearForm();
    }
});

function validateUserData(userData) {
    const minAge = 18;
    const maxAge = 55;

    const today = new Date();
    const birthDate = new Date(userData.dob);
    const age = today.getFullYear() - birthDate.getFullYear();

    if (age < minAge || age > maxAge) {
        return false;
    }

    return true;
}

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
        const nameCell = `<td>${entry.fullName}</td>`;
        const emailCell = `<td>${entry.userEmail}</td>`;
        const passwordCell = `<td>${entry.userPassword}</td>`;
        const dobCell = `<td>${entry.userDob}</td>`;
        const acceptTermsCell = `<td>${entry.acceptTerms ? 'true' : 'false'}</td>`;

        const row = `<tr>${nameCell}${emailCell}${passwordCell}${dobCell}${acceptTermsCell}</tr>`;
        tableEntries += row;
    }
    const table = `<table><thead><tr><th>Full Name</th><th>Email</th><th>Password</th><th>Date of Birth</th><th>Accepted Terms?</th></tr></thead><tbody>${tableEntries}</tbody></table>`;
    let details = document.getElementById("user-details");
    details.innerHTML = table;
}

const saveForm = (event) => {
    event.preventDefault();
    const fullName = document.getElementById("fullName").value;
    const userEmail = document.getElementById("userEmail").value;
    const userPassword = document.getElementById("userPassword").value;
    const userDob = document.getElementById("userDob").value;
    const acceptTerms = document.getElementById("acceptTerms").checked;

    const entry = {
        fullName,
        userEmail,
        userPassword,
        userDob,
        acceptTerms
    };

    // Remove duplicate entries with the same email
    userData = userData.filter((existingEntry) => existingEntry.userEmail !== userEmail);

    userData.push(entry);
    localStorage.setItem("user-details", JSON.stringify(userData));
    displayData();
}

myForm.addEventListener("submit", saveForm);
displayData();
