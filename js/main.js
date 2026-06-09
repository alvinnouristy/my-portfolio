// ==========================================
// 🚀 INTEGRASI FIREBASE DATABASE (REAL-TIME)
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

  // 2. Inisialisasi Kunci Firebase Anda
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

  // 3. Fungsi Sinkronisasi: Lokal ke Cloud
  window.syncLokalKeFirebase = async function() {
      if (!window.db) return;
      try {
          const data = {
              projects: JSON.parse(localStorage.getItem('portfolio_projects') || '[]'),
              experiences: JSON.parse(localStorage.getItem('portfolio_experience') || '[]'),
              skills: JSON.parse(localStorage.getItem('portfolio_skills') || '[]')
          };
          await window.db.collection('portfolio').doc('data').set(data);
          console.log("☁️ Berhasil tersimpan di Database Cloud!");
      } catch (error) {
          console.error("Gagal menyimpan ke Cloud:", error);
      }
  };

  // 4. Interceptor: Otomatis upload saat Admin menekan tombol "Save"
  localStorage.setItem = function(key, value) {
      originalSetItem.apply(this, arguments); 
      if (key === 'portfolio_projects' || key === 'portfolio_experience' || key === 'portfolio_skills') {
          window.syncLokalKeFirebase(); 
      }
  };

  // 5. Download Data dari Cloud (Untuk Pengunjung Publik)
  try {
      const docRef = window.db.collection('portfolio').doc('data');
      const docSnap = await docRef.get();

      if (docSnap.exists) {
          const data = docSnap.data();
          const serverProj = JSON.stringify(data.projects || []);
          const serverExp = JSON.stringify(data.experiences || []);
          const serverSkill = JSON.stringify(data.skills || []);

          const localProj = localStorage.getItem('portfolio_projects') || "[]";
          const localExp = localStorage.getItem('portfolio_experience') || "[]";
          const localSkill = localStorage.getItem('portfolio_skills') || "[]";

          // Jika data di browser publik usang, perbarui dari cloud lalu refresh layar
          if (localProj !== serverProj || localExp !== serverExp || localSkill !== serverSkill) {
              originalSetItem.call(localStorage, 'portfolio_projects', serverProj);
              originalSetItem.call(localStorage, 'portfolio_experience', serverExp);
              originalSetItem.call(localStorage, 'portfolio_skills', serverSkill);
              
              location.reload(); 
          }
      } else {
          // Jika cloud kosong, isi dengan data default admin
          window.syncLokalKeFirebase();
      }
  } catch (error) {
      console.error("Gagal mengambil data dari Cloud:", error);
  }
})();

// ==========================================
// KONFIGURASI TELEGRAM BOT
// ==========================================
const TELEGRAM_BOT_TOKEN = '8964310319:AAFLdHA66XGIBvVEwxxIdTx8H17pph0sk8M'; 
const TELEGRAM_CHAT_ID = '1838902666'; 

// ==========================================
// DATABASE LOKAL (DATA DEFAULT WEBSITE)
// ==========================================
window.portfolioUtils = {
getProjects: function() {
  let projects = localStorage.getItem('portfolio_projects');
  if (!projects || projects === "[]") {
    projects = [
      { id: '1', title: 'Smart Energy Monitor', category: 'Embedded Systems', description: 'Sistem pemantauan energi berbasis IoT menggunakan mikrokontroler ESP32 dan sensor tegangan/arus. Menampilkan konsumsi daya secara real-time pada dashboard web.', technologies: ['C++', 'ESP32', 'IoT', 'HTML/CSS'] },
      { id: '2', title: 'Automated Sorting Conveyor', category: 'Industrial Automation', description: 'Sistem ban berjalan (conveyor) yang dikendalikan oleh PLC untuk menyortir objek berdasarkan warna dan material logam menggunakan sensor jarak dan warna.', technologies: ['PLC', 'Ladder Logic', 'Sensors', 'Automation'] }
    ];
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
  } else {
    projects = JSON.parse(projects);
  }
  return projects;
},
getSkills: function() {
  let skills = localStorage.getItem('portfolio_skills');
  if (!skills || skills === "[]") {
    skills = [
      { title: 'Embedded Systems', description: 'Pemrograman mikrokontroler (Arduino, ESP32, STM32)', tags: ['C/C++', 'MicroPython'] },
      { title: 'Industrial Automation', description: 'Pemrograman PLC dan desain sistem SCADA.', tags: ['PLC', 'HMI', 'SCADA'] },
      { title: 'Circuit Design', description: 'Desain PCB dan skematik menggunakan Altium dan Eagle.', tags: ['PCB Design', 'Proteus', 'Eagle'] }
    ];
    localStorage.setItem('portfolio_skills', JSON.stringify(skills));
  } else {
    skills = JSON.parse(skills);
  }
  return skills;
},
getExperience: function() {
  let exp = localStorage.getItem('portfolio_experience');
  if (!exp || exp === "[]") {
    exp = [
      { title: 'Electrical Engineering Student', company: 'Universitas Negeri Semarang (UNNES)', period: 'Present', description: 'Mempelajari konsep inti teknik elektro, sistem kendali, dan elektronika.' }
    ];
    localStorage.setItem('portfolio_experience', JSON.stringify(exp));
  } else {
    exp = JSON.parse(exp);
  }
  return exp;
}
};
window.portfolioUtils.getExperiences = window.portfolioUtils.getExperience;

