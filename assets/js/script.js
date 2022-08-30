/* Author: 

*/
//form inputs
const form = document.querySelector('.form');
const cancel = document.querySelector('input[type=button]');
const error = document.querySelectorAll('.error');
const inputs = document.querySelectorAll('input[type=text]');
const textarea = document.querySelector('textarea');
let validInput = false;
cancel.addEventListener("click", clear);

function clear() {
    for (x in inputs) {
        inputs[x].value = "";
    }
    textarea.value = "";
    error.forEach((e) => {
        e.style.textIndent = "-9999px";
    });
}

class Validators {
    isValid = true;
    errorMsg = [];
    constructor(fields) {
        this.fnameValidator(fields[0]);
        this.lnameValidator(fields[1]);
        this.genderValidator(fields[2]);
        this.addressValidator(fields[3]);
        this.checkValidator(fields[4]);
        this.displayErrors();
    }

    fnameValidator(name) {
        let re = /^[A-Za-z]+$/;
        try {
            if (name == "") {
                this.isValid = false;
                throw "first name is empty";
            } else if (name.length > 15) {
                this.isValid = false;
                throw "first name length can't be more than 15";
            } else if (name.length < 3) {
                this.isValid = false;
                throw "first name length can't be less than 3";
            } else if (re.test(name) == false) {
                this.isValid = false;
                throw "First name can't have numbers";
            } else {

                throw " ";
            }
        } catch (e) {
            this.errorMsg[0] = e;
        }
    }

    lnameValidator(lname) {
        let re = /^[A-Za-z]+$/;
        try {
            if (lname == "") {
                this.isValid = false;
                throw "last name is empty";
            } else if (lname.length > 15) {
                this.isValid = false;
                throw "last name length can't be more than 15";
            } else if (lname.length < 3) {
                this.isValid = false;
                throw "first name length can't be less than 3";
            } else if (re.test(lname) == false) {
                this.isValid = false;
                throw "last name can't have numbers";
            } else {
                throw " ";
            }
        } catch (e) {
            this.errorMsg[1] = e;
        }
    }

    genderValidator(radio) {
        try {
            if (radio == "") {
                this.isValid = false;
                throw "please select gender";
            } else {
                throw " ";
            }
        } catch (e) {
            this.errorMsg[2] = e;
        }
    }

    addressValidator(addr) {
        try {
            if (addr == "") {
                this.isValid = false;
                throw "please fill address field";
            } else if (addr.length < 10) {
                this.isValid = false;
                throw "please fill valid address";
            } else {
                throw " ";
            }
        } catch (e) {
            this.errorMsg[3] = e;
        }
    }

    checkValidator(check) {
        if (check === false) {
            this.isValid = false;
            error[error.length - 1].innerHTML = "please agree conditions";
            error[error.length - 1].style.textIndent = 0;
        } else {
            error[error.length - 1].style.textIndent = "-9999px";
        }
    }

    displayErrors() {
        let x;
        let len = error.length - 1;
        for (x = 0; x < len; x++) {
            if (this.errorMsg[x] != "") {
                error[x].innerHTML = this.errorMsg[x];
                error[x].style.textIndent = 0;
            }
        }
        if (this.isValid == true) {
            error[error.length - 1].style.textIndent = "-9999px";
            validInput = true;
        }
    }
}

form.addEventListener('submit', validation);

function validation(e) {
    let fname = document.forms['form']['first-name'].value;
    let lname = document.forms['form']['last-name'].value;
    let gender = document.forms['form']['gender'].value;
    let address = document.forms['form']['address'].value;
    const check = document.forms['form']['t&c'].checked;
    let fields = [fname, lname, gender, address, check];
    let valid = new Validators(fields);
    if (validInput) {
        addData(fields);
    }
    e.preventDefault();
}

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
    table.appendChild(row);;
}