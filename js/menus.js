document.addEventListener("DOMContentLoaded", () => {
  const toggles = document.querySelectorAll(".menu-toggle");

  toggles.forEach(toggle => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation(); // 🔒 evita que el clic se propague al document

      const parent = toggle.closest(".overlay");

      // Cierra los otros menús antes de abrir uno nuevo
      document.querySelectorAll(".overlay").forEach(item => {
        if (item !== parent) item.classList.remove("active");
      });

      // Alterna el menú del clic actual
      parent.classList.toggle("active");
    });
  });

  // Cierra los menús al hacer clic fuera
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".overlay")) {
      document.querySelectorAll(".overlay").forEach(item => item.classList.remove("active"));
    }
  });
});


