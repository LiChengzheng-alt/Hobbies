function logerror(event) {
    // 1. Get input values
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var age = document.getElementById("sage").value;
    var role = document.getElementById("role").value;

    // Check if only one radio button for experience level is selected
    var expSelected = document.querySelector('input[name="exp"]:checked');

    // Check if at least one checkbox for goals is selected
    var goalsSelected = document.querySelectorAll('input[name="Goals"]:checked');

    // 2. Validation Checks & Popup Alerts

    // Check empty text fields
    if (name === "") {
        alert("Please enter your name.");
        return false;
    }

    if (email === "") {
        alert("Please enter your email address.");
        return false;
    }

    // Check basic email format (@ symbol)
    if (!email.includes("@") || !email.includes(".")) {
        alert("Please enter a valid email address (e.g. name@example.com).");
        return false;
    }

    // Check age range
    if (age === "" || isNaN(age)) {
        alert("Please enter a valid age.");
        return false;
    }

    var ageNum = parseInt(age);
    if (ageNum < 5 || ageNum > 90) {
        alert("Age must be between 5 and 90 years old.");
        return false;
    }

    // Check dropdown option selection
    if (role === "" || role === null) {
        alert("Please select a role you wish to pursue.");
        return false;
    }

    // Check radio buttons
    if (!expSelected) {
        alert("Please select your experience level.");
        return false;
    }

    // Check checkboxes
    if (goalsSelected.length === 0) {
        alert("Please select at least one learning goal.");
        return false;
    }

    // If all checks pass, allow form submission to proceed
    return true;
}