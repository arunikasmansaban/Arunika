// ====== Mobile Menu Toggle ====== //
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Menutup menu saat link diklik
const navLinks = navMenu.querySelectorAll('a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ====== Form Submission ====== //
const form = document.querySelector('.kontak-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Ambil nilai form
    const nama = form.querySelector('input[placeholder="Nama Lengkap"]').value;
    const email = form.querySelector('input[placeholder="Email"]').value;
    const subjek = form.querySelector('input[placeholder="Subjek"]').value;
    const pesan = form.querySelector('textarea').value;

    // Validasi
    if (!nama || !email || !pesan) {
        alert('Mohon isi semua field yang diperlukan!');
        return;
    }

    // Simulasi pengiriman
    console.log('Pesan dikirim:', { nama, email, subjek, pesan });
    alert(`Terima kasih ${nama}! Pesan Anda telah kami terima. Kami akan menghubungi Anda segera.`);
    
    // Reset form
    form.reset();
});

// ====== Smooth Scroll untuk Mobile ====== //
document.addEventListener('DOMContentLoaded', () => {
    // Tambahkan animasi saat halaman dimuat
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInDown 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        observer.observe(section);
    });
});

// ====== Counter Animation untuk Statistik ====== //
const counters = document.querySelectorAll('.stat-item h3');

const startCounters = () => {
    counters.forEach(counter => {
        const target = parseInt(counter.innerText);
        const increment = target / 100;
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.ceil(current) + (counter.innerText.includes('+') ? '+' : '');
                setTimeout(updateCounter, 10);
            } else {
                counter.innerText = target + (counter.innerText.includes('+') ? '+' : '');
            }
        };

        updateCounter();
    });
};

// Trigger counter animation saat section statistik terlihat
const statistikSection = document.querySelector('.statistik');
let counterStarted = false;

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counterStarted) {
            startCounters();
            counterStarted = true;
        }
    });
});

counterObserver.observe(statistikSection);

// ====== Responsive Check ====== //
const isMobile = window.matchMedia('(max-width: 768px)').matches;

if (isMobile) {
    console.log('Tampilan Mobile diaktifkan');
} else {
    console.log('Tampilan Desktop diaktifkan');
}

// Handle resize events
window.addEventListener('resize', () => {
    const currentMobile = window.matchMedia('(max-width: 768px)').matches;
    if (currentMobile !== isMobile) {
        location.reload(); // Reload untuk memastikan layout benar
    }
});

// ====== Back to Top Button (Optional) ====== //
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background-color: var(--primary-green);
    color: white;
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    z-index: 99;
    font-size: 20px;
    transition: all 0.3s ease;
    box-shadow: var(--shadow-lg);
`;

document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.display = 'flex';
        backToTopButton.style.alignItems = 'center';
        backToTopButton.style.justifyContent = 'center';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ====== Add CSS Variables Support ====== //
const style = document.createElement('style');
style.textContent = `
    :root {
        --primary-green: #2d8659;
        --dark-green: #1a4d31;
        --light-green: #3da571;
        --primary-yellow: #ffc107;
        --dark-yellow: #ffb300;
        --light-yellow: #ffd740;
        --dark-text: #333333;
        --light-text: #666666;
        --light-bg: #f8f9fa;
        --white: #ffffff;
        --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        --shadow-lg: 0 10px 20px rgba(0, 0, 0, 0.15);
    }

    @keyframes fadeInDown {
        from {
            opacity: 0;
            transform: translateY(-30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

console.log('ARUNIKA Website loaded successfully! 🎓');
