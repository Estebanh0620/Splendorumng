document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("cookieBanner");
  const btn = document.getElementById("acceptCookies");

  // si ya aceptó, no mostrar
  if (localStorage.getItem("cookiesAceptadas") === "true") {
    banner.style.display = "none";
    return;
  }

  // aceptar cookies
  btn.addEventListener("click", () => {
    localStorage.setItem("cookiesAceptadas", "true");
    banner.style.display = "none";
  });
});
