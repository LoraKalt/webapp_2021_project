// Save scroll position between reloads

document.addEventListener("DOMContentLoaded", function(event) {
    let scrollPos = sessionStorage.getItem('scrollPos');
    let lastPage = sessionStorage.getItem('lastPage');
    if (scrollPos > 0 && lastPage === window.location.href) {
        window.scrollTo(0, scrollPos);
        sessionStorage.removeItem('scrollPos');
    }
});

window.addEventListener("beforeunload", function (e) {
    sessionStorage.setItem('scrollPos', window.scrollY);
    sessionStorage.setItem('lastPage', window.location.href);
});

// Validation

const postText = document.querySelector("#txtPostText");
const charCount = document.querySelector("#char-count");
const commentCount = document.querySelector("#comment-count");

postText.addEventListener('keyup', (event) => {
    let textLength = event.target.value.length;
    if(textLength > 280){
        charCount.innerHTML ="Exceeded limit of 280 characters";
        charCount.classList.add("text-danger");
    }
    else{
        charCount.classList.remove("text-danger");
        charCount.innerHTML = "" + textLength;
    }
});
// commentCount.addEventListener('keyup', (event) => {
//     let textLength = event.target.value.length;
//     if(textLength > 280){
//         commentCount.innerHTML ="Exceeded limit of 280 characters";
//         commentCount.classList.add("text-danger");
//     }
//     else{
//         commentCount.classList.remove("text-danger");
//         commentCount.innerHTML = "" + textLength;
//     }
// });

/**
 * Checks each input for sign-in to see if valid on client-side
 * @returns true if form is valid
 */
function validateSignUp() {
    var formIsValid = true;

    //First Name Check:
    var firstName = document.querySelector("#txtFirstName");
    var errorName = document.querySelector("#divErrorName");

    if (firstName.value == "") {
        firstName.classList.add("is-invalid");
        errorName.classList.remove("invisible");
        errorName.innerHTML = "Required: First and last name";
        formIsValid = false;
    } else {
        firstName.classList.remove("is-invalid");
        errorName.classList.add("invisible");
    }

    //Last Name Check:
    var lastName = document.querySelector("#txtLastName");
    if (lastName.value == "") {
        lastName.classList.add("is-invalid");
        errorName.classList.remove("invisible");
        errorName.innerHTML = "Required: First and last name";
        formIsValid = false;
    } else {
        lastName.classList.remove("is-invalid");
        errorName.classList.add("invisible");
    }

    //Username Check:
    var username = document.querySelector("#txtUsername");
    var errorUser = document.querySelector("#divErrorUsername");
    if (username.value == "") {
        username.classList.add("is-invalid");
        errorUser.classList.remove("invisible");
        errorUser.innerHTML = "Required: Username";
        formIsValid = false;
    } else {
        errorUser.classList.remove("is-invalid");
        errorUser.classList.add("invisible");

    }

    //Email Check:
    var email = document.querySelector("#txtEmail");
    var errorE = document.querySelector("#divEmailErr");
    if (email.value == "") {
        email.classList.add("is-invalid");
        errorE.classList.remove("invisible");
        errorE.innerHTML = "Required: Email Address";
        formIsValid = false;
    } else {
        //Checks to see if email is in valid format
        if (!email.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            email.classList.add("is-invalid");
            errorE.classList.remove("invisible");
            errorE.innerHTML = "Invalid Email Address";
            formIsValid = false;
        }
        else {
            email.classList.remove("is-invalid");
            errorE.classList.add("invisible");
        }

    }

    //Password Check:
    var password = document.querySelector("#txtPassword");
    var confirmPssd = document.querySelector("#confirmpassword");
    var errorPassword = document.querySelector("#divPasswordErr");
    var errorConfirmPssd = document.querySelector("#divPasswordErr2");

    if (password.value == "" || confirmPssd.value == "") {
        password.classList.add("is-invalid");
        confirmPssd.classList.add("is-invalid");
        errorPassword.classList.remove("invisible");
        errorPassword.innerHTML = "Required: Password";
        errorConfirmPssd.classList.remove("invisible");
        errorConfirmPssd.innerHTML = "Required: Confirm Password";
        formIsValid = false;

    } else {
        if (password.value != confirmPssd.value) {
            //Make text visible
            password.classList.add("is-invalid");
            confirmPssd.classList.add("is-invalid");
            errorPassword.classList.remove("invisible");
            errorPassword.innerHTML = "The two entered passwords do not match";
            errorConfirmPssd.classList.remove("invisible");
            errorConfirmPssd.innerHTML = "The two entered passwords do not match";
            formIsValid = false;
            //Makes sure password contains a small letter, a capital letter, and a number. 
        } else {
            if (!password.value.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)) {
                password.classList.add("is-invalid");
                confirmPssd.classList.add("is-invalid");
                errorPassword.classList.remove("invisible");
                errorPassword.innerHTML = "Password must contain at least one lowercase letter, one uppercase letter and a number";
                errorConfirmPssd.classList.remove("invisible");
                errorConfirmPssd.innerHTML = "Password must contain at least one lowercase letter, one uppercase letter and a number";
                formIsValid = false;
            } else {
                confirmPssd.classList.remove("is-invalid");
                password.classList.remove("is-invalid");
                errorPassword.classList.add("invisible");
                errorConfirmPssd.classList.add("invisible");
            }
        }
    }

    //security Question and Answer Check
    var securityQuestion = document.querySelector("#cbSecurity");
    var securityAnswer = document.querySelector("#txtAnswer");
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
        formIsValid = true;
    }

    //DoB Check
    var DoB = document.querySelector("#txtDoB");
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

    //No-strange symbol Check:
    var elements = document.getElementsByClassName("char-check");
    var errorMsgs = document.getElementsByClassName("err-msg");
    var invalidChars = ["<", ">", "#", "-", "{", "}", "(", ")", "\'", "\"", "/`"];

    //checks each element to see if contains invalid char
    for (let i = 0; i < elements.length; i++) {
        for (let j = 0; j < invalidChars.length; j++) {
            if(elements[i].value.includes(invalidChars[j])){
                elements[i].classList.add("is-invalid");
                formIsValid = false;
                test = elements[i].id;
                //for name error
                if (i == 0 || i == 1) {
                    errorMsgs[0].classList.remove("invisible");
                    errorMsgs[0].innerHTML = "Contains <, >, #, -, {, }, (, ), \', \", or \`";
                }
                else {
                    errorMsgs[i-1].classList.remove("invisible");
                    errorMsgs[i-1].innerHTML = "Contains <, >, #, -, {, }, (, ), \', \", or \` ";
                }
            }
        }//end loop invalidChars
    }//end loop elements

    //Error Message
    var submitError = document.getElementById("divSubmitError");
    if(!formIsValid)
        submitError.classList.remove("invisible");
    else
        submitError.classList.add("invisible");
    

    return formIsValid;
}

