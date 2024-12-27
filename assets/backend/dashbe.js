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

// Listen for Authentication State Changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    const userNameElement = document.getElementById("userName");
    const userEmailElement = document.getElementById("userEmail");
    const userSessionElement = document.getElementById("session");

    // Fetch user data from Realtime Database
    const userRef = ref(db, `users/${user.uid}`);
    onValue(userRef, (snapshot) => {
      const userData = snapshot.val();

      if (userData) {
        const firstName = userData.firstName || "User";
        const email = userData.email || "No Email Available";
        const session = userData.session || "Not Registered";

        // Update the HTML elements with user data
        userNameElement.textContent = firstName;
        userEmailElement.textContent = email;
        userSessionElement.textContent = session;

        // Filter and display only sessions matching the user's registered session
        const userSession = userSessionElement.textContent;

        const Sessions = [
          { session: 'Session_1', hall: 'ZO723', status: 'Pending', time: '8.15 AM' },
          { session: 'Session_2', hall: 'U1235', status: 'Pending', time: '11.15 AM' },
          { session: 'Session_3', hall: 'Z0635', status: 'Pending', time: '3.15 PM' }
        ];

        Sessions.forEach(order => {
          if (order.session === userSession) { // Check if the session matches the user session
            const tr = document.createElement('tr');
            const trContent = `
              <td>${order.session}</td>
              <td>${order.hall}</td>
              <td>${order.time}</td>
              <td class="${order.status === 'Declined' ? 'danger' : order.status === 'Pending' ? 'warning' : 'primary'}">${order.status}</td>
            `;
            tr.innerHTML = trContent;
            document.querySelector('table tbody').appendChild(tr);
          }
        });
      } else {
        console.log("User data not found in database.");
      }
    });
  } else {
    console.log("No user logged in");
  }
});
