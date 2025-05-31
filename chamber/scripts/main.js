document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('copyright-year').textContent = new Date().getFullYear();
      
    const lastModified = document.lastModified;
    document.getElementById('last-modified').textContent = lastModified;
 });