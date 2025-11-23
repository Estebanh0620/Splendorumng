const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

// Comprueba autenticación (solo admins pueden usar esta página)
auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "index.html"; // redirige al login si no está autenticado
  }
});

// Referencias DOM
const fileInput = document.getElementById("fileInput");
const col1 = document.getElementById("col1");
const col2 = document.getElementById("col2");

// Helper: columna con menor altura (para balancear)
function getShorterColumnForAdmin() {
  return (col1.offsetHeight <= col2.offsetHeight) ? col1 : col2;
}

// Mostrar una imagen en el admin con botón borrar
function mostrarImagenAdmin(docId, url) {
  const col = getShorterColumnForAdmin();

  const caja = document.createElement("div");
  caja.className = "imagenCaja";

  const img = document.createElement("img");
  img.src = url;
  img.alt = "Imagen galería";

  const btn = document.createElement("div");
  btn.className = "borrar";
  btn.title = "Eliminar imagen";
  btn.innerText = "🗑";
  btn.addEventListener("click", () => {
    if (!confirm("¿Eliminar esta imagen?")) return;
    eliminarImagen(docId, url, caja);
  });

  caja.appendChild(img);
  caja.appendChild(btn);
  col.appendChild(caja);
}

// Cargar imágenes desde Firestore y mostrarlas
async function cargarImagenesAdmin() {
  col1.innerHTML = "";
  col2.innerHTML = "";

  const snap = await db.collection("galeria").orderBy("fecha", "desc").get();
  snap.forEach(doc => {
    const data = doc.data();
    mostrarImagenAdmin(doc.id, data.url);
  });
}

// Subir imagen seleccionada
fileInput.addEventListener("change", async (e) => {
  const archivo = e.target.files[0];
  if (!archivo) return;
  try {
    // mostrar estado de subida (opcional)
    const fileName = `galeria/${Date.now()}_${archivo.name}`;
    const ref = storage.ref().child(fileName);

    const uploadTask = ref.put(archivo);

    // Muestra progreso (opcional)
    const progresoModal = document.createElement("div");
    progresoModal.style = "position:fixed;left:50%;top:20px;transform:translateX(-50%);background:#fff;padding:8px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,.2);z-index:9999";
    progresoModal.innerText = "Subiendo imagen... 0%";
    document.body.appendChild(progresoModal);

    uploadTask.on('state_changed', snapshot => {
      const pct = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      progresoModal.innerText = `Subiendo imagen... ${pct}%`;
    });

    // Esperar a completar
    await uploadTask;
    const url = await ref.getDownloadURL();

    // Guardar documento en Firestore
    const docRef = await db.collection("galeria").add({
      url: url,
      fecha: firebase.firestore.FieldValue.serverTimestamp()
    });

    // Mostrar en la UI (sin recargar)
    mostrarImagenAdmin(docRef.id, url);

    // limpiar input y remover modal
    fileInput.value = "";
    progresoModal.remove();

  } catch (error) {
    alert("Error al subir: " + error.message);
    console.error(error);
  }
});

// Eliminar imagen: borrar doc de Firestore y archivo en Storage
async function eliminarImagen(docId, url, elementoDOM) {
  try {
    // borrar documento
    await db.collection("galeria").doc(docId).delete();

    // borrar archivo en storage -> usar refFromURL
    const ref = storage.refFromURL(url);
    await ref.delete();

    // quitar del DOM
    if (elementoDOM && elementoDOM.remove) elementoDOM.remove();
  } catch (error) {
    alert("Error al eliminar: " + error.message);
    console.error(error);
  }
}

// Inicializar
cargarImagenesAdmin();