/**
 * Checks form for sign in client-side to see if valid
 * @returns true if form is valid
 */
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
        errorEmail.innerHTML = "Invalid Email Input";
        formIsValid = false;
    } else {
        email.classList.remove("is-invalid");
        errorEmail.classList.add("invisible");
    }

    if (password.value == "") {
        password.classList.add("is-invalid");
        errorPssd.classList.remove("invisible");
        errorPssd.innerHTML = "Invalid Password Input";
        formIsValid = false;
    } else {
        password.classList.remove("is-invalid");
        errorPssd.classList.add("invisible");
    }

    return formIsValid;
}

function editProfileCheck(){
    var formIsValid = true;

    //First Name Check:
    var firstName = document.querySelector("#txtFirstName");
    var errorName = document.querySelector("#divErrorName");
    console.log(firstName);

    if (firstName.value == "") {
        firstName.classList.add("is-invalid");
        errorName.classList.remove("invisible");
        errorName.innerHTML = "Required: First and last name";
        formIsValid = false;
    } else {
        firstName.classList.remove("is-invalid");
        errorName.classList.add("invisible");
    }
    //Last Name Check:
    var lastName = document.querySelector("#txtLastName");
    if (lastName.value == "") {
        lastName.classList.add("is-invalid");
        errorName.classList.remove("invisible");
        errorName.innerHTML = "Required: First and last name";
        formIsValid = false;
    } else {
        lastName.classList.remove("is-invalid");
        errorName.classList.add("invisible");
    }

    //Email Check:
    var email = document.querySelector("#txtEmail");
    var errorE = document.querySelector("#divEmailErr");
    if (email.value == "") {
        email.classList.add("is-invalid");
        errorE.classList.remove("invisible");
        errorE.innerHTML = "Required: Email Address";
        formIsValid = false;
    } else {
        //Checks to see if email is in valid format
        if (!email.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            email.classList.add("is-invalid");
            errorE.classList.remove("invisible");
            errorE.innerHTML = "Invalid Email Address";
            formIsValid = false;
        }
        else {
            email.classList.remove("is-invalid");
            errorE.classList.add("invisible");
        }

    }


    //security Question and Answer Check
    var securityQuestion = document.querySelector("#cbSecurity");
    var securityAnswer = document.querySelector("#txtAnswer");
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
        formIsValid = true;
    }

    //DoB Check
    var DoB = document.querySelector("#txtDoB");
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

    //No-strange symbol Check:
    var elements = document.getElementsByClassName("char-check");
    var errorMsgs = document.getElementsByClassName("err-msg");
    var invalidChars = ["<", ">", "#", "-", "{", "}", "(", ")", "\'", "\"", "/`"];

    //checks each element to see if contains invalid char
    for (let i = 0; i < elements.length; i++) {
        for (let j = 0; j < invalidChars.length; j++) {
            if(elements[i].value.includes(invalidChars[j])){
                elements[i].classList.add("is-invalid");
                formIsValid = false;
                test = elements[i].id;
                //for name error
                if (i == 0 || i == 1) {
                    errorMsgs[0].classList.remove("invisible");
                    errorMsgs[0].innerHTML = "Contains <, >, #, -, {, }, (, ), \', \", or \`";
                }
                else {
                    errorMsgs[i-1].classList.remove("invisible");
                    errorMsgs[i-1].innerHTML = "Contains <, >, #, -, {, }, (, ), \', \", or \` ";
                }
            }
        }//end loop invalidChars
    }//end loop elements

    //Error Message
    var submitError = document.getElementById("divSubmitError");
    if(!formIsValid)
        submitError.classList.remove("invisible");
    else
        submitError.classList.add("invisible");
    

    return formIsValid;
}


