const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
})

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
})


// Get the "Get QR" button and QR image elements
const downloadButton = document.getElementById('download');
const qrImage = document.getElementById('qrImage');

// Add a click event listener to the "Get QR" button
downloadButton.addEventListener('click', () => {
  if (qrImage.src) {
    const link = document.createElement('a');
    link.href = qrImage.src; // Set the QR image source as the download URL
    link.download = 'qr-code.png'; // Set the default file name for the downloaded QR code
    link.style.display = 'none'; // Hide the link element
    document.body.appendChild(link); // Append the link to the document
    link.click(); // Trigger the download
    document.body.removeChild(link); // Remove the link element after download
  } else {
    alert('QR code is not available for download!');
  }
});


/*// Get elements
const popup = document.querySelector('.popup');
const loginButton = document.getElementById('loginButton');
const confirmButton = document.getElementById('comfirm');

// Show popup when "Login" button is clicked
loginButton.addEventListener('click', () => {
  popup.style.display = 'block'; // Show the popup
});

// Hide popup when clicking outside the popup content
window.addEventListener('click', (event) => {
  if (event.target === popup) {
    popup.style.display = 'none'; // Hide the popup
  }
});

// Redirect to dashboard.html when "COMFIRM" button is clicked
confirmButton.addEventListener('click', () => {
  window.location.href = 'dashboard.html'; // Redirect to dashboard page
});*/
