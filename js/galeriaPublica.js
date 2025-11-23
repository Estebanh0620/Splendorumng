const dbPublic = firebase.firestore();

const colPublic1 = document.getElementById("columna1");
const colPublic2 = document.getElementById("columna2");

function getShorterColumnPublic() {
  return (colPublic1.offsetHeight <= colPublic2.offsetHeight) ? colPublic1 : colPublic2;
}

function mostrarImagenPublic(url) {
  const col = getShorterColumnPublic();
  const img = document.createElement("img");
  img.src = url;
  img.alt = "Galería";
  img.loading = "lazy";
  img.style.width = "100%";
  img.style.display = "block";
  col.appendChild(img);
}

// Escuchar cambios en tiempo real (recomendado)
dbPublic.collection("galeria").orderBy("fecha", "desc")
  .onSnapshot(snapshot => {
    // vaciar columnas y volver a renderizar (sencillo y consistente)
    colPublic1.innerHTML = "";
    colPublic2.innerHTML = "";

    snapshot.forEach(doc => {
      const data = doc.data();
      if (data && data.url) {
        mostrarImagenPublic(data.url);
      }
    });
  }, err => {
    console.error("Error cargando galería pública:", err);
  });
