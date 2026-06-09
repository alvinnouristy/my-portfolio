// ==========================================
// 🚀 INTEGRASI FIREBASE DATABASE (BEBAS RELOAD LOOP)
// ==========================================
(async function initFirebase() {
  function loadScript(src) {
      return new Promise(resolve => {
          const script = document.createElement('script');
          script.src = src;
          script.onload = resolve;
          document.head.appendChild(script);
      });
  }

  // 1. Download SDK Firebase
  await loadScript("https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js");
  await loadScript("https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore-compat.js");

  // 2. Inisialisasi Kunci Firebase
  firebase.initializeApp({
      apiKey: "AIzaSyCubmwz2r7m1F40f3gUi7_euMDDvy5iC3M",
      authDomain: "my-portfolio-alvin-nouristy.firebaseapp.com",
      projectId: "my-portfolio-alvin-nouristy",
      storageBucket: "my-portfolio-alvin-nouristy.firebasestorage.app",
      messagingSenderId: "368363281531",
      appId: "1:368363281531:web:1d40db39fc7db2e34f16de"
  });
  window.db = firebase.firestore();

  const originalSetItem = localStorage.setItem;
  const isAdminPage = window.location.href.includes('admin');

  // 3. ENGINE UPLOAD: Tarik data lokal dan Tembak ke Firebase
  window.syncLokalKeFirebase = async function() {
      if (!window.db) return;
      try {
          const data = {
              projects: JSON.parse(localStorage.getItem('portfolio_projects') || '[]'),
              experiences: JSON.parse(localStorage.getItem('portfolio_experience') || '[]'),
              skills: JSON.parse(localStorage.getItem('portfolio_skills') || '[]')
          };
          
          await window.db.collection('portfolio').doc('data').set(data);
          
          if (isAdminPage) {
              const toast = document.createElement('div');
              toast.innerText = "✅ Tersimpan di Firebase Cloud!";
              toast.style.cssText = "position:fixed; bottom:20px; right:20px; background:#238636; color:white; padding:12px 24px; border-radius:8px; z-index:9999; font-weight:bold; box-shadow:0 4px 12px rgba(0,0,0,0.5);";
              document.body.appendChild(toast);
              setTimeout(() => toast.remove(), 3500);
          }
      } catch (error) {
          console.error("Gagal menyimpan ke Cloud:", error);
      }
  };

  // 4. AUTOPILOT SENSOR: Deteksi tombol Save Admin
  let syncTimer;
  localStorage.setItem = function(key, value) {
      originalSetItem.apply(this, arguments); 
      
      if (isAdminPage && key.includes('portfolio')) {
          clearTimeout(syncTimer);
          syncTimer = setTimeout(() => {
              window.syncLokalKeFirebase(); 
          }, 800);
      }
  };

  // 5. AUTO-DOWNLOAD: Tarik Data Cloud untuk Publik (TANPA RELOAD)
  try {
      const docRef = window.db.collection('portfolio').doc('data');
      const docSnap = await docRef.get();

      if (docSnap.exists) {
          const data = docSnap.data();
          const serverProj = data.projects || [];
          const serverExp = data.experiences || [];
          const serverSkill = data.skills || [];

          // Update data memori HP secara diam-diam (Silent Update)
          originalSetItem.call(localStorage, 'portfolio_projects', JSON.stringify(serverProj));
          originalSetItem.call(localStorage, 'portfolio_experience', JSON.stringify(serverExp));
          originalSetItem.call(localStorage, 'portfolio_skills', JSON.stringify(serverSkill));
          
          // Langsung suntikkan ke layar tanpa perlu merefresh (Live Rendering)
          if (!isAdminPage) {
              if (document.getElementById('projectsGrid')) renderProjectsDirectly(serverProj);
              if (document.getElementById('experienceTimeline')) renderExperiencesDirectly(serverExp);
          }
      } else {
          if (isAdminPage) window.syncLokalKeFirebase();
      }
  } catch (error) {
      console.error("Gagal mengambil data dari Cloud:", error);
  }
})();

