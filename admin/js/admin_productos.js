console.log("Admin productos cargado");

// Configuración Firebase
var firebaseConfig = {
  apiKey: "AIzaSyDg47slMZt3RvZULEJi0CnHmGWYfyDpa0A",
  authDomain: "splendorherbs-admin.firebaseapp.com",
  projectId: "splendorherbs-admin",
  storageBucket: "splendorherbs-admin.firebasestorage.app",
  messagingSenderId: "550979088160",
  appId: "1:550979088160:web:fd0f9af671d06fe286b145"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// ============== SEED POR DEFECTO ==============
const FICHAS_DEFAULT = [];

function cargarFichas() {
  const guardadas = localStorage.getItem("fichasProductos");
  if (guardadas) {
    try {
      return JSON.parse(guardadas);
    } catch (e) {
      console.error("Error leyendo fichas:", e);
    }
  }
  return FICHAS_DEFAULT;
}

let fichas = cargarFichas();

function guardarFichas() {
  localStorage.setItem("fichasProductos", JSON.stringify(fichas));
}

function renderFichas() {
  const listaH = document.getElementById("lista-hortalizas");
  const listaA = document.getElementById("lista-aromaticas");

  listaH.innerHTML = "";
  listaA.innerHTML = "";

  fichas.filter(f => f.categoria === "Hortalizas frescas").forEach(f => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <div class="prod-main">${f.nombre}</div>
        <div class="prod-sub">Variedad: ${f.variedad}</div>
      </div>
      <div class="actions">
        <button class="btn-danger-outline" onclick="eliminarFicha(${f.id})">Eliminar</button>
      </div>
    `;
    listaH.appendChild(li);
  });

  fichas.filter(f => f.categoria === "Hierbas aromáticas").forEach(f => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <div class="prod-main">${f.nombre}</div>
        <div class="prod-sub">Variedad: ${f.variedad}</div>
      </div>
      <div class="actions">
        <button class="btn-danger-outline" onclick="eliminarFicha(${f.id})">Eliminar</button>
      </div>
    `;
    listaA.appendChild(li);
  });
}

function eliminarFicha(id) {
  if (!confirm("¿Eliminar este producto y su ficha?")) return;
  fichas = fichas.filter(f => f.id !== id);
  guardarFichas();
  renderFichas();
}

const formAgregar = document.getElementById("formAgregar");
const btnGuardar = document.getElementById("btnGuardar");
const estadoSubida = document.getElementById("estadoSubida");

function setEstado(texto) {
  estadoSubida.textContent = texto || "";
}

function finalizarGuardado(ficha) {
  fichas.push(ficha);
  guardarFichas();
  renderFichas();
  formAgregar.reset();
  document.getElementById("productoId").value = "";
  setEstado("Producto guardado correctamente.");
  btnGuardar.disabled = false;
  btnGuardar.textContent = "Guardar producto";
}

formAgregar.addEventListener("submit", function(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombreProducto").value.trim();
  const categoria = document.getElementById("categoriaProducto").value;
  const descripcion = document.getElementById("descripcionProducto").value.trim();
  const variedad = document.getElementById("variedadProducto").value.trim();
  const origen = document.getElementById("origenProducto").value.trim();
  const empaque = document.getElementById("empaqueProducto").value.trim();
  const temperatura = document.getElementById("temperaturaProducto").value.trim();
  const fileInput = document.getElementById("imagenProducto");
  const file = fileInput.files[0];

  if (!nombre || !descripcion || !variedad || !origen || !empaque || !temperatura) {
    alert("Por favor completa todos los campos.");
    return;
  }

  const nuevaFicha = {
    id: Date.now(),
    nombre,
    categoria,
    descripcion,
    variedad,
    origen,
    empaque,
    temperatura,
    imagenUrl: ""
  };

  btnGuardar.disabled = true;
  btnGuardar.textContent = "Guardando...";
  setEstado("");

  if (!file) {
    finalizarGuardado(nuevaFicha);
    return;
  }

  const storageRef = firebase.storage().ref();
  const ruta = `productos/${Date.now()}_${file.name}`;
  const uploadTask = storageRef.child(ruta).put(file);

  uploadTask.on(
    "state_changed",
    snapshot => {
      const pct = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      setEstado(`Subiendo imagen... ${pct}%`);
    },
    error => {
      alert("Error subiendo imagen: " + error.message);
      finalizarGuardado(nuevaFicha);
    },
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then(url => {
        nuevaFicha.imagenUrl = url;
        finalizarGuardado(nuevaFicha);
      });
    }
  );
});

renderFichas();
