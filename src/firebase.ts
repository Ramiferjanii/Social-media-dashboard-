import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDBiQ6PzHhwICdbXx7ilbbS0X_0R2ptBkM",
    authDomain: "socialmedia-eb117.firebaseapp.com",
    projectId: "socialmedia-eb117",
    storageBucket: "socialmedia-eb117.firebasestorage.app",
    messagingSenderId: "837612131374",
    appId: "1:837612131374:web:306540a3e027a8ff91bbbf",
    measurementId: "G-WH8LJZFX2F"
  
};

export const app = initializeApp(firebaseConfig);

const handleGoogleLogin = async () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    alert(`Logged in as: ${user.displayName} (${user.email})`);
    // Optionally, redirect or update app state here
  } catch (error: any) {
    alert("Google login failed: " + error.message);
  }
};