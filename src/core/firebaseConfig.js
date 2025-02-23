import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAs7rwXuPS_ds_sFJRV1lIKguX-faecLNg",
    authDomain: "pet-id-22048.firebaseapp.com",
    projectId: "pet-id-22048",
    storageBucket: "pet-id-22048.appspot.com",
    messagingSenderId: "861807297652",
    appId: "1:861807297652:web:040e62b92848fe4f5cbd21",
    measurementId: "G-ZW2D5376P1",
    databaseURL: "https://pet-id-22048-default-rtdb.firebaseio.com/", // ✅ Add this line
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
