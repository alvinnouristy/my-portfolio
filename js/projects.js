document.addEventListener('DOMContentLoaded', () => {
  // Mencari tempat wadah grid di HTML
  const projectsGrid = document.getElementById('projectsGrid');
  
  // Jika wadahnya ditemukan dan main.js berhasil dimuat
  if (projectsGrid && window.portfolioUtils) {
    
    // Ambil data dari main.js
    const projects = window.portfolioUtils.getProjects();
    
    // Jika tidak ada project
    if (projects.length === 0) {
      projectsGrid.innerHTML = `
        <div style="text-align: center; grid-column: 1 / -1; padding: 3rem; color: #8b949e; background: #161b22; border: 1px solid #30363d; border-radius: 12px;">
          <h2>No projects available yet.</h2>
          <p>Projects will appear here once added.</p>
        </div>
      `;
      return;
    }

    // Jika ada project, buatkan tampilannya (Cards)
    projectsGrid.innerHTML = projects.map(project => `
      <div class="project-card" style="background: #161b22; border: 1px solid #30363d; border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; transition: transform 0.3s ease;">
        <div class="project-header">
          <span class="project-category" style="color: #58a6ff; font-size: 0.875rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">${project.category || 'General'}</span>
          <h3 class="project-title" style="color: #c9d1d9; font-size: 1.5rem; margin: 0.5rem 0;">${project.title}</h3>
        </div>
        
        <p class="project-description" style="color: #8b949e; line-height: 1.6; flex-grow: 1;">${project.description}</p>
        
        <div class="project-tags" style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
          ${(project.technologies || []).map(tech => `
            <span style="background: #21262d; color: #c9d1d9; padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.75rem; border: 1px solid #30363d;">${tech}</span>
          `).join('')}
        </div>

        <div class="project-footer" style="margin-top: auto;">
          <a href="project-detail.html?id=${project.id}" class="btn btn-primary" style="display: inline-block; width: 100%; text-align: center; background: #238636; color: white; padding: 0.6rem 1rem; border-radius: 6px; text-decoration: none; font-weight: 600; border: 1px solid rgba(240, 246, 252, 0.1);">
            View Details
          </a>
        </div>
      </div>
    `).join('');
  }
});