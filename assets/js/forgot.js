// Select the button using its class
const registerButton = document.querySelector('.register-btn');

// Add a click event listener to the button
registerButton.addEventListener('click', () => {
    // Redirect to the register.html page
    window.location.href = 'login.html';
});
