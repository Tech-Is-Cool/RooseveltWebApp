  import { getFirestore, collection, getDocs, onSnapshot, query, orderBy } 
  from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";
  
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-analytics.js";
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBEactaP_cn_AKiiohTht1hhZfDwT4CgMA",
    authDomain: "roosevelt-web-app.firebaseapp.com",
    projectId: "roosevelt-web-app",
    storageBucket: "roosevelt-web-app.firebasestorage.app",
    messagingSenderId: "290948945153",
    appId: "1:290948945153:web:ff41d657aae0e5343ab700",
    measurementId: "G-M0Y63B9XQY"
  };



// Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  console.log(db)
  const analytics = getAnalytics(app);

// Real-time listener and updater
var eventsRef = collection(db, 'events')
export var eventsRef;
export { db };