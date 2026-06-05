// ==========================================
// DATABASE LOKAL (DATA DEFAULT WEBSITE)
// ==========================================
window.portfolioUtils = {
  // 1. Data Projects
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

  // 2. Data Skills
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

  // 3. Data Experience
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

// Shortcut 1: Ctrl + Alt + A (Untuk PC)
document.addEventListener('keydown', function(event) {
  if (event.ctrlKey && event.altKey && event.key.toLowerCase() === 'a') {
    event.preventDefault();
    checkAdminCredentials();
  }
});

// Shortcut 2: Ketuk teks Copyright 5x (Untuk HP)
let adminClickCount = 0;
let adminClickTimer;

document.addEventListener('DOMContentLoaded', () => {
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
      
      adminClickTimer = setTimeout(() => {
        adminClickCount = 0;
      }, 2000); 
    });
  }
});