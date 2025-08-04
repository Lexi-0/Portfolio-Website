// DOM Elements
const loading = document.getElementById('loading');
const progressBar = document.getElementById('progressBar');
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const themeToggle = document.getElementById('themeToggle');
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
const typingText = document.getElementById('typingText');
const contactForm = document.getElementById('contactForm');

// Theme Management
const themes = {
    light: '☀️',
    dark: '🌙'
};

let currentTheme = localStorage.getItem('theme') || 'light';

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeToggle.querySelector('.theme-icon').textContent = themes[theme === 'light' ? 'dark' : 'light'];
    localStorage.setItem('theme', theme);
    currentTheme = theme;
}

// Initialize theme
setTheme(currentTheme);

// Theme toggle event
themeToggle.addEventListener('click', () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
});

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        loading.classList.add('hidden');
        initializeAnimations();
    }, 1500);
});

// Custom Cursor
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

function updateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
    cursorFollower.style.left = cursorX + 'px';
    cursorFollower.style.top = cursorY + 'px';
    
    requestAnimationFrame(updateCursor);
}

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Add hover effects for cursor
document.querySelectorAll('a, button, .btn, .skill-category, .about-card, .contact-item').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

updateCursor();

// Navigation
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Progress Bar
function updateProgressBar() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
}

// Navbar scroll effect
function updateNavbar() {
    if (window.scrollY > 100) {
        navbar.style.background = currentTheme === 'light' 
            ? 'rgba(255, 255, 255, 0.95)' 
            : 'rgba(17, 24, 39, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = currentTheme === 'light' 
            ? 'rgba(255, 255, 255, 0.9)' 
            : 'rgba(17, 24, 39, 0.9)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
}

// Active navigation link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', () => {
    updateProgressBar();
    updateNavbar();
    updateActiveNavLink();
});

// Typing Animation
const phrases = [
    'Computer Science Student',
    'Frontend Developer',
    'IT Support Specialist',
    'Problem Solver',
    'Creative Thinker'
];

let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeWriter() {
    const currentPhrase = phrases[currentPhraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentPhrase.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && currentCharIndex === currentPhrase.length) {
        setTimeout(() => isDeleting = true, 2000);
        typingSpeed = 2000;
    } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeWriter, typingSpeed);
}

// Particles Animation
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            
            // Animate skill bars
            if (entry.target.classList.contains('skill-category')) {
                animateSkillBars(entry.target);
            }
            
            // Animate counters
            if (entry.target.classList.contains('about-stats')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Animate skill bars
function animateSkillBars(skillCategory) {
    const skillBars = skillCategory.querySelectorAll('.skill-progress');
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const progress = bar.dataset.progress;
            bar.style.width = progress + '%';
        }, index * 200);
    });
}

// Animate counters
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            counter.textContent = Math.floor(current);
            
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            }
        }, 20);
    });
}

// Button ripple effect
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = button.querySelector('.btn-ripple');
    
    if (ripple) {
        ripple.style.width = '0';
        ripple.style.height = '0';
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = size + 'px';
        ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
    }
}

// Form handling
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const subject = formData.get('subject').trim();
    const message = formData.get('message').trim();
    
    // Validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Submit form
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.querySelector('span').textContent;
    
    submitBtn.querySelector('span').textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    
    // Send data to Formspree
    fetch('https://formspree.io/f/movlkjna', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        } else {
            return response.json().then(data => {
                throw new Error(data.message || 'Something went wrong.');
            });
        }
    })
    .catch(() => {
        showNotification('Oops! Something went wrong. Try again later.', 'error');
    })
    .finally(() => {
        submitBtn.querySelector('span').textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
    });
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close">×</button>
        </div>
    `;
    
    // Style notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 10000;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 400px;
        word-wrap: break-word;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Parallax effect for hero section
function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-bg, .hero-particles');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}

// Scroll-triggered animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.about-card, .skill-category, .timeline-item, .education-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.animation = 'fadeInUp 0.8s ease forwards';
        }
    });
}

// Initialize all animations and observers
function initializeAnimations() {
    // Start typing animation
    typeWriter();
    
    // Create particles
    createParticles();
    
    // Observe elements for animations
    document.querySelectorAll('.skill-category, .about-stats, .timeline-item, .education-card').forEach(el => {
        observer.observe(el);
    });
    
    // Add button ripple effects
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', createRipple);
    });
    
    // Add scroll animations
    window.addEventListener('scroll', () => {
        updateParallax();
        handleScrollAnimations();
    });
    
    // Trigger initial animations
    handleScrollAnimations();
}

// Image lazy loading
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Performance optimization
function optimizePerformance() {
    // Throttle scroll events
    let ticking = false;
    
    function updateOnScroll() {
        updateProgressBar();
        updateNavbar();
        updateActiveNavLink();
        updateParallax();
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
    
    // Arrow keys for section navigation
    if (e.key === 'ArrowDown' && e.ctrlKey) {
        e.preventDefault();
        const sections = document.querySelectorAll('section[id]');
        const currentSection = [...sections].findIndex(section => {
            const rect = section.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom > 100;
        });
        
        if (currentSection < sections.length - 1) {
            sections[currentSection + 1].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    if (e.key === 'ArrowUp' && e.ctrlKey) {
        e.preventDefault();
        const sections = document.querySelectorAll('section[id]');
        const currentSection = [...sections].findIndex(section => {
            const rect = section.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom > 100;
        });
        
        if (currentSection > 0) {
            sections[currentSection - 1].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    lazyLoadImages();
    optimizePerformance();
});

// Add resize listener for responsive adjustments
window.addEventListener('resize', () => {
    // Close mobile menu on resize
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Add touch gestures for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    // Swipe left to open menu
    if (diff < -swipeThreshold && !navMenu.classList.contains('active')) {
        navMenu.classList.add('active');
    }
    
    // Swipe right to close menu
    if (diff > swipeThreshold && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

// Console welcome message
console.log(`
🎉 Welcome to Etim Alexander's Portfolio!
🚀 Built with vanilla HTML, CSS, and JavaScript
💻 Fully responsive and interactive
📧 Contact: lxndretim@gmail.com
🔗 LinkedIn: alexander-etim-69a722377

Thanks for checking out the code! 😊
`);

// Easter egg - Konami code
const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

let konamiProgress = 0;

document.addEventListener('keydown', (e) => {
    if (e.code === konamiCode[konamiProgress]) {
        konamiProgress++;
        if (konamiProgress === konamiCode.length) {
            showNotification('🎮 Konami Code activated! You found the easter egg!', 'success');
            document.body.style.animation = 'rainbow 2s infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
            konamiProgress = 0;
        }
    } else {
        konamiProgress = 0;
    }
});

// Add rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);
