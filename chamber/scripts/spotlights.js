async function loadSpotlights() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();
        
        // Filter gold and silver members
        const qualifiedMembers = members.filter(member => 
            member.membership === 2 || member.membership === 3
        );
        
        // Randomly select 2-3 members
        const spotlights = [];
        const count = Math.min(3, Math.max(2, qualifiedMembers.length));
        
        while (spotlights.length < count && qualifiedMembers.length > 0) {
            const randomIndex = Math.floor(Math.random() * qualifiedMembers.length);
            spotlights.push(qualifiedMembers.splice(randomIndex, 1)[0]);
        }
        
        displaySpotlights(spotlights);
    } catch (error) {
        console.error('Error loading spotlights:', error);
        document.getElementById('spotlight-container').innerHTML = 
            '<p>Member spotlights unavailable</p>';
    }
}

function displaySpotlights(members) {
    const container = document.getElementById('spotlight-container');
    container.innerHTML = members.map(member => `
        <div class="spotlight-card">
            <img src="images/logos/${member.image}" alt="${member.name}" loading="lazy" width="200" height="120">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>📞 <a href="tel:${member.phone.replace(/\D/g, '')}">${member.phone}</a></p>
            <p><a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a></p>
            <p class="membership-level" data-level="${member.membership}">
                ${getMembershipLevel(member.membership)}
            </p>
        </div>
    `).join('');
}

function getMembershipLevel(level) {
    return level === 2 ? 'Silver Member' : 'Gold Member';
}

document.addEventListener('DOMContentLoaded', loadSpotlights);