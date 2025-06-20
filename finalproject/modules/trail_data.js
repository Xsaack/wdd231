// modules/trailData.js
export async function loadTrails() {
  try {
    const response = await fetch('data/trails.json');
    if (!response.ok) throw new Error('Network response was not ok');
    const trails = await response.json();
    const container = document.querySelector('#trailCards');
    trails.forEach(trail => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <h3>${trail.name}</h3>
        <p><strong>Location:</strong> ${trail.location}</p>
        <p><strong>Difficulty:</strong> ${trail.difficulty}</p>
        <p><strong>Distance:</strong> ${trail.distance} miles</p>
        <p><strong>Type:</strong> ${trail.type}</p>
      `;
      card.addEventListener('click', () => {
        localStorage.setItem('selectedTrail', JSON.stringify(trail));
        const modal = document.querySelector('#trailModal');
        const content = modal.querySelector('.modal-content');
        content.innerHTML = `
          <button id="closeModal">X</button>
          <h3>${trail.name}</h3>
          <p>${trail.description}</p>
        `;
        modal.showModal();
      });
      container.appendChild(card);
    });
  } catch (error) {
    console.error('Failed to fetch trails:', error);
  }
}
