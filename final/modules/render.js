// modules/render.js
export function renderServices(services) {
  const container = document.getElementById('dynamic-services');
  if (!container) return;

  container.innerHTML = services.map(service => `
    <div class="service-card">
      <h3>${service.name}</h3>
      <p>${service.description}</p>
      <ul>
        <li><strong>Price:</strong> ${service.price}</li>
        <li><strong>Duration:</strong> ${service.duration}</li>
      </ul>
      <button class="btn btn-secondary" data-service='${JSON.stringify(service)}'>Details</button>
    </div>
  `).join('');
}
