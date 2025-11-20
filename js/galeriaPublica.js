const db = firebase.firestore();

// balanceo de columnas (se llena la menos alta)
function getShorterColumn() {
    const col1 = document.getElementById("columna1");
    const col2 = document.getElementById("columna2");

    return col1.offsetHeight <= col2.offsetHeight ? col1 : col2;
}

async function cargarGaleria() {
    const snap = await db.collection("galeria")
        .orderBy("fecha", "desc") // últimas primero
        .get();

    snap.forEach(doc => {
        const data = doc.data();
        const img = document.createElement("img");
        img.src = data.url;
        img.alt = "imagen galeria";

        const colDestino = getShorterColumn();
        colDestino.appendChild(img);
    });
}

cargarGaleria();
