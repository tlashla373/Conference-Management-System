// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfiAqivd0jlvgNdvXGRC_K-Zw7Z-e2pqk",
  authDomain: "conference-management-sy-4bf23.firebaseapp.com",
  databaseURL: "https://conference-management-sy-4bf23-default-rtdb.firebaseio.com",
  projectId: "conference-management-sy-4bf23",
  storageBucket: "conference-management-sy-4bf23.appspot.com",
  messagingSenderId: "143602289779",
  appId: "1:143602289779:web:ec266bf025447cd4e6ae06",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// DOM elements
const userNameElement = document.getElementById("userName");
const userEmailElement = document.getElementById("userEmail");
const userSessionElement = document.getElementById("session");
const tbody = document.getElementById("sessionTableBody"); // Assuming you have a table body with this id

// Function to populate session table
function populateSessionTable(userSession) {
  const sessions = [
    { session: "Session_1", hall: "ZO723", time: "8.15 AM" },
    { session: "Session_2", hall: "U1623", time: "11.15 AM" },
    { session: "Session_3", hall: "Z0635", time: "3.15 PM" },
  ];

  // Clear previous content
  tbody.innerHTML = "";

  const filteredSessions = sessions.filter((s) => s.session === userSession);

  if (filteredSessions.length > 0) {
    filteredSessions.forEach((session) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${session.session}</td>
        <td>${session.hall}</td>
        <td>${session.time}</td>
      `;
      tbody.appendChild(tr);
    });
  } else {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td colspan="3">No session found</td>`;
    tbody.appendChild(tr);
  }
}

// Firebase Authentication State Change Listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    const userRef = ref(db, `users/${user.uid}`);
    onValue(userRef, (snapshot) => {
      const userData = snapshot.val();

      if (userData) {
        const firstName = userData.firstName || "User";
        const email = userData.email || "No Email Available";
        const session = userData.session || "Not Registered";

        // Update DOM elements
        if (userNameElement) userNameElement.textContent = firstName;
        if (userEmailElement) userEmailElement.textContent = email;
        if (userSessionElement) userSessionElement.textContent = session;

        // Populate sessions
        populateSessionTable(session); // Pass session to populate the table
      } else {
        console.error("User data not found in database.");
      }
    });
  } else {
    console.log("No user logged in.");
  }
});
