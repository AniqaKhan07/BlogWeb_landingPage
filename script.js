document.addEventListener('DOMContentLoaded', function() {
    // Theme switcher functionality
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const currentTheme = localStorage.getItem('theme');
    const body = document.body;

    if (currentTheme) {
        body.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
        }
    }

    function switchTheme(e) {
        if (e.target.checked) {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }    
    }

    toggleSwitch.addEventListener('change', switchTheme, false);

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
        this.querySelector('i').classList.toggle('fa-bars');
    });
    
    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            menuToggle.querySelector('i').classList.remove('fa-times');
            menuToggle.querySelector('i').classList.add('fa-bars');
        });
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Sticky navigation on scroll
    const navbar = document.querySelector('.navbar');
    const heroSection = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > heroSection.offsetHeight - 80) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });
    
    // Scroll animation
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkScroll() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.animation = `fadeIn 1s forwards`;
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll();

    // Stat counter animation - Modified for 400+ monthly orders
function initStatsAnimation() {
    const statItems = document.querySelectorAll('.stat-item');
    const statsSection = document.querySelector('.stats');
    
    if (!statItems.length || !statsSection) return;

    // First update the displayed number to 400+ (if it's the monthly readers)
    statItems.forEach(item => {
        const statLabel = item.querySelector('.stat-label');
        if (statLabel && statLabel.textContent.includes('Monthly Readers')) {
            const numberElement = item.querySelector('.stat-number');
            numberElement.textContent = '2000+';
        }
    });

    statItems.forEach(item => {
        const numberElement = item.querySelector('.stat-number');
        if (!numberElement) return;
        
        const originalText = numberElement.textContent;
        const originalNumber = parseInt(originalText.replace(/[^0-9]/g, ''));
        
        numberElement.dataset.original = originalText;
        numberElement.dataset.target = originalNumber;
        numberElement.textContent = '0+'; 
    });

    function animateNumbers() {
        statItems.forEach(item => {
            const numberElement = item.querySelector('.stat-number');
            const target = parseInt(numberElement.dataset.target);
            const originalText = numberElement.dataset.original;
            const duration = 1500; 
            const startTime = performance.now();
            
            function updateNumber(currentTime) {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                const currentValue = Math.floor(progress * target);
                
                numberElement.textContent = currentValue + '+';
                
                if (progress < 1) {
                    requestAnimationFrame(updateNumber);
                } else {
                    numberElement.textContent = originalText;
                }
            }
            
            requestAnimationFrame(updateNumber);
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });

    observer.observe(statsSection);
}

setTimeout(initStatsAnimation, 300);
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    const subscribeForm = document.querySelector('.subscribe-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
    
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }
    
    // Update active nav link based on scroll position
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});