// js/galeriaPublica.js

const colPub1 = document.getElementById('columna1');
const colPub2 = document.getElementById('columna2');

db.collection('galeria')
  .orderBy('createdAt', 'desc')
  .onSnapshot((snapshot) => {
    colPub1.innerHTML = '';
    colPub2.innerHTML = '';
    let index = 0;

    snapshot.forEach((doc) => {
      const data = doc.data();
      if (!data.url) return;

      const card = document.createElement('div');
      card.className = 'item-galeria-publica';

      const img = document.createElement('img');
      img.src = data.url;
      img.alt = 'Imagen de la galería';

      card.appendChild(img);

      if (index % 2 === 0) {
        colPub1.appendChild(card);
      } else {
        colPub2.appendChild(card);
      }
      index++;
    });
  });
