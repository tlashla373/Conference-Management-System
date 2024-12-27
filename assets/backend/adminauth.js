  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
  import {getDatabase, ref, get, child} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";


  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDfiAqivd0jlvgNdvXGRC_K-Zw7Z-e2pqk",
    authDomain: "conference-management-sy-4bf23.firebaseapp.com",
    databaseURL: "https://conference-management-sy-4bf23-default-rtdb.firebaseio.com",
    projectId: "conference-management-sy-4bf23",
    storageBucket: "conference-management-sy-4bf23.firebasestorage.app",
    messagingSenderId: "143602289779",
    appId: "1:143602289779:web:ec266bf025447cd4e6ae06"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  //get ref to database service

  const db = getDatabase(app);

  document.getElementById("sp_submit").addEventListener('click', function(e){
    e.preventDefault();

    set(ref(db, 'user/' + document.getElementById("speakerName").value),{

        speakerName: document.getElementById("speakerName").value,
        sessionId : document.getElementById("sessionId").value,
        imageUrl : document.getElementById("imageUrl").value

    });

    alert("saved succesfully");

  })

