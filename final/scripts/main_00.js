document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.main-nav ul');
    const navLinks = document.querySelectorAll('.main-nav a');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', function() {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }
    
    // Testimonial Slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        const testimonials = document.querySelectorAll('.testimonial');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.slider-prev');
        const nextBtn = document.querySelector('.slider-next');
        let currentIndex = 0;
        let testimonialInterval;
        
        function showTestimonial(index) {
            testimonials.forEach(testimonial => testimonial.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            testimonials[index].classList.add('active');
            dots[index].classList.add('active');
            currentIndex = index;
        }
        
        function startAutoRotation() {
            testimonialInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % testimonials.length;
                showTestimonial(currentIndex);
            }, 5000);
        }
        
        if (dots.length) {
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => showTestimonial(index));
            });
        }
        
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
                showTestimonial(currentIndex);
            });
            
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % testimonials.length;
                showTestimonial(currentIndex);
            });
        }
        
        startAutoRotation();
        
        // Pause auto-rotation on hover
        testimonialSlider.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });
        
        testimonialSlider.addEventListener('mouseleave', startAutoRotation);
    }
    
    // Form submission
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        // quoteForm.addEventListener('submit', function(e) {
           // e.preventDefault();
            
           // const formData = {
           //     name: document.getElementById('name').value.trim(),
          //      email: document.getElementById('email').value.trim(),
          //      service: document.getElementById('service').value
           // };
            
          //  if (!formData.name || !formData.email) {
           //     alert('Please fill in all required fields.');
           //     return;
           // }
            
            // Basic email validation
           // if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
               // alert('Please enter a valid email address.');
               // return;
           // }
            
           // console.log('Form submitted:', formData);
           // alert(`Thank you, ${formData.name}! We've received your request for ${formData.service} service. We'll contact you shortly at ${formData.email}.`);
           // quoteForm.reset();
       // });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.main-header')?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // FAQ Accordion Functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    if (faqQuestions.length) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const item = question.parentElement;
                const answer = question.nextElementSibling;
                const icon = question.querySelector('i');
                
                // Toggle active class on item
                item.classList.toggle('active');
                
                // Toggle answer visibility
                if (item.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    icon?.classList.replace('fa-chevron-down', 'fa-chevron-up');
                } else {
                    answer.style.maxHeight = 0;
                    icon?.classList.replace('fa-chevron-up', 'fa-chevron-down');
                }
                
                // Close other open items
                faqQuestions.forEach(q => {
                    if (q !== question) {
                        const otherItem = q.parentElement;
                        const otherAnswer = q.nextElementSibling;
                        const otherIcon = q.querySelector('i');
                        otherItem.classList.remove('active');
                        otherAnswer.style.maxHeight = 0;
                        otherIcon?.classList.replace('fa-chevron-up', 'fa-chevron-down');
                    }
                });
            });
        });
    }
    
    if (categoryBtns.length) {
        // Filter by category
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                categoryBtns.forEach(button => button.classList.remove('active'));
                btn.classList.add('active');
                
                const category = btn.dataset.category;
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.style.display = (category === 'all' || item.dataset.category === category) 
                        ? 'block' 
                        : 'none';
                });
            });
        });
        
        // Initialize - show all general questions by default
        const generalBtn = document.querySelector('.category-btn[data-category="general"]');
        if (generalBtn) generalBtn.click();
    }
});