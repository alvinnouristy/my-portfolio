// ===== Project Detail Page JavaScript =====

document.addEventListener('DOMContentLoaded', () => {
  const projectDetailContent = document.getElementById('projectDetailContent');
  
  if (projectDetailContent) {
    loadProjectDetail();
  }
});

function loadProjectDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id');
  
  if (!projectId) {
    showNotFound();
    return;
  }
  
  const project = window.portfolioUtils.getProjectById(projectId);
  
  if (!project) {
    showNotFound();
    return;
  }
  
  // Update page title
  document.title = `${project.title} | Alvin Nouristy`;
  
  renderProjectDetail(project);
}

function showNotFound() {
  const projectDetailContent = document.getElementById('projectDetailContent');
  projectDetailContent.innerHTML = `
    <section class="page-hero">
      <div class="hero-bg">
        <div class="circuit-grid"></div>
      </div>
      <div class="container">
        <a href="projects.html" class="back-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Projects
        </a>
        <h1 class="page-title">Project Not Found</h1>
        <p class="page-description">The project you are looking for does not exist or has been removed.</p>
      </div>
    </section>
  `;
}

function renderProjectDetail(project) {
  const projectDetailContent = document.getElementById('projectDetailContent');
  
  projectDetailContent.innerHTML = `
    <!-- Project Hero -->
    <section class="project-detail-hero">
      <div class="hero-bg">
        <div class="circuit-grid"></div>
        <div class="glow-orb glow-orb-1"></div>
      </div>
      <div class="container">
        <a href="projects.html" class="back-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Projects
        </a>
        <span class="project-category">${project.category}</span>
        <h1 class="page-title">${project.title}</h1>
        <p class="page-description">${project.overview}</p>
        
        <div class="project-meta">
          <div class="meta-item">
            <span class="meta-label">Date</span>
            <span class="meta-value">${formatDate(project.date)}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Duration</span>
            <span class="meta-value">${project.duration}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Role</span>
            <span class="meta-value">${project.role}</span>
          </div>
        </div>
        
        <div class="project-tech" style="margin-top: 1.5rem;">
          ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        
        ${project.github || project.demo ? `
          <div class="hero-buttons" style="margin-top: 1.5rem;">
            ${project.github ? `
              <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
                <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View on GitHub
              </a>
            ` : ''}
            ${project.demo ? `
              <a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polygon points="10 8 16 12 10 16 10 8"></polygon>
                </svg>
                Live Demo
              </a>
            ` : ''}
          </div>
        ` : ''}
      </div>
    </section>
    
    <!-- Challenges, Solutions, Results -->
    <section class="project-detail-section">
      <div class="container">
        <h2 class="section-title" style="margin-bottom: 2rem;">Project Overview</h2>
        <div class="detail-grid">
          <div class="detail-card">
            <div class="detail-card-header">
              <div class="detail-card-icon challenge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <h3 class="detail-card-title">Challenges</h3>
            </div>
            <div class="detail-card-content">
              <ul>
                ${project.challenges.map(c => `<li>${c}</li>`).join('')}
              </ul>
            </div>
          </div>
          
          <div class="detail-card">
            <div class="detail-card-header">
              <div class="detail-card-icon solution">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
                </svg>
              </div>
              <h3 class="detail-card-title">Solutions</h3>
            </div>
            <div class="detail-card-content">
              <ul>
                ${project.solutions.map(s => `<li>${s}</li>`).join('')}
              </ul>
            </div>
          </div>
          
          <div class="detail-card">
            <div class="detail-card-header">
              <div class="detail-card-icon result">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3 class="detail-card-title">Results</h3>
            </div>
            <div class="detail-card-content">
              <ul>
                ${project.results.map(r => `<li>${r}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Features -->
    <section class="features-section">
      <div class="container">
        <h2 class="section-title" style="margin-bottom: 2rem;">Key Features</h2>
        <div class="features-grid">
          ${project.features.map(feature => `
            <div class="feature-item">
              <svg class="feature-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span class="feature-text">${feature}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
    
    <!-- Documentation -->
    ${project.documentation && project.documentation.length > 0 ? `
      <section class="documentation-section">
        <div class="container">
          <h2 class="section-title" style="margin-bottom: 2rem;">Technical Documentation</h2>
          <div class="doc-accordion">
            ${project.documentation.map((doc, index) => `
              <div class="doc-item ${index === 0 ? 'open' : ''}" data-doc-index="${index}">
                <div class="doc-header" onclick="toggleDoc(${index})">
                  <span class="doc-title">${doc.title}</span>
                  <svg class="doc-toggle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
                <div class="doc-content">
                  <p class="doc-text">${doc.content}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    ` : ''}
    
    <!-- Gallery -->
    ${project.images && project.images.length > 0 ? `
      <section class="gallery-section">
        <div class="container">
          <h2 class="section-title" style="margin-bottom: 2rem;">Project Gallery</h2>
          <div class="gallery-grid">
            ${project.images.map((img, index) => `
              <div class="gallery-item" onclick="openLightbox('${img.url}')">
                <img src="${img.url}" alt="${img.caption || 'Project image'}" class="gallery-image">
                ${img.caption ? `<div class="gallery-caption">${img.caption}</div>` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    ` : ''}
    
    <!-- Lightbox -->
    <div class="lightbox" id="lightbox" onclick="closeLightbox()">
      <button class="lightbox-close" onclick="closeLightbox()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <img src="" alt="Project image" class="lightbox-image" id="lightboxImage">
    </div>
  `;
}

function formatDate(dateStr) {
  if (!dateStr) return 'N/A';
  const date = new Date(dateStr + '-01');
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
}

function toggleDoc(index) {
  const docItem = document.querySelector(`[data-doc-index="${index}"]`);
  docItem.classList.toggle('open');
}

function openLightbox(imageUrl) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  lightboxImage.src = imageUrl;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
  }
});
