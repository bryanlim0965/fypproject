// ===== Firebase Config + Init =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCnIL_Lg-sEQs-52YRUL9PTaWTWc4Xu5xA",
  authDomain: "final-year-b1cc2.firebaseapp.com",
  projectId: "final-year-b1cc2",
  storageBucket: "final-year-b1cc2.firebasestorage.app",
  messagingSenderId: "537245015385",
  appId: "1:537245015385:web:ab79c9ec5e2a74cc924048",
  measurementId: "G-V6SWSF6F2D"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ===== Handle Login =====
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("✅ Login successful!");
        console.log("Logged in:", userCredential.user);
        window.location.href = "landing.html"; // redirect to homepage
      })
      .catch((err) => {
        alert("❌ " + err.message);
      });
  });
}

// ===== Handle Register =====
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Password match check
    if (password !== confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("✅ Registration successful!");
        console.log("Registered:", userCredential.user);
        window.location.href = "login.html"; // redirect to login page
      })
      .catch((err) => {
        alert("❌ " + err.message);
      });
  });
}
