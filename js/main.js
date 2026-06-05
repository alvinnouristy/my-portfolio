// ==========================================
// DATABASE LOKAL (DATA DEFAULT WEBSITE)
// ==========================================
window.portfolioUtils = {
  getProjects: function() {
    let projects = localStorage.getItem('portfolio_projects');
    if (!projects || projects === "[]") {
      projects = [
        {
          id: '1',
          title: 'Smart Energy Monitor',
          category: 'Embedded Systems',
          description: 'Sistem pemantauan energi berbasis IoT menggunakan mikrokontroler ESP32 dan sensor tegangan/arus. Menampilkan konsumsi daya secara real-time pada dashboard web.',
          technologies: ['C++', 'ESP32', 'IoT', 'HTML/CSS']
        },
        {
          id: '2',
          title: 'Automated Sorting Conveyor',
          category: 'Industrial Automation',
          description: 'Sistem ban berjalan (conveyor) yang dikendalikan oleh PLC untuk menyortir objek berdasarkan warna dan material logam menggunakan sensor jarak dan warna.',
          technologies: ['PLC', 'Ladder Logic', 'Sensors', 'Automation']
        }
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
// SECRET ADMIN SHORTCUTS & AUTHENTICATION
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

// ==========================================
// MENU MOBILE & FORM KONTAK (TELEGRAM)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Shortcut Ketuk Copyright
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

  // 2. Fix Menu Mobile (Agar Terbuka Sempurna di HP)
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      // Jika menu memiliki style absolute (berarti sedang terbuka), maka tutup
      if (navLinks.style.position === 'absolute') {
        navLinks.style.position = '';
        navLinks.style.display = '';
        navLinks.style.flexDirection = '';
        navLinks.style.top = '';
        navLinks.style.left = '';
        navLinks.style.width = '';
        navLinks.style.backgroundColor = '';
        navLinks.style.padding = '';
        navLinks.style.zIndex = '';
      } else {
        // Buka menu dengan menimpa CSS bawaan sementara
        navLinks.style.position = 'absolute';
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.backgroundColor = '#161b22';
        navLinks.style.padding = '1.5rem';
        navLinks.style.borderBottom = '1px solid #30363d';
        navLinks.style.zIndex = '999';
      }
    });
  }

  // 3. Fix Telegram & Hitung Mundur 10 Detik
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    // Jangan jalankan logika kirim pesan ini di halaman admin
    if (!form.id.startsWith('formProject') && !form.id.startsWith('formExp') && !form.id.startsWith('formSkill')) { 
      
      form.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn ? btn.textContent : 'Send Message';
        
        // Mengambil inputan
        const nameInput = form.querySelector('input[type="text"]') || form.querySelector('#name');
        const emailInput = form.querySelector('input[type="email"]') || form.querySelector('#email');
        const messageInput = form.querySelector('textarea') || form.querySelector('#message');
        
        const name = nameInput ? nameInput.value : 'No Name';
        const email = emailInput ? emailInput.value : 'No Email';
        const message = messageInput ? messageInput.value : 'No Message';
        
        // ----------------------------------------------------
        // ⚠️ MASUKKAN TOKEN DAN CHAT ID ANDA DI SINI ⚠️
        // ----------------------------------------------------
        const botToken = 'ISI_TOKEN_BOT_ANDA_DI_SINI'; 
        const chatId = 'ISI_CHAT_ID_ANDA_DI_SINI';
        // ----------------------------------------------------

        const telegramMessage = `📩 *New Message from Portfolio!*\n\n*Name:* ${name}\n*Email:* ${email}\n*Message:*\n${message}`;
        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

        if (btn) {
          btn.textContent = 'Sending...';
          btn.disabled = true;
        }

        try {
          const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: telegramMessage,
              parse_mode: 'Markdown'
            })
          });

          if (response.ok) {
            alert('Terima kasih! Pesan Anda telah berhasil dikirim.');
            form.reset(); 
            
            // Logika Hitung Mundur 10 Detik
            let countdown = 10;
            if (btn) {
              btn.style.background = '#30363d';
              btn.style.color = '#8b949e';
              btn.style.cursor = 'not-allowed';
              
              const timer = setInterval(() => {
                btn.textContent = `Tunggu ${countdown} detik...`;
                countdown--;
                
                if (countdown < 0) {
                  clearInterval(timer);
                  btn.textContent = originalText;
                  btn.disabled = false;
                  btn.style.background = ''; // Kembali ke warna asli CSS
                  btn.style.color = '';
                  btn.style.cursor = '';
                }
              }, 1000);
            }
          } else {
            alert('Gagal mengirim pesan ke Telegram. Pastikan Token dan Chat ID benar.');
            if (btn) {
              btn.textContent = originalText;
              btn.disabled = false;
            }
          }
        } catch (error) {
          alert('Terjadi kesalahan jaringan saat mengirim pesan.');
          if (btn) {
            btn.textContent = originalText;
            btn.disabled = false;
          }
        }
      });
    }
  });

});