// ==========================================
// UI UTAMA: NAVBAR, MENU MOBILE & KONTAK
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

// 1. Efek Scroll Navbar
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// 2. Fix Menu Mobile (Titik Tiga)
if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
}

// Tutup menu saat link diklik
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
    if (navLinks) navLinks.classList.remove('active');
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ==========================================
// 3. FORM KONTAK (REAL-TIME LOKAL & TELEGRAM)
// ==========================================
let isCooldown = false; 
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (isCooldown) {
      alert('Mohon tunggu beberapa detik sebelum mengirim pesan lagi.');
      return;
    }

    const submitBtn = document.getElementById('submitBtn') || contactForm.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text') || submitBtn;
    const originalText = btnText.textContent;
    
    submitBtn.disabled = true;
    btnText.textContent = 'Menyimpan...';

    const formData = new FormData(contactForm);
    const msgId = Date.now(); 

    const data = {
      id: msgId,
      name: formData.get('from_name') || formData.get('name') || document.getElementById('name')?.value || 'Tanpa Nama',
      email: formData.get('from_email') || formData.get('email') || document.getElementById('email')?.value || 'Tanpa Email',
      subject: formData.get('subject') || document.getElementById('subject')?.value || '-',
      message: formData.get('message') || document.getElementById('message')?.value || '-',
      timestamp: new Date().toISOString(),
      status: 'terkirim_lokal' 
    };

    let messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    messages.push(data);
    localStorage.setItem('contactMessages', JSON.stringify(messages));

    btnText.textContent = 'Sending Message...';
    const textMessage = `🔔 *PESAN BARU!* 🔔\n\n*Nama:* ${data.name}\n*Email:* ${data.email}\n*Subjek:* ${data.subject}\n\n*Pesan:*\n${data.message}`;
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    try {
      const response = await fetch(telegramUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: textMessage, parse_mode: 'Markdown' })
      });

      messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
      const index = messages.findIndex(m => m.id === msgId);

      if (response.ok) {
        if (index > -1) messages[index].status = 'sukses_tele';
        localStorage.setItem('contactMessages', JSON.stringify(messages));
        
        alert('Message Sent Successfully');
        contactForm.reset();
        
        isCooldown = true;
        let timeLeft = 10;
        submitBtn.style.background = '#30363d';
        submitBtn.style.color = '#8b949e';
        submitBtn.style.cursor = 'not-allowed';

        const countdownInterval = setInterval(() => {
          btnText.textContent = `Tunggu ${timeLeft}s...`;
          timeLeft--;
          if (timeLeft < 0) {
            clearInterval(countdownInterval);
            isCooldown = false;
            submitBtn.disabled = false;
            btnText.textContent = originalText; 
            submitBtn.style.background = ''; 
            submitBtn.style.color = '';
            submitBtn.style.cursor = '';
          }
        }, 1000);

      } else {
        if (index > -1) messages[index].status = 'gagal_tele';
        localStorage.setItem('contactMessages', JSON.stringify(messages));
        alert('Pesan sudah masuk di Inbox Admin, tetapi gagal diteruskan ke Telegram.');
        submitBtn.disabled = false;
        btnText.textContent = originalText;
      }
    } catch (error) {
      messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
      const index = messages.findIndex(m => m.id === msgId);
      if (index > -1) messages[index].status = 'gagal_tele';
      localStorage.setItem('contactMessages', JSON.stringify(messages));
      
      alert('Koneksi bermasalah. Pesan telah diamankan di Inbox Admin.');
      submitBtn.disabled = false;
      btnText.textContent = originalText;
    }
  });
}

// ==========================================
// SECRET ADMIN SHORTCUTS
// ==========================================
function checkAdminCredentials() {
  const username = prompt("Admin Access Required.\nMasukkan Username:");
  if (username === null) return; 
  if (username === "admin") {
    const password = prompt("Masukkan Password:");
    if (password === null) return;
    if (password === "trisyanto") {
      window.location.href = 'admin.html';
    } else {
      alert("Akses Ditolak: Password salah!");
    }
  } else {
    alert("Akses Ditolak: Username tidak ditemukan!");
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
  copyrightText.style.userSelect = 'none'; 
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