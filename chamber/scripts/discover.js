const grid = document.getElementById("discover-grid");
const visitMessage = document.getElementById("visit-message");

async function loadData() {
  const response = await fetch("data/attractions.json");
  const data = await response.json();

  data.attractions.forEach((place, i) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <h2>${place.name}</h2>
      <figure>
        <img src="${place.image}" alt="${place.name}" loading="lazy" width="300" height="200" />
      </figure>
      <address>${place.address}</address>
      <p>${place.description}</p>
      <button>Learn More</button>
    `;

    grid.appendChild(card);
  });
}

function checkLastVisit() {
  const lastVisit = localStorage.getItem("lastVisit");
  const now = Date.now();

  if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const daysPassed = Math.floor((now - Number(lastVisit)) / (1000 * 60 * 60 * 24));
    if (daysPassed < 1) {
      visitMessage.textContent = "Back so soon! Awesome!";
    } else {
      visitMessage.textContent = `You last visited ${daysPassed} day${daysPassed === 1 ? '' : 's'} ago.`;
    }
  }

  localStorage.setItem("lastVisit", now);
}

document.addEventListener("DOMContentLoaded", () => {
  loadData();
  checkLastVisit();
});
