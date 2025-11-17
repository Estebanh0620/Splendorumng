// REGISTRO DE USUARIOS

function signup() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!name || !email || !password) {
    alert("Por favor completa todos los campos");
    return;
  }

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Guardar datos extra en Firestore
      return firebase.firestore().collection("usuarios").doc(user.uid).set({
        name: name,
        email: email,
        role: "admin", // o "editor"
        createdAt: new Date()
      });
    })
    .then(() => {
      alert("Usuario registrado correctamente");
      window.location.href = "index.html"; // volver al login
    })
    .catch((error) => {
      console.error(error);
      alert("Error: " + error.message);
    });
}
