// Set timestamp when form loads
document.addEventListener('DOMContentLoaded', function() {
    const now = new Date();
    document.getElementById('timestamp').value = now.toISOString();
    
    // Modal functionality
    const modalBtns = document.querySelectorAll('.info-btn');
    const modals = document.querySelectorAll('.modal');
    const closeBtns = document.querySelectorAll('.close-modal');
    
    modalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            document.getElementById(modalId).style.display = 'block';
        });
    });
    
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
    
    // Form validation
    const form = document.getElementById('joinForm');
    form.addEventListener('submit', function(e) {
        // Additional validation if needed
        if (!this.checkValidity()) {
            e.preventDefault();
            alert('Please fill out all required fields correctly.');
        }
    });
});