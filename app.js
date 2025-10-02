import { collection, query, orderBy, onSnapshot, getDoc, doc, where } 
  from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { db } from "./firebase.js";

// ✅ db is now a Firestore instance

async function checkIfDocExists(collectionName, docId) {
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);

try {
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return true;
  } else {
    console.log("No such document!");
    return false;
  }

     } catch (err) {
  if (err.code === "not-found" || err.message.includes("404")) {
    // 🔇 ignore this specific error
  } else {
    console.error(err); // still log all other errors
  } 
 }
}

const today = new Date();
today.setHours(0, 0, 0, 0);

const q = query(collection(db, 'events'), where('date', '>=', today), orderBy('date', 'asc'));

onSnapshot(q, (snapshot) => {
  const list = document.getElementById("events-container");
  list.innerHTML = ""; // reset
  snapshot.docChanges().forEach(change => {
    var doc = change.doc;
    const data = doc.data();
    
      // when a new one is created, make a new <div> html element
      const item = document.createElement("div");
      item.id = doc.id;
      // innerHTML is what it sounds/looks like. You don't need the original <div></div> tags of the new element we're creating because that's what it comes with
      // if no image given in firebase, then don't display one nor the default "no image"
      item.innerHTML = `
        <h3 class="title">${data.title}</h3><img src="${data.imageUrl}" onerror="this.style.display='none'"> 
        <p class="description">${data.description}</p>
        <p class="date-time"><b>${data.date.toDate().toLocaleString()}</b></p><p class="location">Location: ${data.location}</p>
        
      `;
    
    if (change.type === "removed") {
      // remove deleted doc from DOM
      const item = document.getElementById(doc.id);
      if (item) {
        item.remove();
      }
    }

      if (data.imageUrl === null) {
        console.log(doc.id + " doesn't have an image yet")
      }

      // add the "event" class to the div for styling
    item.classList.add('event')
    list.appendChild(item); // nest it under the "events-container" html ID
  });
});