/**
 * Clears all Error Messages when called
 */
function clearErrorMsgs() {
    //var elements = document.getElementsByTagName('input');
    var elements = document.querySelectorAll('input,textarea');
    var errorMsgs = document.getElementsByClassName("text-danger");
    var securityQ = document.getElementById("cbSecurity");
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove("is-invalid");
    }
    if(securityQ != null){
        securityQ.classList.remove("is-invalid");
    }
    
    for (let j = 0; j < errorMsgs.length; j++) {
        errorMsgs[j].classList.add("invisible");
    }
}
/**
 * Updates Security Answer visibility when called
 */
function updateSecurityAnswer() {
    var cbSecurity = document.querySelector("#cbSecurity");
    var divAnswer = document.querySelector("#divSecurityAnswer");

    if (cbSecurity.value != "") {
        divAnswer.classList.remove("invisible");
    } else {
        divAnswer.classList.add("invisible");
    }
}

function postValidation(){
    var formIsValid = true;
    var messageText = document.querySelector("#txtPostText");
    var messageError = document.querySelector("#char-count");


    //280
    //Hashtags need to be comma separated and actual hashtags (start with #)
    if (messageText.value == ""){
        messageText.classList.add("is-invalid");
        messageError.classList.add("text-danger");
        messageError.innerHTML = "Message cannot be blank";
        //errorPost.classList.remove("invisible");
        //errorPost.innerHTML = "Message is empty";
        formIsValid = false;
    }
    else if(messageText.value.length > 280){
        messageText.classList.add("is-invalid");
        formIsValid = false;
    }
    else {
        messageText.classList.remove("is-invalid");
        messageError.classList.remove("text-danger");
    }

    var hashtags = document.querySelector("#txtPostHashtags");
    var errorHash = document.querySelector("#hash-error");

    console.log(hashtags.value);
    hashes = hashtags.value.split(",")
    console.log(hashes);
    if (hashtags.value == ""){
        hashtags.classList.add("is-invalid");
        errorHash.classList.add("text-danger");
        errorHash.innerHTML = "This field cannot be blank";
        formIsValid = false;
    }
    else {
        hashtags.classList.remove("is-invalid");
        errorHash.classList.add("text-muted");
        errorHash.classList.remove("text-danger");
        errorHash.innerHTML = "Begin each hashtag with a '#' character, separate them with commas (',').";
    }
    var invalidHash = false;
    for(let i =0; i<hashes.length; i++){
        if(!hashes[i].match(/^#[a-zA-Z0-9_]*$/)){
            invalidHash = true;
            formIsValid = false;
        }
    }
    if(invalidHash){
        hashtags.classList.add("is-invalid");
        errorHash.classList.remove("text-muted");
        errorHash.classList.add("text-danger");
       
    }
    else{
        hashtags.classList.remove("is-invalid");
        errorHash.classList.add("text-muted");
        errorHash.classList.remove("text-danger");
    }
    
    return formIsValid;
}//post validation end

function replyValidation(){
    var formIsValid = true;

    var reply = document.querySelector("#txtComment");
    var error = document.querySelector("#comment-count");


    if(reply.value == ""){
        reply.classList.add("is-invalid");
        error.classList.add("text-danger");
        error.innerHTML = "This field cannot be blank";
        formIsValid = false;
    }
    else {
        reply.classList.remove("is-invalid");
        error.classList.remove("text-danger");
        error.innerHTML = "This field cannot be blank";
    }
    
    return formIsValid;

}
