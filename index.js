const registrationForm=document.getElementById('registration-form');
const userDataTable=document.getElementById('user-data');
const userDataTableBody=userdataTable.querySelector('tbody');
const dobInput=document.getElementById('dob');
const dobError=document.getElementById('dob');

windows.addEventListener('load',() => {
    updateUserDataTable();
});
registrationForm.addEventListener('submit',(event) =>{
    event.preventDefault();
    const userData= {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password:document.getElementById('password').value,
        dob:document.getElementById('dob').value,
        terms:document.getElementById('terms').checked
    };
    if(!validateUserData(userData)){
        const errorMessage=document.createElement('p');
        errorMessage.textContent='Value must be 21/11/1967 or later';
        errorMessage.classList.add('error-message.');
        const dataField=document.getElementById('dob');
        dateField.parentNode.appendChild(errorMessage);
    }
else{
saveUserData(userData);
    updataUserDataTable();
    clearForm();
}
});
function ValidateUserData(userData) {
    const minAge=18;
    const maxAge=55;
    const today=new Date();
    const birthDate = new Data(userData.dob);
    const age=today.getFullYear() - bithDate.getFullYear();
    if (age < minAge || age > maxAge){
return false;
    }
        return true;
}
function saveUserData(userData)
{
    const existingUserData=JSON.parse(localStorage.getItem('userList')) || [];
    userList.forEach((userData) => {
        const userDataRow = createUserDataTableRow(userData);
        userDataTableBody.appendChild(userDataRow);
    });
    if (userList.length>0){
        userDataTable.classList.remove('hidden');
    }else{
        userDataTable.classList.add('hidden');
    }
}
function createUserDataTableRow(userData) {
    const row=document.createElement('tr');
    row.innerHTML='
        <td>${userData.name}</td>
    <td>${userData.email}</td>
    <td>${userData.passsword}</td>
    <td>${userData.dob}</td>
    <td>${userData.terms ? 'true': 'false'}</td>
';
    return row;
}
function clearForm(){
 registrationForm.reset();
}
      
                         
