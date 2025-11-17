// Verifica si el usuario está logeado
firebase.auth().onAuthStateChanged(async user => {
    if (!user) {
        // Si no está logeado, enviar al login
        window.location.href = "index.html";
        return;
    }

    // Obtener más datos desde Firestore
    try {
        const userDoc = await firebase.firestore()
            .collection("users")
            .doc(user.uid)
            .get();

        if (userDoc.exists) {
            document.getElementById("welcome").textContent =
                "Bienvenido, " + userDoc.data().name;
        } else {
            document.getElementById("welcome").textContent =
                "Bienvenido (usuario sin datos guardados)";
        }
    } catch (error) {
        console.error("Error obteniendo datos del usuario:", error);
        document.getElementById("welcome").textContent =
            "Bienvenido (error al cargar datos)";
    }
});

// Cerrar sesión
function logout() {
    firebase.auth().signOut()
        .then(() => {
            window.location.href = "index.html";
        })
        .catch(error => {
            alert("Error al cerrar sesión: " + error.message);
        });
}
