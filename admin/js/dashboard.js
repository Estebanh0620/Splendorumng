firebase.auth().onAuthStateChanged(async user => {
    if (!user) {
        window.location.href = "index.html";
        return;
    }

    const userDoc = await firebase.firestore()
        .collection("usuarios")
        .doc(user.uid)
        .get();

    if (userDoc.exists) {
        document.getElementById("welcome").textContent =
            "Bienvenido, " + userDoc.data().name;
    } else {
        document.getElementById("welcome").textContent =
            "Bienvenido (usuario sin datos)";
    }
});

function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "index.html";
    });
}
