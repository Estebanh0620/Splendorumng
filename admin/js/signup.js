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
        role: "admin", // o lo que quieras
        createdAt: new Date()
      });
    })
    .then(() => {
      alert("Usuario registrado correctamente");

      // Redirección al login
      window.location.href = "index.html";
    })
    .catch((error) => {
  console.error("Firebase ERROR CODE:", error.code);
  console.error("Firebase ERROR MESSAGE:", error.message);
  alert("Error: " + error.message);
});
}
