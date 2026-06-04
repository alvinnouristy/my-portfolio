// ===== Projects Page JavaScript =====

document.addEventListener('DOMContentLoaded', () => {
  const projectsGrid = document.getElementById('projectsGrid');
  
  if (projectsGrid) {
    renderProjects();
  }
});

function renderProjects() {
  const projectsGrid = document.getElementById('projectsGrid');
  const projects = window.portfolioUtils.getProjects();
  
  projectsGrid.innerHTML = projects.map(project => `
    <a href="project-detail.html?id=${project.id}" class="project-card">
      <div class="project-image" style="background: linear-gradient(135deg, var(--background-secondary), var(--card)); display: flex; align-items: center; justify-content: center;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="1" opacity="0.5">
          ${getProjectIcon(project.category)}
        </svg>
      </div>
      <div class="project-content">
        <span class="project-category">${project.category}</span>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-tech">
          ${project.technologies.slice(0, 4).map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
          ${project.technologies.length > 4 ? `<span class="tech-tag">+${project.technologies.length - 4}</span>` : ''}
        </div>
        <span class="project-link">
          View Details
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </span>
      </div>
    </a>
  `).join('');
}

function getProjectIcon(category) {
  const icons = {
    'IoT': '<path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><circle cx="12" cy="20" r="1"></circle>',
    'Automation': '<path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path>',
    'Circuit Design': '<rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="2" x2="9" y2="4"></line><line x1="15" y1="2" x2="15" y2="4"></line>',
    'SCADA': '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line>',
    'Embedded Systems': '<rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="2" x2="9" y2="4"></line><line x1="15" y1="20" x2="15" y2="22"></line>',
    'Power Electronics': '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>'
  };
  
  return icons[category] || icons['IoT'];
}