// ==========================================
// ENGINE RENDER (SUNTIKAN UI PUBLIK)
// ==========================================
function renderProjectsDirectly(projectsArray) {
  const projectsGrid = document.getElementById('projectsGrid');
  if (!projectsGrid) return;
  projectsGrid.innerHTML = projectsArray.map(project => {
    let shortDesc = project.description || "";
    if (shortDesc.length > 140) {
      let trimmed = shortDesc.substring(0, 140);
      let lastSpace = trimmed.lastIndexOf(" ");
      shortDesc = lastSpace > 0 ? trimmed.substring(0, lastSpace) + "..." : trimmed + "...";
    }
    return `
    <div class="project-card" style="background: #161b22; border: 1px solid #30363d; border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
      <div class="project-header">
        <span class="project-category" style="color: #58a6ff; font-size: 0.875rem; font-weight: 600; text-transform: uppercase;">${project.category || 'General'}</span>
        <h3 class="project-title" style="color: #c9d1d9; font-size: 1.5rem; margin: 0.5rem 0;">${project.title}</h3>
      </div>
      <p class="project-description" style="color: #8b949e; line-height: 1.6; flex-grow: 1; text-align: justify;">${shortDesc}</p>
      <div class="project-tags" style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
        ${(project.technologies || []).map(tech => `<span style="background: #21262d; color: #c9d1d9; padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.75rem; border: 1px solid #30363d;">${tech}</span>`).join('')}
      </div>
      <div class="project-footer" style="margin-top: auto;">
        <a href="project-detail.html?id=${project.id}" class="btn btn-primary" style="display: inline-block; width: 100%; text-align: center; background: #238636; color: white; padding: 0.6rem 1rem; border-radius: 6px; text-decoration: none; font-weight: 600;">View Details</a>
      </div>
    </div>`;
  }).join('');
}

function renderExperiencesDirectly(experiencesArray) {
  const timeline = document.getElementById('experienceTimeline');
  if (!timeline) return;
  function parseLatestYear(periodStr) {
    if (!periodStr) return 0;
    const text = periodStr.toLowerCase();
    if (text.includes('present') || text.includes('saat ini') || text.includes('sekarang')) return 9999; 
    const years = periodStr.match(/\d{4}/g);
    return years ? Math.max(...years.map(Number)) : 0;
  }
  const experiencesWithIndex = experiencesArray.map((exp, originalIndex) => ({ ...exp, originalIndex }));
  experiencesWithIndex.sort((a, b) => parseLatestYear(b.period) - parseLatestYear(a.period));

  timeline.innerHTML = experiencesWithIndex.map((exp) => {
    return `
    <div style="background: #161b22; border: 1px solid #30363d; border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem;">
        <div>
          <span style="color: #58a6ff; font-size: 0.85rem; font-weight: 600; text-transform: uppercase;">${exp.company || 'Company'}</span>
          <h3 style="color: #c9d1d9; font-size: 1.4rem; margin: 0.2rem 0;">${exp.title || exp.role}</h3>
        </div>
        <span style="background: #21262d; color: #8b949e; padding: 0.3rem 0.8rem; border-radius: 6px; font-size: 0.85rem; border: 1px solid #30363d; font-weight: 500;">${exp.period || ''}</span>
      </div>
      <p style="color: #8b949e; line-height: 1.6; margin: 0.5rem 0; text-align: justify;">
        ${exp.description ? (exp.description.length > 130 ? exp.description.substring(0, 130) + '...' : exp.description) : ''}
      </p>
      <div style="margin-top: 0.5rem;">
        <a href="experience-detail.html?id=${exp.originalIndex}" style="display: inline-block; background: #238636; color: white; padding: 0.5rem 1.2rem; border-radius: 6px; text-decoration: none; font-size: 0.9rem; font-weight: 600;">View Details</a>
      </div>
    </div>`;
  }).join('');
}

