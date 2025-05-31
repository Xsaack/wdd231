document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const detailsContainer = document.getElementById('applicationDetails');
    
    if (urlParams.size > 0) {
        let html = `
            <p><strong>Name:</strong> ${urlParams.get('firstName')} ${urlParams.get('lastName')}</p>
            <p><strong>Email:</strong> ${urlParams.get('email')}</p>
            <p><strong>Phone:</strong> ${urlParams.get('phone')}</p>
            <p><strong>Business Name:</strong> ${urlParams.get('businessName')}</p>
        `;
        
        if (urlParams.get('title')) {
            html += `<p><strong>Title:</strong> ${urlParams.get('title')}</p>`;
        }
        
        if (urlParams.get('description')) {
            html += `<p><strong>Business Description:</strong> ${urlParams.get('description')}</p>`;
        }
        
        // Format membership level
        let membership = 'NP Membership (Free)';
        switch(urlParams.get('membership')) {
            case 'bronze': membership = 'Bronze Membership ($200/year)'; break;
            case 'silver': membership = 'Silver Membership ($400/year)'; break;
            case 'gold': membership = 'Gold Membership ($600/year)'; break;
        }
        html += `<p><strong>Membership Level:</strong> ${membership}</p>`;
        
        // Format timestamp
        const timestamp = new Date(urlParams.get('timestamp'));
        html += `<p><strong>Application Date:</strong> ${timestamp.toLocaleDateString()} at ${timestamp.toLocaleTimeString()}</p>`;
        
        detailsContainer.innerHTML = html;
    } else {
        detailsContainer.innerHTML = '<p>No application details found. Please complete the join form.</p>';
    }
});