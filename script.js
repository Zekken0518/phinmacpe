// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('fade-out');
            setTimeout(function() {
                preloader.style.display = 'none';
                
                // Animate elements after preloader is gone
                animateHeroElements();
            }, 500);
        }, 1500);
    });
    
    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(function() {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });
    
    document.addEventListener('mousedown', function() {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });
    
    document.addEventListener('mouseup', function() {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    });
    
    // Hover effect for links and buttons
    const links = document.querySelectorAll('a, button, .btn, .feature-card, .facility-card, .career-card, .testimonial-card');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            cursorFollower.style.width = '50px';
            cursorFollower.style.height = '50px';
            cursor.style.opacity = '0.5';
        });
        
        link.addEventListener('mouseleave', function() {
            cursorFollower.style.width = '30px';
            cursorFollower.style.height = '30px';
            cursor.style.opacity = '1';
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Animate hero elements
    function animateHeroElements() {
        const heroTitle = document.querySelector('.hero-title');
        const heroBottom = document.querySelector('.hero-bottom');
        
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(50px)';
        heroBottom.style.opacity = '0';
        
        setTimeout(function() {
            heroTitle.style.transition = 'opacity 1s ease, transform 1s ease';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
            
            setTimeout(function() {
                heroBottom.style.transition = 'opacity 1s ease';
                heroBottom.style.opacity = '1';
            }, 500);
        }, 300);
    }
    
    // Scroll reveal animation
    const scrollElements = document.querySelectorAll('.section-title, .about-content, .feature-grid, .program-content, .facilities-grid, .careers-grid, .testimonials-grid, .enroll-content');
    
    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= 
            ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    };
    
    const hideScrollElement = (element) => {
        element.classList.remove('scrolled');
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
    };
    
    scrollElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 1s ease, transform 1s ease';
    });
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 80)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };
    
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // Initialize scroll animation
    handleScrollAnimation();
    
    // Testimonial slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let currentIndex = 0;
    
    function showTestimonial(index) {
        testimonialCards.forEach(card => {
            card.classList.remove('active');
        });
        
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
    }
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = testimonialCards.length - 1;
            }
            showTestimonial(currentIndex);
        });
        
        nextBtn.addEventListener('click', function() {
            currentIndex++;
            if (currentIndex >= testimonialCards.length) {
                currentIndex = 0;
            }
            showTestimonial(currentIndex);
        });
    }
    
    if (dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                currentIndex = index;
                showTestimonial(currentIndex);
            });
        });
    }
    
    // Initialize testimonial slider
    if (testimonialCards.length > 0) {
        showTestimonial(currentIndex);
        
        // Auto slide
        setInterval(function() {
            currentIndex++;
            if (currentIndex >= testimonialCards.length) {
                currentIndex = 0;
            }
            showTestimonial(currentIndex);
        }, 5000);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Parallax effect
    window.addEventListener('scroll', function() {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const scrollPosition = window.pageYOffset;
            const elementPosition = element.offsetTop;
            const distance = (scrollPosition - elementPosition) * 0.5;
            
            if (scrollPosition > elementPosition - window.innerHeight && scrollPosition < elementPosition + element.offsetHeight) {
                element.style.transform = `translateY(${distance}px)`;
            }
        });
    });
    
    // Circuit animation for motherboard graphics
    const circuitElements = document.querySelectorAll('.circuit-overlay, .circuit-bg');
    
    circuitElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            element.style.backgroundPosition = `${x/10}px ${y/10}px`;
            element.style.filter = 'brightness(1.5) contrast(1.2) hue-rotate(190deg)';
        });
        
        element.addEventListener('mouseleave', function() {
            element.style.backgroundPosition = '';
            element.style.filter = '';
        });
    });
    
    // Particle animation
    const particlesContainer = document.querySelector('.particles-container');
    
    if (particlesContainer) {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            const size = Math.random() * 5 + 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.backgroundColor = `rgba(${Math.random() * 100 + 100}, ${Math.random() * 100 + 100}, 255, ${Math.random() * 0.5 + 0.3})`;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.overlay');
    
    if (menuToggle && mobileMenu && overlay) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
        
        overlay.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
        
        document.querySelectorAll('.mobile-menu a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
});

// Glitch effect for hero title
function glitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(element => {
        const text = element.textContent;
        element.setAttribute('data-text', text);
    });
}

// Initialize glitch effect
glitchEffect();

// Tilt effect for cards
const tiltElements = document.querySelectorAll('.feature-card, .facility-card, .career-card');

tiltElements.forEach(element => {
    element.addEventListener('mousemove', function(e) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const tiltX = (y - centerY) / 10;
        const tiltY = (centerX - x) / 10;
        
        element.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    element.addEventListener('mouseleave', function() {
        element.style.transform = '';
    });
});

// Typewriter effect
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typewriter effect for hero subtitle
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            typeWriter(heroSubtitle, 'Engineer Your Future in Computing', 100);
        }, 2000);
    });
}