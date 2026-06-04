// ===== Main JavaScript =====

// ==========================================
// KONFIGURASI TELEGRAM BOT
// ==========================================
const TELEGRAM_BOT_TOKEN = '8964310319:AAFLdHA66XGIBvVEwxxIdTx8H17pph0sk8M'; 
const TELEGRAM_CHAT_ID = '1838902666';     

// Navigation scroll effect
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
}

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenuBtn?.classList.remove('active');
    navLinks?.classList.remove('active');
  });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// Contact form handling (TELEGRAM NOTIFICATION & Cooldown 10s)
let isCooldown = false; 
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Cek cooldown
    if (isCooldown) {
      showToast('Please wait before sending another message.', 'warning');
      return;
    }

    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    submitBtn.disabled = true;
    if (btnText) btnText.style.display = 'none';
    if (btnLoading) btnLoading.style.display = 'inline-flex';
    
    const formData = new FormData(contactForm);
    const data = {
      from_name: formData.get('from_name'),
      from_email: formData.get('from_email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    };
    
    try {
      // 1. Simpan pesan secara utuh ke halaman Admin (Local Storage)
      const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
      messages.push({ ...data, timestamp: new Date().toISOString(), status: 'sent' });
      localStorage.setItem('contactMessages', JSON.stringify(messages));
      
      // 2. Kirim Notifikasi Diam-diam via Telegram API
      if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
        const textMessage = `🔔 *PESAN BARU DARI WEBSITE PORTFOLIO!* 🔔\n\n*Nama:* ${data.from_name}\n*Email:* ${data.from_email}\n*Subjek:* ${data.subject}\n\n*Pesan:*\n${data.message}`;
        
        const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        
        await fetch(telegramUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: textMessage,
            parse_mode: 'Markdown'
          })
        });
      }
      
      // 3. Tampilkan pesan sukses ke pengunjung dan kosongkan form
      showToast('Message Sent Successfully!', 'success');
      contactForm.reset();

      // 4. Logika Hitungan Mundur (Cooldown 10 Detik)
      isCooldown = true;
      let timeLeft = 10;

      if (btnLoading) btnLoading.style.display = 'none';
      if (btnText) {
        btnText.style.display = 'inline';
        btnText.textContent = `Wait ${timeLeft}s...`; 
      }

      const countdownInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft > 0) {
          if (btnText) btnText.textContent = `Wait ${timeLeft}s...`;
        } else {
          clearInterval(countdownInterval);
          isCooldown = false;
          submitBtn.disabled = false;
          if (btnText) btnText.textContent = 'Send Message';
        }
      }, 1000);

    } catch (error) {
      console.error("Gagal mengirim Telegram:", error);
      showToast('Failed to send message. Please try again.', 'error');
      
      submitBtn.disabled = false;
      if (btnText) {
        btnText.style.display = 'inline';
        btnText.textContent = 'Send Message';
      }
      if (btnLoading) btnLoading.style.display = 'none';
    }
  });
}

function showToast(message, type = 'success') {
  const existingToast = document.querySelector('.toast');
  if (existingToast) existingToast.remove();
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 100);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ==== PROJECT MANAGEMENT ====
function initializeProjects() {
  if (!localStorage.getItem('projects')) {
    const defaultProjects = [
      {
        id: 'smart-energy-monitor', title: 'Smart Energy Monitoring System', category: 'IoT',
        description: 'Real-time energy monitoring system for industrial facilities.',
        overview: 'A comprehensive IoT-based energy monitoring solution designed for industrial facilities...',
        technologies: ['ESP32', 'MQTT', 'Python'], features: ['Real-time power monitoring'],
        images: [], date: '2024-01', duration: '4 months', role: 'Lead Engineer', github: '', demo: ''
      }
    ];
    localStorage.setItem('projects', JSON.stringify(defaultProjects));
  }
}
function getProjects() { initializeProjects(); return JSON.parse(localStorage.getItem('projects') || '[]'); }
function getProjectById(id) { return getProjects().find(p => p.id === id); }
function saveProject(project) {
  const projects = getProjects();
  const index = projects.findIndex(p => p.id === project.id);
  if (index >= 0) projects[index] = project; else projects.push(project);
  localStorage.setItem('projects', JSON.stringify(projects));
}
function deleteProject(id) {
  localStorage.setItem('projects', JSON.stringify(getProjects().filter(p => p.id !== id)));
}

// ==== SKILLS MANAGEMENT ====
function initializeSkills() {
  if (!localStorage.getItem('skills')) {
    const defaultSkills = [
      {
        id: 'embedded-systems', title: 'Embedded Systems',
        description: 'Microcontroller programming, firmware development.',
        tags: ['STM32', 'ESP32', 'Arduino'],
        iconSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6"></rect></svg>'
      }
    ];
    localStorage.setItem('skills', JSON.stringify(defaultSkills));
  }
}
function getSkills() { initializeSkills(); return JSON.parse(localStorage.getItem('skills') || '[]'); }
function getSkillById(id) { return getSkills().find(s => s.id === id); }
function saveSkill(skill) {
  const skills = getSkills();
  const index = skills.findIndex(s => s.id === skill.id);
  if (index >= 0) skills[index] = skill; else skills.push(skill);
  localStorage.setItem('skills', JSON.stringify(skills));
}
function deleteSkill(id) {
  localStorage.setItem('skills', JSON.stringify(getSkills().filter(s => s.id !== id)));
}

// ==== EXPERIENCE MANAGEMENT ====
function initializeExperiences() {
  if (!localStorage.getItem('experiences')) {
    const defaultExperiences = [
      {
        id: 'exp-1',
        role: 'Automation Engineering Intern',
        company: 'PT. Industrial Tech',
        period: 'Jan 2023 - Jun 2023',
        description: 'Assisted in the development and maintenance of automated production lines.',
        responsibilities: [
          'Programmed Siemens S7-1200 PLCs for conveyor systems',
          'Designed HMI screens using TIA Portal',
          'Conducted troubleshooting on variable frequency drives (VFDs)'
        ]
      }
    ];
    localStorage.setItem('experiences', JSON.stringify(defaultExperiences));
  }
}
function getExperiences() { initializeExperiences(); return JSON.parse(localStorage.getItem('experiences') || '[]'); }
function getExperienceById(id) { return getExperiences().find(e => e.id === id); }
function saveExperience(exp) {
  const exps = getExperiences();
  const index = exps.findIndex(e => e.id === exp.id);
  if (index >= 0) exps[index] = exp; else exps.push(exp);
  localStorage.setItem('experiences', JSON.stringify(exps));
}
function deleteExperience(id) {
  localStorage.setItem('experiences', JSON.stringify(getExperiences().filter(e => e.id !== id)));
}

// Export All
window.portfolioUtils = {
  getProjects, getProjectById, saveProject, deleteProject, initializeProjects,
  getSkills, getSkillById, saveSkill, deleteSkill, initializeSkills,
  getExperiences, getExperienceById, saveExperience, deleteExperience, initializeExperiences,
  showToast
};

document.addEventListener('DOMContentLoaded', () => {
  initializeProjects();
  initializeSkills();
  initializeExperiences();
});