// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfiAqivd0jlvgNdvXGRC_K-Zw7Z-e2pqk",
  authDomain: "conference-management-sy-4bf23.firebaseapp.com",
  databaseURL: "https://conference-management-sy-4bf23-default-rtdb.firebaseio.com",
  projectId: "conference-management-sy-4bf23",
  storageBucket: "conference-management-sy-4bf23.app",
  messagingSenderId: "143602289779",
  appId: "1:143602289779:web:ec266bf025447cd4e6ae06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();

// Function to display a message
function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(function () {
    messageDiv.style.opacity = 0;
  }, 5000);
}

// Handle User Sign-Up
const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', (event) => {
  event.preventDefault();
  const firstName = document.getElementById('fname').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const session = document.getElementById('session').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        firstName: firstName,
        email: email,
        session: session,
        userId: user.uid,
      };

      const userRef = ref(db, `users/${user.uid}`);
      set(userRef, userData)
        .then(() => {
          showMessage('Account Created Successfully', 'signUpMessage');
        })
        .catch((error) => {
          console.error("Error writing to database", error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') {
        showMessage('Email Address Already Exists !!!', 'signUpMessage');
      } else {
        showMessage('Unable to create User', 'signUpMessage');
      }
    });
});

// Handle User Login
const signIn = document.getElementById('loginButton');
signIn.addEventListener('click', (event) => {
  event.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  // Admin Default Credentials
  const adminEmail = 'admin123@gmail.com';
  const adminPassword = 'admin123';

  if (email === adminEmail && password === adminPassword) {
    showMessage('Admin Login Successful', 'signInMessage');
    localStorage.setItem('isAdmin', true);
    window.location.href = 'admin.html';
  } else {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        showMessage('Login is successful', 'signInMessage');
        const user = userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);

        // Show the popup after login
        const popup = document.querySelector('.popup');
        popup.style.display = 'block';

        // Hide popup when clicking outside the popup content
        window.addEventListener('click', (event) => {
          if (event.target === popup) {
            popup.style.display = 'none';
          }
        });

        // Generate QR code
        const imgBox = document.getElementById("imgBox");
        const qrImage = document.getElementById("qrImage");
        const qrText = localStorage.getItem('loggedInUserId');

        function generateQR() {
          if (qrText && qrText.length > 0) {
            qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrText}`;
            imgBox.classList.add("show-img");
          } else {
            alert("Unable to generate QR code: User ID is missing.");
          }
        }
        generateQR();

        // Redirect to dashboard.html on "COMFIRM"
        const confirmButton = document.getElementById('comfirm');
        confirmButton.addEventListener('click', () => {
          window.location.href = 'dashboard.html';
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/wrong-password') {
          showMessage('Incorrect Email or Password', 'signInMessage');
        } else if (errorCode === 'auth/user-not-found') {
          showMessage('Account does not exist', 'signInMessage');
        } else {
          showMessage('Error during login', 'signInMessage');
        }
      });
  }
});
