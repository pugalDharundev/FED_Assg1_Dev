document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Form submit event
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Get the values entered by the user
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        console.log("Entered Email:", email);  // Log entered email for debugging
        console.log("Entered Password:", password);  // Log entered password for debugging

        // Validate email and password
        if (validateEmail(email) && validatePassword(password)) {
            // Check if email and password match the correct format and are not empty
            if (email !== "" && password !== "") {
                alert('Signed In');
                window.location.href = 'index.html'; // Redirect to the homepage
            } else {
                alert('Please enter a valid email and password.');
            }
        } else {
            // Invalid email or password format
            alert('Invalid email format or password. Please try again.');
        }
    });

    // Simple email validation function
    function validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    // Simple password validation function (you can add more rules if needed)
    function validatePassword(password) {
        return password.length >= 6; // Ensure password is at least 6 characters long
    }
});
