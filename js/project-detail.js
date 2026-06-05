document.addEventListener('DOMContentLoaded', () => {
  const contentArea = document.getElementById('projectDetailContent');
  
  if (!contentArea || !window.portfolioUtils) {
    if (contentArea) {
      contentArea.innerHTML = '<div class="container" style="text-align: center; padding: 5rem 0; color: #ff7b72;"><h2>Error Loading Data</h2><p>Pastikan file main.js termuat dengan benar.</p></div>';
    }
    return;
  }

  // 1. Ambil ID Project dari URL (contoh: ?id=1)
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id');

  // 2. Cari data project berdasarkan ID tersebut
  const projects = window.portfolioUtils.getProjects();
  const project = projects.find(p => p.id === projectId);

  // 3. Jika ID tidak ditemukan (URL salah / project dihapus)
  if (!project) {
    contentArea.innerHTML = `
      <div class="container" style="text-align: center; padding: 8rem 0;">
        <h2 style="color: #c9d1d9; font-size: 2.5rem;">Project Not Found</h2>
        <p style="color: #8b949e; margin-bottom: 2rem;">The project you are looking for does not exist.</p>
        <a href="projects.html" class="btn btn-primary" style="background: #238636; color: white; padding: 0.8rem 1.5rem; border-radius: 6px; text-decoration: none;">Back to Projects</a>
      </div>
    `;
    return;
  }

  // 4. Jika ditemukan, gambar tampilan detail projectnya
  contentArea.innerHTML = `
    <section class="page-hero" style="padding-bottom: 2rem;">
      <div class="container">
        <a href="projects.html" class="back-link" style="display: inline-flex; align-items: center; gap: 0.5rem; color: #58a6ff; text-decoration: none; margin-bottom: 2rem; font-weight: 500;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Projects
        </a>
        <br>
        <span style="color: #58a6ff; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">${project.category || 'General'}</span>
        <h1 class="page-title" style="margin-top: 0.5rem; font-size: 2.5rem; color: #c9d1d9;">${project.title}</h1>
      </div>
    </section>

    <section class="project-details" style="padding: 2rem 0 5rem 0;">
      <div class="container">
        <div style="background: #161b22; border: 1px solid #30363d; border-radius: 12px; padding: 2.5rem; max-width: 800px; margin: 0 auto; box-shadow: 0 8px 24px rgba(0,0,0,0.2);">
          <h3 style="color: #c9d1d9; margin-bottom: 1rem; font-size: 1.5rem;">Project Overview</h3>
          <p style="color: #8b949e; line-height: 1.8; margin-bottom: 2.5rem; font-size: 1.1rem;">${project.description}</p>
          
          <h3 style="color: #c9d1d9; margin-bottom: 1rem; font-size: 1.5rem;">Technologies Used</h3>
          <div style="display: flex; gap: 0.8rem; flex-wrap: wrap;">
            ${(project.technologies || []).map(tech => `
              <span style="background: #21262d; color: #c9d1d9; padding: 0.6rem 1.2rem; border-radius: 999px; font-size: 0.95rem; border: 1px solid #30363d;">${tech}</span>
            `).join('')}
          </div>
        </div>
      </div>
    </section>
  `;
});