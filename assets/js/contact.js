import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-analytics.js";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  deleteField,
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

let send = document.getElementById("form-submit");

const firebaseConfig = {
  apiKey: "AIzaSyAY-I5ltI_6yBvh-Oo2xzeDC1tf5dTXHVA",
  authDomain: "affordable-matrimony-web.firebaseapp.com",
  projectId: "affordable-matrimony-web",
  storageBucket: "affordable-matrimony-web.appspot.com",
  messagingSenderId: "484014559547",
  appId: "1:484014559547:web:003c327ec77e005682a71e",
  measurementId: "G-SJG4J9WLYN",
};

send.addEventListener("click", sendMessage);

async function sendMessage() {
  console.log("send message is called");
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore();

  let name = document.getElementById("name");
  let email = document.getElementById("email");
  let phone = document.getElementById("phone");
  let message = document.getElementById("message");

  console.log("name", name.value);
  console.log("email", email.value);
  console.log("phone No", phone.value);
  console.log("message", message.value);

  const emailData = {
    business_id: "f1d8a6de-e0d1-4dbb-a7c1-92477eb9c079",
    form_id: 25,
    inquiry_data: {
      name: document.getElementById("name").value,
      mobile: document.getElementById("phone").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
      time: new Date().toISOString(),
    },
  };
  console.log("email data object : ", emailData);
  fetch("https://wrkazepojiibuogurijz.supabase.co/functions/v1/sendInquiry", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Handle response if needed
      return response.json();
    })
    .then((data) => {
      console.log("Response:", data);
      // Handle successful response
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      // Handle errors
    });

  var ref = collection(db, "Inquiry");
  console.log(ref);
  const docRef = await addDoc(ref, {
    name: name.value,
    mobile: phone.value,
    email: email.value,
    message: message.value,
  })
    .then((res) => {
      document.getElementById("name").value = "";
      document.getElementById("mobile").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";

      //   success.innerText = "Contact Inquiry added sucessfully";
      //   success.style.backgroundColor = "green";
      //   success.style.display = "flex";

      //   setTimeout(() => {
      //     success.style.display = "none";
      //   }, 5000);

      let id = res.id;
      const docToUpdate = doc(ref, id); // Create a reference to the document with the obtained id
      return updateDoc(docToUpdate, {
        id: docToUpdate.id,
      });
    })
    .catch((err) => {});
}
