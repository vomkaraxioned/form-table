/* Author: 

*/
//form inputs and other required elements and variables initialized
const form = document.querySelector('.form');
const cancel = document.querySelector('input[type=button]');
const error = document.querySelectorAll('.error');
const inputs = document.querySelectorAll('input[type=text]');
const textarea = document.querySelector('textarea');
let fname, lname, gender, address;
let validInput;
let editRowIndex = -1;

//evenlistener on form and cancel button
cancel.addEventListener("click", clear);
form.addEventListener('submit', validation);


//function to add eventlistener on new edit and del button

function updateButtons() {
    let edits = document.querySelectorAll('.edit');
    let dels = document.querySelectorAll('.del');
    edits.forEach((edit, index) => {
        edit.index = index;
        edit.addEventListener('click', editRow);
    });

    dels.forEach((del, index) => {
        del.index = index;
        del.addEventListener('click', delRow);
    });
}

//function to edit row

function editRow() {
    const radio = document.querySelectorAll('input[type=radio]');
    let rowIndex = this.index + 2;
    let cols = document.querySelectorAll(".row:nth-child(" + rowIndex + ") .cols .col");
    inputs[0].value = cols[0].childNodes[0].nodeValue;
    inputs[1].value = cols[1].childNodes[0].nodeValue;
    textarea.value = cols[3].childNodes[0].nodeValue;
    for (x in radio) {
        if (radio[x].value == cols[2].childNodes[0].nodeValue) {
            radio[x].checked = true;
        }
    }
    editRowIndex = rowIndex - 1;
}


//function to delete row

function delRow() {
    let rowToDelete = document.querySelectorAll(".row");
    let rowIndex = this.index + 1;
    rowToDelete[rowIndex].remove();
}


//function to clear input field
function clear() {
    for (x in inputs) {
        inputs[x].value = "";
    }
    textarea.value = "";
    error.forEach((e) => {
        e.style.display = "none";
    });
}


//function to call all validation methods
function validators(fields) {
    validInput = true;
    let name = ["First name", "Last Name"]
    nameValidator(fields[0], error[0], name[0]);
    nameValidator(fields[1], error[1], name[1]);
    genderValidator(fields[2], error[2]);
    addressValidator(fields[3], error[3]);
    checkValidator(fields[4]);
}

function nameValidator(name, err, title) {
    let re = /^[A-Za-z]+$/;
    try {
        if (name == "") {
            validInput = false;
            throw title + " is empty";
        } else if (name.length > 15) {
            validInput = false;
            throw title + " length can't be more than 15";
        } else if (name.length < 3) {
            validInput = false;
            throw title + "  length can't be less than 3";
        } else if (re.test(name) == false) {
            validInput = false;
            throw title + "  can't have numbers";
        }
        else {
            err.style.display = "none";
        }
    } catch (e) {
        err.innerHTML = e;
        err.style.display = "block";
    }
}

function genderValidator(radio, err) {
    try {
        if (radio == "") {
            validInput = false;
            throw "please select gender";
        }
        else {
            err.style.display = "none";
        }
    } catch (e) {
        err.innerHTML = e;
        err.style.display = "block";
    }
}

function addressValidator(addr, err) {
    try {
        if (addr == "") {
            validInput = false;
            throw "please fill address field";
        } else if (addr.length < 10) {
            validInput = false;
            throw "please fill valid address";
        }
        else {
            err.style.display = "none";
        }
    } catch (e) {
        err.innerHTML = e;
        err.style.display = "block";
    }
}

function checkValidator(check) {
    if (check === false) {
        validInput = false;
        error[error.length - 1].innerHTML = "please agree conditions";
        error[error.length - 1].style.display = "block";
    }
    else {
        error[error.length - 1].style.display = "none";
    }
}

//validation function to initialize form values
function validation(e) {
    let fname = document.forms['form']['first-name'].value;
    let lname = document.forms['form']['last-name'].value;
    let gender = document.forms['form']['gender'].value;
    let address = document.forms['form']['address'].value;
    const check = document.forms['form']['t&c'].checked;
    let fields = [fname, lname, gender, address, check];
    validators(fields);
    alert(validInput);
    if (validInput) {
        addData(fields);
    }
    updateButtons();
    e.preventDefault();
}


//function for adding values to column
function addData(fields) {
    let i;
    const table = document.querySelector(".table");
    const ul = document.createElement("ul");
    const row = document.createElement("li");
    for (i = 0; i < 6; i++) {
        const li = document.createElement("li");
        li.classList.add("col");
        if (i > 3) {
            const button = document.createElement("button");
            if (i == 4) {
                button.classList.add("edit");
                button.innerHTML = "edit";
            } else {
                button.classList.add("del");
                button.innerHTML = "delete";
            }
            li.appendChild(button);
        } else {
            li.innerHTML = fields[i];
        }
        ul.appendChild(li);
    }

    row.classList.add("row");
    ul.classList.add("cols");
    row.appendChild(ul);
    if (editRowIndex != -1) {
        let rowToDelete = document.querySelectorAll(".row");
        rowToDelete[editRowIndex].remove();
        rowToDelete = document.querySelectorAll(".row");
        table.insertBefore(row, rowToDelete[editRowIndex]);
    }
    else {
        table.appendChild(row);
    }
    editRowIndex = -1;
}