// ==========================================
// KONFIGURASI TELEGRAM BOT & LOKAL DEFAULT
// ==========================================
const TELEGRAM_BOT_TOKEN = '8964310319:AAFLdHA66XGIBvVEwxxIdTx8H17pph0sk8M'; 
const TELEGRAM_CHAT_ID = '1838902666'; 

window.portfolioUtils = {
  getProjects: function() {
    let projects = localStorage.getItem('portfolio_projects');
    return projects ? JSON.parse(projects) : [];
  },
  getSkills: function() {
    let skills = localStorage.getItem('portfolio_skills');
    return skills ? JSON.parse(skills) : [];
  },
  getExperience: function() {
    let exp = localStorage.getItem('portfolio_experience');
    return exp ? JSON.parse(exp) : [];
  }
};
window.portfolioUtils.getExperiences = window.portfolioUtils.getExperience;

// ==========================================
// UI UTAMA: NAVBAR, KONTAK & SHORTCUT ADMIN
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  });

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
      if (navLinks) navLinks.classList.remove('active');
    });
  });

  let isCooldown = false; 
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (isCooldown) { alert('Mohon tunggu beberapa detik.'); return; }

      const submitBtn = document.getElementById('submitBtn') || contactForm.querySelector('button[type="submit"]');
      const btnText = submitBtn.querySelector('.btn-text') || submitBtn;
      const originalText = btnText.textContent;
      
      submitBtn.disabled = true;
      btnText.textContent = 'Menyimpan...';

      const formData = new FormData(contactForm);
      const data = {
        name: formData.get('from_name') || formData.get('name') || document.getElementById('name')?.value || 'Tanpa Nama',
        email: formData.get('from_email') || formData.get('email') || document.getElementById('email')?.value || 'Tanpa Email',
        subject: formData.get('subject') || document.getElementById('subject')?.value || '-',
        message: formData.get('message') || document.getElementById('message')?.value || '-'
      };

      btnText.textContent = 'Sending Message...';
      const textMessage = `🔔 *PESAN BARU PORTFOLIO* 🔔\n\n*Nama:* ${data.name}\n*Email:* ${data.email}\n*Subjek:* ${data.subject}\n\n*Pesan:*\n${data.message}`;
      const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

      try {
        const response = await fetch(telegramUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: textMessage, parse_mode: 'Markdown' })
        });

        if (response.ok) {
          alert('Pesan berhasil terkirim ke Telegram!');
          contactForm.reset();
          isCooldown = true;
          let timeLeft = 10;
          const countdownInterval = setInterval(() => {
            btnText.textContent = `Tunggu ${timeLeft}s...`;
            timeLeft--;
            if (timeLeft < 0) {
              clearInterval(countdownInterval);
              isCooldown = false;
              submitBtn.disabled = false;
              btnText.textContent = originalText;
            }
          }, 1000);
        } else {
          alert('Gagal mengirim ke Telegram. Server error.');
          submitBtn.disabled = false;
          btnText.textContent = originalText;
        }
      } catch (error) {
        alert('Gagal mengirim pesan, cek koneksi internet.');
        submitBtn.disabled = false;
        btnText.textContent = originalText;
      }
    });
  }

  function checkAdminCredentials() {
    const username = prompt("Admin Access Required.\nMasukkan Username:");
    if (username === "admin") {
      const password = prompt("Masukkan Password:");
      if (password === "trisyanto") window.location.href = 'admin.html';
      else alert("Akses Ditolak!");
    }
  }

  document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.altKey && event.key.toLowerCase() === 'a') {
      event.preventDefault();
      checkAdminCredentials();
    }
  });

  let adminClickCount = 0;
  let adminClickTimer;
  const copyrightText = document.querySelector('.footer-bottom p');
  if (copyrightText) {
    copyrightText.addEventListener('click', () => {
      adminClickCount++;
      clearTimeout(adminClickTimer);
      if (adminClickCount >= 5) {
        checkAdminCredentials(); 
        adminClickCount = 0; 
      }
      adminClickTimer = setTimeout(() => { adminClickCount = 0; }, 2000); 
    });
  }
});