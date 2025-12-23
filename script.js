// Navbar scroll effect with hero transition
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const heroHeight = window.innerHeight;
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > heroHeight * 0.7) {
        navbar.classList.add('visible');
    } else {
        navbar.classList.remove('visible');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Carousel functionality
function createCarousel(containerId, prevBtnId, nextBtnId, dotsContainerId) {
    let currentSlide = 0;
    const container = document.getElementById(containerId);
    const slides = container.querySelectorAll('.project-card');
    const totalSlides = slides.length;
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    const dotsContainer = document.getElementById(dotsContainerId);

    // Create dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }

    const dots = dotsContainer.querySelectorAll('.carousel-dot');

    function updateCarousel() {
        const containerStyle = getComputedStyle(container);
        const gap = parseFloat(containerStyle.gap);
        const slideWidth = slides[0].offsetWidth + gap; 
        container.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        // Update button states
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === totalSlides - 1;
    }

    function goToSlide(index) {
        currentSlide = Math.max(0, Math.min(index, totalSlides - 1));
        updateCarousel();
    }

    function nextSlide() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateCarousel();
        }
    }

    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateCarousel();
        }
    }

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Initialize carousel
    updateCarousel();

    // Handle window resize
    window.addEventListener('resize', updateCarousel);

    return { updateCarousel };
}

// Initialize both carousels
const projectsCarousel = createCarousel('carousel-container', 'prev-btn', 'next-btn', 'carousel-dots');
const toolsCarousel = createCarousel('tools-carousel-container', 'tools-prev-btn', 'tools-next-btn', 'tools-carousel-dots');

// Project card click handlers
document.querySelectorAll('.projects-link').forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const projectUrls = [
            'https://github.com/EmmettCatanese/OpenDataSet',
            'https://github.com/EmmettCatanese/NYC-Crash-Weather-Data',
            'https://studio.code.org/projects/applab/HWCRc2p-y4xCfnd05Bd9i4uv826_umOru2SaHzaA9y8',
        ];
        
        if (projectUrls[index]) {
            window.open(projectUrls[index], '_blank');
        } else {
            alert('Project link coming soon!');
        }
    });
});

// Tool card click handlers
document.querySelectorAll('.tool-link').forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const toolUrls = [
            'https://github.com/EmmettCatanese/Easy-Archive',
            'https://emmettcatanese.github.io/Litematic-Changer/',
            'https://emmettcatanese.github.io/Boat-Optimizer/',
        ];
        
        if (toolUrls[index]) {
            window.open(toolUrls[index], '_blank');
        } else {
            alert('Tool link coming soon!');
        }
    });
});