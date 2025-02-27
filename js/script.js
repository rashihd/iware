document.addEventListener('DOMContentLoaded', function() {
    // Slider Functionality
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds
    let slideTimer;

    // Function to set active slide
    function setActiveSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        // Update current slide index
        currentSlide = index;
    }

    // Auto slide function
    function startSlideTimer() {
        slideTimer = setInterval(() => {
            let nextIndex = currentSlide + 1;
            if (nextIndex >= slides.length) {
                nextIndex = 0;
            }
            setActiveSlide(nextIndex);
        }, slideInterval);
    }

    // Initialize slider
    startSlideTimer();

    // Event listener for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideTimer);
            updateSlide(index);
            startSlideTimer();
        });
    });

    // Event listeners for prev/next buttons
    if(prevBtn) {
        prevBtn.addEventListener('click', () => {
            clearInterval(slideTimer);
            let prevIndex = currentSlide - 1;
            if (prevIndex < 0) {
                prevIndex = slides.length - 1;
            }
            updateSlide(prevIndex);
            startSlideTimer();
        });
    }

    if(nextBtn) {
        nextBtn.addEventListener('click', () => {
            clearInterval(slideTimer);
            let nextIndex = currentSlide + 1;
            if (nextIndex >= slides.length) {
                nextIndex = 0;
            }
            updateSlide(nextIndex);
            startSlideTimer();
        });
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if(menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('header nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if(targetId.startsWith('#')) {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if(nav.classList.contains('active')) {
                        nav.classList.remove('active');
                    }
                    
                    // Update active link
                    navLinks.forEach(link => link.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });
    
    // Update active navigation link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        const navHeight = 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if(pageYOffset >= (sectionTop - navHeight)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    // Form Submission
    const contactForm = document.querySelector('.contact-form form');
    
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const hideLoading = showLoadingAnimation(this);
            
            // Simulate form submission delay
            setTimeout(() => {
                hideLoading();
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
            }, 1500);
        });
    }
    
    // Newsletter Subscription
    const newsletterForm = document.querySelector('.footer-newsletter form');
    
    if(newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const hideLoading = showLoadingAnimation(this);
            
            setTimeout(() => {
                hideLoading();
                alert('Thank you for subscribing to our newsletter!');
                this.reset();
            }, 1500);
        });
    }

    // Scroll Animation Function
    function animateOnScroll() {
        const elements = document.querySelectorAll('.service-card, .portfolio-item, .stat-item, .value-item');
        elements.forEach((element, index) => {
            // Set animation delay based on index
            element.style.setProperty('--index', index);
            
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Initial check for elements in view
    animateOnScroll();
    
    // Add scroll event listener with throttle
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                animateOnScroll();
                scrollTimeout = null;
            }, 50);
        }
    });

    // Enhance slider transitions
    function updateSlide(index) {
        const activeSlide = document.querySelector('.slide.active');
        const nextSlide = slides[index];
        
        // Add transition classes
        activeSlide.classList.add('sliding-out');
        nextSlide.classList.add('sliding-in');
        
        setTimeout(() => {
            setActiveSlide(index);
            activeSlide.classList.remove('sliding-out');
            nextSlide.classList.remove('sliding-in');
        }, 600);
    }

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if(hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            hero.style.backgroundPosition = `center ${scrolled * 0.5}px`;
        });
    }

    // Enhance form interactions
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // Add loading animation for form submission
    function showLoadingAnimation(form) {
        const button = form.querySelector('button[type="submit"]');
        const originalText = button.innerText;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        button.disabled = true;
        
        return function hideLoading() {
            button.innerHTML = originalText;
            button.disabled = false;
        };
    }
});