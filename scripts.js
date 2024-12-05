const projectsData = [
    { id: 1, category: "web", title: "Web Development Project 1", description: "Advanced Animated Portfolio.", image: "project1.jpg" },
    { id: 2, category: "agro", title: "agriculture Project 1", description: "Farm management system.", image: "project2.jpg" },
    { id: 3, category: "dev", title: "software development Project 1", description: "Finance Tracker project.", image: "project3.jpg" },
    { id: 4, category: "web", title: "Web Development Project 2", description: "Task management App.", image: "project4.jpg" },
    { id: 5, category: "agro", title: "agriculture  Project 2", description: "Agri-Fintech Platform.", image: "project5.jpg" },
    { id: 6, category: "dev", title: "software development 2", description: "E-commerce project.", image: "project6.jpg" },
    { id: 7, category: "web", title: "Web Development Project 3", description: "Job Portal Website (Advanced).", image: "project7.jpg" },
    { id: 8, category: "agro", title: "agriculture Project 3", description: "Farm Equipment Maintenance Tracker.", image: "project8.jpg" },
    { id: 9, category: "dev", title: "software development Project 3", description: "Inventory Management system .", image: "project9.jpg" },
];

let currentPage = 1;
const projectsPerPage = 9;
const filterBtns = document.querySelectorAll('.filter-btn');
const projectContainer = document.getElementById('project-container');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function renderProjects(page = 1, filter = 'all') {
    const startIndex = (page - 1) * projectsPerPage;
    const endIndex = startIndex + projectsPerPage;

    const filteredProjects = projectsData.filter(project => filter === 'all' || project.category === filter);
    const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

    projectContainer.innerHTML = '';
    paginatedProjects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project-item', project.category);
        projectElement.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
        `;
        projectContainer.appendChild(projectElement);
    });

    // Adding fade-in animation
    setTimeout(() => {
        projectContainer.style.opacity = '1';
        document.querySelectorAll('.project-item').forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 150); // Stagger the fade-in animation
        });
    }, 100);

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage * projectsPerPage >= filteredProjects.length;
}

function setupPagination() {
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderProjects(currentPage, getActiveFilter());
        }
    });

    nextBtn.addEventListener('click', () => {
        currentPage++;
        renderProjects(currentPage, getActiveFilter());
    });
}

function getActiveFilter() {
    return document.querySelector('.filter-btn.active').dataset.filter;
}

filterBtns.forEach(button => {
    button.addEventListener('click', () => {
        filterBtns.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentPage = 1;
        renderProjects(currentPage, button.dataset.filter);
    });
});

// Initial render
renderProjects(currentPage, 'all');
setupPagination();