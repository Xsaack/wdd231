// main.js - Entry point
import { loadTrails } from './modules/trailData.js';
import { setupModal } from './modules/modal.js';
import { setupNav } from './modules/nav.js';

document.addEventListener('DOMContentLoaded', () => {
  loadTrails();
  setupModal();
  setupNav();
});
