document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('joinnow');
    
    if (!form) return;

    const emailInput = document.getElementById('email');
    const ageInput = document.getElementById('sage');
    const goalCheckboxes = document.querySelectorAll('input[name="Goals"]');

    // Function to check custom rules
    function checkValidation() {
        // 1. Email check
        if (emailInput && emailInput.value) {
            if (!emailInput.value.includes('@')) {
                emailInput.setCustomValidity('Email must include "@"');
            } else {
                emailInput.setCustomValidity(''); // Clear error if valid
            }
        }

        // 2. Age check (Between 5 and 90)
        if (ageInput && ageInput.value) {
            const age = parseInt(ageInput.value, 10);
            if (isNaN(age) || age < 5 || age > 90) {
                ageInput.setCustomValidity('Please enter an age between 5 and 90.');
            } else {
                ageInput.setCustomValidity(''); // Clear error if valid
            }
        }

        // 3. Checkboxes check (At least one checked)
        if (goalCheckboxes.length > 0) {
            const isChecked = Array.from(goalCheckboxes).some(cb => cb.checked);
            
            // Clear message from all checkboxes
            goalCheckboxes.forEach(cb => cb.setCustomValidity(''));

            // Set message on first checkbox if none selected
            if (!isChecked) {
                goalCheckboxes[0].setCustomValidity('Please select at least one learning goal.');
            }
        }
    }

    // Run validation on submit
    form.addEventListener('submit', function (event) {
        // Run checks first
        checkValidation();

        // Check if form is invalid
        if (!form.checkValidity()) {
            event.preventDefault(); // Stop form submission
            form.reportValidity();  // THIS LINE MAKES THE POPUP SHOW UP!
        }
    });

    // Also re-check checkboxes as soon as the user clicks one
    goalCheckboxes.forEach(cb => {
        cb.addEventListener('change', checkValidation);
    });
});