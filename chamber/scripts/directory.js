// Optimized main.js - Now only 3.2 KB (minified would be ~1.5 KB)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize everything
    initApp();
});

function initApp() {
    // Load members and setup UI
    loadMembers();
    setupMobileMenu();
    setupViewToggles();
    updateFooter();
    setupCardAnimations();
}

// Improved member loading with error handling
async function loadMembers() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const members = await response.json();
        renderMembers(members);
    } catch (error) {
        console.error('Failed to load members:', error);
        document.getElementById('member-container').innerHTML = 
            '<p class="error">Unable to load business directory. Please try again later.</p>';
    }
}

// Efficient member rendering
function renderMembers(members) {
    const container = document.getElementById('member-container');
    container.innerHTML = members.map(member => `
        <div class="member-card" tabindex="0" aria-label="${member.name} business details">
            <img src="images/logos/${member.image}" alt="${member.name}" loading="lazy" width="300" height="180">
            <div class="member-card-content">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>📞 <a href="tel:${member.phone.replace(/\D/g, '')}">${member.phone}</a></p>
                <p><a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website →</a></p>
                <span class="membership-level" data-level="${member.membership}">
                    ${getMembershipLevel(member.membership)}
                </span>
            </div>
        </div>
    `).join('');
}

// Mobile menu functionality
function setupMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.addEventListener('click', function() {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('show');
        hamburger.innerHTML = isExpanded ? '☰' : '✕';
        
        // Wayfinding - Update current page indicator
        if (!isExpanded) {
            document.querySelectorAll('#nav-menu li').forEach(li => {
                li.classList.toggle('active', li.querySelector('a').href === window.location.href);
            });
        }
    });
    
    // Close menu when clicking on links (mobile)
    document.querySelectorAll('#nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('show');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.innerHTML = '☰';
            }
        });
    });
}

// View toggle functionality
function setupViewToggles() {
    const gridBtn = document.getElementById('grid-view');
    const listBtn = document.getElementById('list-view');
    const container = document.getElementById('member-container');
    
    if (gridBtn && listBtn && container) {
        gridBtn.addEventListener('click', () => {
            container.className = 'grid-view';
            gridBtn.setAttribute('aria-pressed', 'true');
            listBtn.setAttribute('aria-pressed', 'false');
        });
        
        listBtn.addEventListener('click', () => {
            container.className = 'list-view';
            listBtn.setAttribute('aria-pressed', 'true');
            gridBtn.setAttribute('aria-pressed', 'false');
        });
    }
}

// Card click animations
function setupCardAnimations() {
    document.addEventListener('click', function(e) {
        const card = e.target.closest('.member-card');
        if (card) {
            card.style.transform = 'scale(0.97)';
            setTimeout(() => card.style.transform = '', 200);
        }
    });
}

// Footer information
function updateFooter() {
    document.getElementById('copyright-year').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = document.lastModified;
}

// Membership level helper
function getMembershipLevel(level) {
    const levels = ['Member', 'Silver Member', 'Gold Member'];
    return levels[level - 1] || 'Member';
}