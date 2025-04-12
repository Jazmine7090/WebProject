// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function() {
    // Get references to all form elements we need to work with
    const loginForm = document.getElementById('loginForm'); // The entire login form
    const emailInput = document.getElementById('email'); // Email input field
    const passwordInput = document.getElementById('password'); // Password input field
    const emailError = document.getElementById('emailError'); // Email error message div
    const passwordError = document.getElementById('passwordError'); // Password error message div

    // Regular expression pattern for validating email format:
    // - ^ = start of string
    // - [^\s@]+ = one or more characters that are NOT whitespace or @
    // - @ = literal @ symbol
    // - \. = literal dot (escaped)
    // - $ = end of string
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Add submit event listener to handle form submission
    loginForm.addEventListener('submit', function(e) {
        // Flag to track if form is valid (starts as true)
        let isValid = true;
        
        // First, hide any existing error messages
        emailError.style.display = 'none';
        passwordError.style.display = 'none';

        // Validate email field
        if (!emailInput.value.trim()) {
            // Case 1: Email is empty
            emailError.textContent = 'Email is required';
            emailError.style.display = 'block';
            isValid = false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            // Case 2: Email format is invalid
            emailError.textContent = 'Please enter a valid email address';
            emailError.style.display = 'block';
            isValid = false;
        }

        // Validate password field
        if (!passwordInput.value.trim()) {
            // Case 1: Password is empty
            passwordError.textContent = 'Password is required';
            passwordError.style.display = 'block';
            isValid = false;
        } else if (passwordInput.value.trim().length < 6) {
            // Case 2: Password is too short (less than 6 chars)
            passwordError.textContent = 'Password must be at least 6 characters';
            passwordError.style.display = 'block';
            isValid = false;
        }

        // If form is invalid, prevent submission
        if (!isValid) {
            e.preventDefault(); // Stop the form from submitting
        }
        // If valid, form will submit to login.php normally
    });

    // Real-time validation for email as user types
    emailInput.addEventListener('input', function() {
        // Hide error message if email becomes valid
        if (emailRegex.test(this.value.trim())) {
            emailError.style.display = 'none';
        }
    });

    // Real-time validation for password as user types
    passwordInput.addEventListener('input', function() {
        // Hide error message if password meets length requirement
        if (this.value.trim().length >= 6) {
            passwordError.style.display = 'none';
        }
    });
});