const db = firebase.firestore();
const storage = firebase.storage();

function getShorterColumn() {
    const c1 = document.getElementById("col1");
    const c2 = document.getElementById("col2");
    return c1.offsetHeight <= c2.offsetHeight ? c1 : c2;
}

async function cargarImagenes() {
    const snap = await db.collection("galeria").orderBy("fecha", "desc").get();

    snap.forEach(doc => {
        mostrarImagen(doc.id, doc.data().url);
    });
}

function mostrarImagen(id, url) {
    const col = getShorterColumn();

    const caja = document.createElement("div");
    caja.className = "imagenCaja";

    const img = document.createElement("img");
    img.src = url;

    const btn = document.createElement("div");
    btn.className = "borrar";
    btn.innerHTML = "🗑";
    btn.onclick = () => eliminarImagen(id, url, caja);

    caja.appendChild(img);
    caja.appendChild(btn);
    col.appendChild(caja);
}

document.getElementById("fileInput").addEventListener("change", subirImagen);

async function subirImagen(e) {
    const archivo = e.target.files[0];
    if (!archivo) return;

    const ref = storage.ref("galeria/" + Date.now() + "_" + archivo.name);
    await ref.put(archivo);
    const url = await ref.getDownloadURL();

    const doc = await db.collection("galeria").add({
        url: url,
        fecha: Date.now()
    });

    mostrarImagen(doc.id, url);
}

async function eliminarImagen(id, url, elemento) {
    try {
        await db.collection("galeria").doc(id).delete();

        const ref = storage.refFromURL(url);
        await ref.delete();

        elemento.remove();
    } catch (error) {
        alert("Error al eliminar: " + error.message);
    }
}

cargarImagenes();
