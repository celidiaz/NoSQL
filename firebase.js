
// Importar funciones necesarias
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

// Configuración del proyecto
const firebaseConfig = {
    apiKey: "AIzaSyDbWS_B0U4iBumTNxUcvXjE5VMN8npi3tE",
    authDomain: "prueba-709f0.firebaseapp.com",
    projectId: "prueba-709f0",
    storageBucket: "prueba-709f0.firebasestorage.app",
    messagingSenderId: "560562155578",
    appId: "1:560562155578:web:91ae3ccea2684e2f5cc503"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
export const db = getFirestore(app);
