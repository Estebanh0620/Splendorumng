// js/admin_galeria.js

const fileInput = document.getElementById('fileInput');
const statusDiv = document.getElementById('status');
const col1 = document.getElementById('col1');
const col2 = document.getElementById('col2');

function mostrarEstado(texto, esError = false) {
  statusDiv.textContent = texto;
  statusDiv.style.color = esError ? 'red' : '#333';
}

// Cuando el admin selecciona un archivo
fileInput.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  try {
    mostrarEstado('Subiendo imagen...');

    // Carpeta "galeria" en Firebase Storage
    const nombreArchivo = `${Date.now()}_${file.name}`;
    const storagePath = `galeria/${nombreArchivo}`;
    const storageRef = storage.ref(storagePath);

    // 1. Subir a Storage
    await storageRef.put(file);

    // 2. Obtener URL pública
    const url = await storageRef.getDownloadURL();

    // 3. Guardar en Firestore (colección "galeria")
    await db.collection('galeria').add({
      url: url,
      storagePath: storagePath,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    mostrarEstado('Imagen subida correctamente ✅');
    fileInput.value = ''; // limpiar input
  } catch (error) {
    console.error(error);
    mostrarEstado('Error al subir la imagen: ' + error.message, true);
  }
});

// Escuchar en tiempo real las imágenes de la colección "galeria"
db.collection('galeria')
  .orderBy('createdAt', 'desc')
  .onSnapshot((snapshot) => {
    col1.innerHTML = '';
    col2.innerHTML = '';
    let index = 0;

    snapshot.forEach((doc) => {
      const data = doc.data();
      if (!data.url) return;

      const card = document.createElement('div');
      card.className = 'item-galeria-admin';

      const img = document.createElement('img');
      img.src = data.url;
      img.alt = 'Imagen galería';

      const btnEliminar = document.createElement('button');
      btnEliminar.textContent = 'Eliminar';
      btnEliminar.className = 'btnEliminar';
      btnEliminar.addEventListener('click', () => {
        eliminarImagen(doc.id, data.storagePath);
      });

      card.appendChild(img);
      card.appendChild(btnEliminar);

      if (index % 2 === 0) {
        col1.appendChild(card);
      } else {
        col2.appendChild(card);
      }
      index++;
    });
  });

async function eliminarImagen(docId, storagePath) {
  const confirmar = confirm('¿Eliminar esta imagen de la galería?');
  if (!confirmar) return;

  try {
    // 1. Borrar documento de Firestore
    await db.collection('galeria').doc(docId).delete();

    // 2. Borrar archivo de Storage
    if (storagePath) {
      await storage.ref(storagePath).delete();
    }

    mostrarEstado('Imagen eliminada 🗑️');
  } catch (error) {
    console.error(error);
    mostrarEstado('Error al eliminar: ' + error.message, true);
  }
}
