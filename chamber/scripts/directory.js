// Fetch members data and display
async function getMembers() {
    try {
        const response = await fetch('data/members.json');
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.error('Error loading members:', error);
    }
}

// Display members in grid or list view
function displayMembers(members) {
    const container = document.getElementById('member-container');
    container.innerHTML = '';

    members.forEach(member => {
        const card = document.createElement('div');
        card.className = container.classList.contains('grid-view') ? 'member-card' : 'member-list-item';

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>Tel: ${member.phone}</p>
            <a href="${member.website}" target="_blank">Visitar sitio</a>
            <p class="membership-level">Membresía: ${getMembershipLevel(member.membership)}</p>
        `;
        container.appendChild(card);
    });
}

// Helper function for membership level
function getMembershipLevel(level) {
    const levels = {1: 'Básica', 2: 'Silver', 3: 'Gold'};
    return levels[level] || 'Básica';
}

// Toggle between grid and list view
document.getElementById('grid-view').addEventListener('click', () => {
    const container = document.getElementById('member-container');
    container.classList.remove('list-view');
    container.classList.add('grid-view');
    getMembers(); // Refresh display
});

document.getElementById('list-view').addEventListener('click', () => {
    const container = document.getElementById('member-container');
    container.classList.remove('grid-view');
    container.classList.add('list-view');
    getMembers(); // Refresh display
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    getMembers();
    document.getElementById('current-year').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = document.lastModified;
});