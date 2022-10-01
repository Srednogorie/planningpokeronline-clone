import { initializeApp } from 'firebase/app'
// import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"
import {getAuth, connectAuthEmulator, GoogleAuthProvider, signInWithPopup,} from "firebase/auth"
import {getFirestore} from "@firebase/firestore"
// import { getStorage, connectStorageEmulator } from "firebase/storage"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
}
const firebaseApp = initializeApp(firebaseConfig)

// Connect to emulators on localhost
// if (typeof window !== "undefined") {
//     if (window.location.hostname === "localhost") {
//         // Auth
//         const auth = getAuth();
//         connectAuthEmulator(auth, "http://localhost:9099");
//         // Firestore
//         const db = getFirestore();
//         connectFirestoreEmulator(db, 'localhost', 8080);
//
//         // Storage
//         const storage = getStorage();
//         connectStorageEmulator(storage, "localhost", 9199);
//     }
// }


// Firestore
export const clientFirestore = getFirestore(firebaseApp)
// Authentication
export const auth = getAuth()
const provider = new GoogleAuthProvider()
export const signInWithGoogle = () => signInWithPopup(auth, provider)
// Storage
// export const storage = getStorage(firebaseApp);

export const signOut = () => auth.signOut()

