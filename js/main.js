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
      const msgId = Date.now(); // Buat ID unik untuk pesan

      // Ambil data form dengan sangat aman
      const data = {
        id: msgId,
        name: formData.get('from_name') || formData.get('name') || document.getElementById('name')?.value || 'Tanpa Nama',
        email: formData.get('from_email') || formData.get('email') || document.getElementById('email')?.value || 'Tanpa Email',
        subject: formData.get('subject') || document.getElementById('subject')?.value || '-',
        message: formData.get('message') || document.getElementById('message')?.value || '-',
        timestamp: new Date().toISOString(),
        status: 'terkirim_lokal' // Status awal langsung tersimpan!
      };

      // --- LANGKAH 1: SIMPAN LANGSUNG KE INBOX (REAL-TIME) ---
      let messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
      messages.push(data);
      localStorage.setItem('contactMessages', JSON.stringify(messages));
      // Sekarang pesan sudah pasti ada di Admin, apapun yang terjadi pada Telegram!

      // --- LANGKAH 2: KIRIM KE TELEGRAM ---
      btnText.textContent = 'Sending Message...';
      const textMessage = `🔔 *PESAN BARU!* 🔔\n\n*Nama:* ${data.name}\n*Email:* ${data.email}\n*Subjek:* ${data.subject}\n\n*Pesan:*\n${data.message}`;
      const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

      try {
        const response = await fetch(telegramUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: textMessage, parse_mode: 'Markdown' })
        });

        // --- LANGKAH 3: UPDATE STATUS JIKA TELEGRAM SUKSES/GAGAL ---
        messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        const index = messages.findIndex(m => m.id === msgId);

        if (response.ok) {
          if (index > -1) messages[index].status = 'sukses_tele';
          localStorage.setItem('contactMessages', JSON.stringify(messages));
          
          alert('Message Sent Successfully');
          contactForm.reset();
          
          // Hitung Mundur
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

  // Shortcut Keyboard PC
  document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.altKey && event.key.toLowerCase() === 'a') {
      event.preventDefault();
      checkAdminCredentials();
    }
  });

  // Shortcut Ketuk Footer
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