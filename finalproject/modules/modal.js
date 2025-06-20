// modules/modal.js
export function setupModal() {
  const modal = document.querySelector('#trailModal');
  document.addEventListener('click', function (e) {
    if (e.target && e.target.id === 'closeModal') {
      modal.close();
    }
  });
}
