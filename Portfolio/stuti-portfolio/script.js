// Navigation Scripts
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-links");
const navLinks = document.querySelectorAll(".nav-links li a");
const navbar = document.querySelector(".navbar");

// Hamburger Menu Toggle
if (hamburger) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });
}

// Close menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    });
});

// Scroll Effects
window.addEventListener("scroll", () => {
    // Add box shadow to navbar when scrolled
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// Progress Bar Animation on Scroll
const animateProgressBars = () => {
    const progressBars = document.querySelectorAll(".progress");
    const windowHeight = window.innerHeight;

    progressBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top;
        if (barPosition < windowHeight - 50) {
            // Trigger animation or ensure width is set correctly
            const width = bar.style.width;
            bar.style.width = "0%";
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
            
            // Add a class so it doesn't re-animate every scroll tick
            bar.classList.add("animated");
        }
    });
};

// Intersection Observer for scroll animations
const fadeElements = document.querySelectorAll('.card, .section-title, .hero-content, .hero-image-wrapper');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeElements.forEach(el => {
    // Add initial styles for animation
    if(!el.classList.contains('hero-image-wrapper')){
        // Keep hero image wrapper transforms as defined in CSS
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    }
    observer.observe(el);
});

// Form Submission handling (Prevent default for static site setup)
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = contactForm.querySelector('button');
        const originalText = btn.textContent;
        
        btn.textContent = 'Sending...';
        btn.disabled = true;
        
        // Simulate network request
        setTimeout(() => {
            btn.textContent = 'Message Sent!';
            btn.style.backgroundColor = '#10b981'; // Success green
            contactForm.reset();
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = '';
                btn.disabled = false;
            }, 3000);
        }, 1500);
    });
}
