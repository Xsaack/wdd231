document.addEventListener('DOMContentLoaded', function() {
    const courses = [
        { code: "WDD131", name: "Dynamic Web Fundamentals", credits: 3, completed: true },
        { code: "WDD230", name: "Web Frontend Development I", credits: 3, completed: true },
        { code: "WDD231", name: "Web Frontend Development II", credits: 3, completed: false },
        { code: "WDD330", name: "Web Frontend Development II", credits: 3, completed: false },
        { code: "WDD430", name: "Web Full-Stack Development", credits: 3, completed: false },
        { code: "CSE121B", name: "JavaScript Language", credits: 2, completed: true },
        { code: "CSE121C", name: "JavaScript Language", credits: 2, completed: false },
        { code: "CSE210", name: "Programming with Classes", credits: 2, completed: false }
    ];
    
    const courseCards = document.getElementById('course-cards');
    const creditTotal = document.getElementById('credits');
    
    function displayCourses(filter = 'all') {
        let filteredCourses = [];
        
        switch(filter) {
            case 'wdd':
                filteredCourses = courses.filter(course => course.code.startsWith('WDD'));
                break;
            case 'cse':
                filteredCourses = courses.filter(course => course.code.startsWith('CSE'));
                break;
            default:
                filteredCourses = [...courses];
        }
        
        courseCards.innerHTML = '';
        let totalCredits = 0;
        
        filteredCourses.forEach(course => {
            const card = document.createElement('div');
            card.className = `course-card ${course.completed ? 'completed' : ''}`;
            
            card.innerHTML = `
                <h3>${course.code}</h3>
                <p>${course.name}</p>
                <p>Credits: ${course.credits}</p>
                <p>Status: ${course.completed ? 'Completed' : 'In Progress'}</p>
            `;
            
            courseCards.appendChild(card);
            totalCredits += course.credits;
        });
        
        creditTotal.textContent = totalCredits;
    }
    
    // Initial display
    displayCourses();
    
    // Event listeners for filter buttons
    document.getElementById('all-courses').addEventListener('click', () => displayCourses('all'));
    document.getElementById('wdd-courses').addEventListener('click', () => displayCourses('wdd'));
    document.getElementById('cse-courses').addEventListener('click', () => displayCourses('cse'));
});