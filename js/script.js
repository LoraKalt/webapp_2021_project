
/*Validates the form on Sign Up */
function validateSignUp() {
    var formIsValid = true;

    //First Name Check:
    var firstName = document.getElementById("txtFirstName");
    var errorName = document.querySelector("#divErrorName");

    if (firstName.value == "") {
        firstName.classList.add("is-invalid");
        errorName.classList.remove("invisible");
        errorName.innerHTML = "Required: First and last name"
        formIsValid = false;
    } else {
        firstName.classList.remove("is-invalid");
        errorName.classList.add("invisible");
    }

    //Last Name Check:
    var lastName = document.getElementById("txtLastName");
    if (lastName.value == "") {
        lastName.classList.add("is-invalid");
        errorName.classList.remove("invisible");
        errorName.innerHTML = "Required: First and last name"
        formIsValid = false;
    } else {
        lastName.classList.remove("is-invalid");
        errorName.classList.add("invisible");
    }

    //Username Check:
    var username = document.getElementById("txtUsername");
    var errorUser = document.querySelector("#divErrorUsername");
    if (username.value == "") {
        username.classList.add("is-invalid");
        errorUser.classList.remove("invisible");
        errorUser.innerHTML = "Required: Username";
        formIsValid = false;
    } else {
        errorUser.classList.remove("is-invalid");
        errorUser.classList.add("invisible");
        //TODO: Search database to see if input matches an already existing username
    }

    //Email Check:
    var email = document.getElementById("txtEmail");
    var errorE = document.querySelector("#divEmailErr");
    if (email.value == "") {
        email.classList.add("is-invalid");
        errorE.classList.remove("invisible");
        errorE.innerHTML = "Required: Email Address";
        formIsValid = false;
    } else {
        //TODO: Check if email is valid
        email.classList.remove("is-invalid");
        errorE.classList.add("invisible");
    }

    //Password Check:
    var password = document.getElementById("txtPassword");
    var confirmPssd = document.getElementById("txtConfirmPassword");
    var errorPassword = document.querySelector("#divPasswordErr");

    if (password.value == "" || confirmPssd.value == "") {
        password.classList.add("is-invalid");
        confirmPssd.classList.add("is-invalid");
        errorPassword.classList.remove("invisible");
        errorPassword.innerHTML = "Required: Password";
        formIsValid = false;

    } else {
        if (password.value != confirmPssd) {
            //Make text visible
            confirmPssd.classList.add("is-invalid");
            errorPassword.classList.remove("invisible");
            errorPassword.innerHTML = "The two entered passwords do not match";
            formIsValid = false;
        } else {
            confirmPssd.classList.remove("is-invalid");
            password.classList.remove("is-invalid");
            confirmPssd.classList.add("invisible");
        }

    }

    //security Question and Answer Check
    var securityQuestion = document.getElementById("cbSecurity");
    var securityAnswer = document.getElementById("txtAnswer");
    var securityError = document.querySelector("#divSecurityErr");

    if (securityQuestion.value == "" || securityAnswer.value == "") {
        securityQuestion.classList.add("is-invalid");
        securityAnswer.classList.add("is-invalid");
        securityError.classList.remove("invisible");
        securityError.innerHTML = "Required: Security question and answer";
        formIsValid = false;
    } else {
        securityQuestion.classList.remove("is-invalid");
        securityAnswer.classList.remove("is-invalid");
        securityError.classList.add("invisible");
        formIsValid = false;
    }

    //DoB Check
    var DoB = document.getElementById("txtDoB");
    var dobError = document.querySelector("#divDoBError");
    if (DoB.value == "") {
        DoB.classList.add("is-invalid");
        dobError.classList.remove("invisible");
        dobError.innerHTML = "Required: Date of Birth";
        formIsValid = false;
    } else {
        var DoBDate = new Date(DoB.value);
        var todayDate = new Date();

        if (DoBDate >= todayDate) {
            dobError.classList.remove("invisible");
            dobError.innerHTML = "Date of Birth must be before today's date";
            DoB.classList.add("is-invalid");
            formIsValid = false;

        } else {
            dobError.classList.add("invisible");
            dobError.innerHTML = "";
            DoB.classList.remove("is-invalid");
        }

    }

    return formIsValid;
}

/*Validates the form on Sign Up */
function validateSignIn() {
    var formIsValid = true;
    var email = document.getElementById("txtSignEmail");
    var password = document.getElementById("txtSignPassword");
    //var errorMsg = document.querySelector("#divLoginError");
    var errorEmail = document.querySelector("#divEmailError");
    var errorPssd = document.querySelector("#divPasswordError");

    if (email.value == "") {
        email.classList.add("is-invalid");
        errorEmail.classList.remove("invisible");
        errorEmail.innerHTML = "Invalid Email Input"
        formIsValid = false;
    } else {
        email.classList.remove("is-invalid");
        errorEmail.classList.add("invisible");
    }

    if (password.value == "") {
        password.classList.add("is-invalid");
        errorPssd.classList.remove("invisible");
        errorPssd.innerHTML = "Invalid Password Input"
        formIsValid = false;
    } else {
        password.classList.remove("is-invalid");
        errorPssd.classList.add("invisible");
    }

    //checks database for user with matching email and password here

    // if(!formIsValid){
    //     errorMsg.classList.remove("invisible");
    //     errMsg.innerHTML = "Email and/or password are entered incorrectly";
    // } else {
    //     errorMsg.classList.add("invisible");
    // }



    return formIsValid;

}