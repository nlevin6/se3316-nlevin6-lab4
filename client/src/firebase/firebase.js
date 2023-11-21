// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCNIgKEWQ8JRv_gTi3LnSdskg4qgc1HY1E",
    authDomain: "se3316-nlevin6-lab4.firebaseapp.com",
    projectId: "se3316-nlevin6-lab4",
    storageBucket: "se3316-nlevin6-lab4.appspot.com",
    messagingSenderId: "160076005874",
    appId: "1:160076005874:web:0100c045a2927b2f426b6b",
    measurementId: "G-XSCE5TQGXT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);