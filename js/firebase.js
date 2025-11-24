// Configuración Firebase
var firebaseConfig = {
  apiKey: "AIzaSyDg47slMZt3RvZULEJi0CnHmGWYfyDpa0A",
  authDomain: "splendorherbs-admin.firebaseapp.com",
  projectId: "splendorherbs-admin",
  storageBucket: "splendorherbs-admin.firebasestorage.app",
  messagingSenderId: "550979088160",
  appId: "1:550979088160:web:fd0f9af671d06fe286b145"
};


// Inicializar Firebase (evita doble inicialización)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Instancias globales
const db = firebase.firestore();
const storage = firebase.storage();