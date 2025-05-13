
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    

    if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('active');
        } else {
            scrollToTopBtn.classList.remove('active');
        }
    });
    
    scrollToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});




document.addEventListener('DOMContentLoaded', function() {
    

    const animatedElements = document.querySelectorAll('[class*="animate__"], [class*="showcase-"], .feature-card, .company-stat-item, .icon-circle-purple, .gradient-small-circle, .image-showcase img, .feature-icon-wrapper, .top-left-image, .bottom-right-image');

    const elementAnimations = new Map();

    animatedElements.forEach(element => {

        const style = window.getComputedStyle(element);
        const originalAnimation = style.animation || style.getPropertyValue('-webkit-animation');
        
        if (originalAnimation && originalAnimation !== 'none') {
            elementAnimations.set(element, {
                animation: originalAnimation,
                delay: style.animationDelay || '0s'
            });
            
            element.style.animationPlayState = 'paused';
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                if (elementAnimations.has(element)) {
                    element.style.animationPlayState = 'running';
                } else {
                    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
 
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        if (!elementAnimations.has(element)) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
        }

        observer.observe(element);
    });
});