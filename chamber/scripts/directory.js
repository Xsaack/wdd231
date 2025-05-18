// Fetch member data and display
async function getMembers() {
    try {
        const response = await fetch('data/members.json');
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.error('Error loading member data:', error);
    }
}

// Display members in grid or list view
function displayMembers(members) {
    const container = document.getElementById('member-container');
    container.innerHTML = '';

    members.forEach(member => {
        const card = document.createElement('div');
        card.className = 'member-card';
        
        card.innerHTML = `
            <img src="images/logos/${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>📞 ${member.phone}</p>
            <p><a href="${member.website}" target="_blank">Visit Website</a></p>
            <p class="membership-level">${getMembershipLevel(member.membership)}</p>
        `;
        container.appendChild(card);
    });
}

// Toggle between grid and list view
document.getElementById('grid-view').addEventListener('click', () => {
    document.getElementById('member-container').className = 'grid-view';
});

document.getElementById('list-view').addEventListener('click', () => {
    document.getElementById('member-container').className = 'list-view';
});

// Helper function to get membership level
function getMembershipLevel(level) {
    switch(level) {
        case 1: return 'Member';
        case 2: return 'Silver Member';
        case 3: return 'Gold Member';
        default: return 'Member';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    getMembers();
    document.getElementById('copyright-year').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = document.lastModified;
});

// Add click animation to cards
document.addEventListener('DOMContentLoaded', () => {
    getMembers();
    
    // Click animation
    document.addEventListener('click', (e) => {
        if (e.target.closest('.member-card')) {
            const card = e.target.closest('.member-card');
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = '';
            }, 200);
        }
    });
});

// In your displayMembers function:
card.innerHTML = `
    <img src="images/logos/${member.image}" alt="${member.name}">
    <div class="member-card-content">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>📞 ${member.phone}</p>
        <p><a href="${member.website}" target="_blank">Visit Website →</a></p>
        <span class="membership-level" data-level="${member.membership}">
            ${getMembershipLevel(member.membership)}
        </span>
    </div>
`;

// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('show');
        
        // Change hamburger icon
        if (navMenu.classList.contains('show')) {
            hamburger.innerHTML = '✕';
            hamburger.style.fontSize = '1.8rem';
        } else {
            hamburger.innerHTML = '☰';
            hamburger.style.fontSize = '2rem';
        }
    });
    
    // Close menu when clicking on a link (mobile)
    document.querySelectorAll('#nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('show');
                hamburger.innerHTML = '☰';
                hamburger.style.fontSize = '2rem';
            }
        });
    });
});