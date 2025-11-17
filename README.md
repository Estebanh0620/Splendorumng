# Splendor Herbs (Splendorumng)

Sitio web estático para la empresa **Splendor Herbs**. Incluye páginas públicas, navegación con menús desplegables, catálogo interactivo de productos (hortalizas e hierbas aromáticas), formulario de contacto con *FormSubmit* y componentes compartidos (header/footer) cargados dinámicamente.

> **Repositorio previsto:** `Splendorumng` (el proyecto usa rutas absolutas `/Splendorumng/...` pensadas para GitHub Pages de un *project site*).

---

## 📸 Vista previa
- Portada (home): `img/Pagina index.png`  
  ![Home](img/Pagina%20index.png)

- Galería: `img/Pagina galeria.png`  
  ![Galería](img/Pagina%20galeria.png)

*(Asegúrate de que los nombres de archivo coincidan exactamente, incluidos espacios y mayúsculas.)*

---

## 🗂️ Estructura del proyecto

```
.
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── menus.js
├── html/
│   ├── header.html
│   ├── footer.html
│   ├── hortalizas.html
│   ├── hierbas .html
│   ├── galeria.html
│   ├── contacto.html
│   ├── gracias.html
│   ├── valores.html
│   ├── procesos.html
│   └── porquestn.html
└── img/
    ├── Logo Splendor Herbs.png
    ├── Pagina index.png
    ├── Pagina galeria.png
    └── … (imágenes de productos y recursos)
```

---

## 🚀 Tecnologías
- **HTML5** para el marcado.
- **CSS3** (archivo único `css/styles.css`) para estilos, componentes y *responsive*.
- **JavaScript Vanilla** para:
  - Carga dinámica de `html/header.html` y `html/footer.html` vía `fetch`.
  - Menús superpuestos y menú móvil (`js/menus.js`).
  - Catálogos con **tarjetas interactivas** en `html/hortalizas.html` y `html/hierbas .html`:
    - Clic en un *tile* → abre una ficha con imagen, variedad, origen, empaque y temperatura.
    - Botón **✕** para cerrar; clic fuera de la ficha también cierra.
    - Carga tolerante a JPG/PNG por nombre (`../img/{Producto}.jpg` o `.png`).

---

## 🧩 Componentes compartidos
- **Header**: `html/header.html`  
  Incluye logo, navegación con menús *overlay* y soporte móvil.
- **Footer**: `html/footer.html`  
  Datos de contacto/ubicaciones (pendientes de personalizar).
- **Inicialización**: en cada página se usa una función `loadHTML(...)` que:
  1) Incrusta `header.html` y después **inyecta** `js/menus.js`.  
  2) Incrusta `footer.html`.

> **Importante:** La carga de archivos locales con `fetch` **no funciona** desde `file://` por políticas del navegador. Debes usar un **servidor local** (ver abajo).

---

## 🧪 Ejecutar en local (2 opciones simples)

### Opción A — VS Code + Live Server (recomendada)
1. Abre el proyecto en **VS Code**.
2. Instala la extensión **Live Server** (Ritwick Dey).
3. Clic derecho sobre `index.html` → **Open with Live Server**.
4. Navega a `http://127.0.0.1:5500/Splendorumng/` (según tu ruta).

### Opción B — Servidor HTTP simple (Python 3)
```bash
# en la carpeta que contiene el proyecto
python -m http.server 5500
# luego visita:
# http://127.0.0.1:5500/Splendorumng/
```

---

## 📄 Licencia
**Este proyecto posee la licencia MIT.**
Se puede hacer uso, modificacion y distribucion del mismo citando los autores.  

---

## 👤 Autores
**Andres Vasquez** —est.andresm.vasquez@unimilitar.edu.co.

**Lizeth Castillo** -est.lizethj.castillo@unimilitar.edu.co.

**Esteban Hurtado** —est.estebanm.hurtado@unimilitar.edu.co.
