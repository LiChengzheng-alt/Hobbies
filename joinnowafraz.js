// Validation logic for the Join Now form (Afraz hobby - La Liga sign up)

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('joinNowForm');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const successMessage = document.getElementById('formSuccessMessage');

    // Re-check that the confirm password field matches the password field
    function checkPasswordsMatch() {
        if (confirmPassword.value !== password.value) {
            confirmPassword.setCustomValidity('Passwords do not match');
        } else {
            confirmPassword.setCustomValidity('');
        }
    }

    password.addEventListener('input', checkPasswordsMatch);
    confirmPassword.addEventListener('input', checkPasswordsMatch);

    form.addEventListener('submit', function (event) {
        // Run the password match check one more time before submitting
        checkPasswordsMatch();

        if (!form.checkValidity()) {
            // Stop the form from submitting and show Bootstrap's validation styling
            event.preventDefault();
            event.stopPropagation();
            successMessage.classList.add('d-none');
        } else {
            // Everything is valid - this is where you'd normally send data to a server
            event.preventDefault();
            successMessage.classList.remove('d-none');
            form.reset();
            form.classList.remove('was-validated');
        }

        form.classList.add('was-validated');
    });
});
