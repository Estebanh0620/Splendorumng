document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("cookieBanner");
  const btn = document.getElementById("acceptCookies");

  if (!banner || !btn) {
    console.error("No se encontró el banner o el botón de cookies.");
    return;
  }

  // Si ya aceptó, ocultar banner
  if (localStorage.getItem("cookiesAceptadas") === "true") {
    banner.style.display = "none";
    return;
  }

  // Aceptar cookies
  btn.addEventListener("click", () => {
    localStorage.setItem("cookiesAceptadas", "true");
    banner.style.display = "none";
  });
});

