// modules/modal.js
export function setupModal() {
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modal-content');
  const closeBtn = document.getElementById('modal-close');

  if (!modal || !modalContent || !closeBtn) return;

  document.body.addEventListener('click', e => {
    if (e.target.matches('[data-service]')) {
      const service = JSON.parse(e.target.getAttribute('data-service'));
      modalContent.innerHTML = `
        <h2>${service.name}</h2>
        <p>${service.description}</p>
        <p><strong>Price:</strong> ${service.price}</p>
        <p><strong>Duration:</strong> ${service.duration}</p>
      `;
      modal.classList.add('open');
    }
  });

  closeBtn.addEventListener('click', () => modal.classList.remove('open'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
  });
}
