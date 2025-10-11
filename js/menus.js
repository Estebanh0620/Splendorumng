const toggles = document.querySelectorAll(".menu-toggle");

toggles.forEach(toggle => {
  toggle.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation(); // evita que el clic cierre el menú

    const parent = toggle.closest(".overlay");

    // Cierra los otros menús
    document.querySelectorAll(".overlay").forEach(item => {
      if (item !== parent) item.classList.remove("active");
    });

    // Alterna el menú actual
    parent.classList.toggle("active");
  });
});

// Cierra los menús al hacer clic fuera
document.addEventListener("click", (e) => {
  if (!e.target.closest(".overlay")) {
    document.querySelectorAll(".overlay").forEach(item => item.classList.remove("active"));
  }
});

