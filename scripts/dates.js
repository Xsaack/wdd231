document.addEventListener('DOMContentLoaded', function() {
    // Current year
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;
    
    // Last modified date
    document.getElementById('lastModified').textContent += document.lastModified;
});