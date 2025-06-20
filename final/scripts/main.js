// main.js (ES Modules)
import { fetchServices } from './modules/data.js';
import { renderServices } from './modules/render.js';
import { setupModal } from './modules/modal.js';
import { savePreferredCategory, getPreferredCategory } from './modules/storage.js';

document.addEventListener('DOMContentLoaded', async () => {
  // Mobile Nav
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.main-nav ul');
  const navLinks = document.querySelectorAll('.main-nav a');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = document.querySelector('.main-header')?.offsetHeight || 0;
        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      }
    });
  });

  // FAQ Toggle
  const faqItems = document.querySelectorAll('.faq-question');
  faqItems.forEach(q => q.addEventListener('click', () => {
    const item = q.parentElement;
    const answer = q.nextElementSibling;
    const icon = q.querySelector('i');
    item.classList.toggle('active');
    answer.style.maxHeight = item.classList.contains('active') ? answer.scrollHeight + 'px' : '0';
    icon?.classList.toggle('fa-chevron-up');
    icon?.classList.toggle('fa-chevron-down');
  }));

  // Category Filter + localStorage
  const categoryBtns = document.querySelectorAll('.category-btn');
  const preferred = getPreferredCategory();
  categoryBtns.forEach(btn => {
    if (btn.dataset.category === preferred) btn.classList.add('active');
    btn.addEventListener('click', () => {
      categoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      savePreferredCategory(btn.dataset.category);
      document.querySelectorAll('.faq-item').forEach(item => {
        item.style.display = (btn.dataset.category === 'all' || item.dataset.category === btn.dataset.category) ? 'block' : 'none';
      });
    });
  });
  document.querySelector(`.category-btn[data-category="${preferred}"]`)?.click();

  // Render Services from JSON
  const services = await fetchServices();
  renderServices(services);

  // Setup modal
  setupModal();
});
