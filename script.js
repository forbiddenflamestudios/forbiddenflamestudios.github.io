document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const pageLinks = document.querySelectorAll('.page-link');
    const navLinks = document.querySelectorAll('.nav-link'); // Includes desktop and mobile
    const sections = document.querySelectorAll('.page-section');
    const contactForm = document.getElementById('contact-form'); // Keep reference if needed for JS validation later
    const currentYearSpan = document.getElementById('current-year');

    // --- Set current year in footer ---
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Mobile Menu Toggle ---
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const icon = mobileMenuButton.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('lucide-x');
                icon.classList.add('lucide-menu');
            } else {
                icon.classList.remove('lucide-menu');
                icon.classList.add('lucide-x');
            }
        });
    }

    // --- Page Navigation Logic ---
    const showPage = (targetId) => {
        sections.forEach(section => section.classList.add('hidden'));
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.remove('hidden');
            const headerOffset = 80;
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({top: offsetPosition, behavior: "smooth"});
        } else {
            console.warn(`Target section "${targetId}" not found.`);
            document.getElementById('home')?.classList.remove('hidden'); // Fallback
        }
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.target === targetId) link.classList.add('active');
        });
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuButton.querySelector('i');
            icon.classList.remove('lucide-x');
            icon.classList.add('lucide-menu');
        }
    };

    pageLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.dataset.target;
            if (targetId) {
                // window.location.hash = targetId; // Update hash (optional)
                showPage(targetId);
            }
        });
    });

    // --- Initial Page Load ---
    const initialHash = window.location.hash.substring(1);
    if (initialHash && document.getElementById(initialHash)) {
        // Use setTimeout to ensure smooth scroll works after initial render potentially shifts layout
        setTimeout(() => showPage(initialHash), 100);
    } else {
        showPage('home');
    }

    // --- Contact Form ---
    // No JS needed for basic Formspree submission.
    // You can add client-side validation here if desired before Formspree handles it.
    // Example:
    // if (contactForm) {
    //    contactForm.addEventListener('submit', (event) => {
    //        // Basic validation example
    //        const emailInput = contactForm.querySelector('#email');
    //        if (!emailInput.value.includes('@')) {
    //            event.preventDefault(); // Stop submission
    //            alert('Please enter a valid email address.');
    //        }
    //        // If validation passes, the form submits to Formspree via the 'action' attribute
    //    });
    // }


    // --- Game Card Status Text Update ---
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        const overlayTextElement = card.querySelector('.overlay-text');
        if (!overlayTextElement) return;
        if (card.classList.contains('status-unmaintained')) {
            overlayTextElement.textContent = 'No longer maintained';
        } else if (card.classList.contains('status-down')) {
            overlayTextElement.textContent = 'Temporarily Down';
        }
    });

    // --- Slideshow Logic ---
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slideshow-container .slide');
    const showSlides = () => {
        if (!slides || slides.length === 0) return; // Exit if no slides
        slides.forEach(slide => slide.style.display = "none"); // Hide all
        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1
        } // Loop back
        slides[slideIndex - 1].style.display = "block"; // Show current
        setTimeout(showSlides, 5000); // Change image every 5 seconds
    }
    if (slides.length > 0) {
        showSlides(); // Start slideshow if slides exist
    }


    // --- particles.js Initialization ---
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {"value": 50, "density": {"enable": true, "value_area": 800}}, // Fewer particles
                "color": {"value": "#ff6600"}, // Accent color
                "shape": {"type": "circle"},
                "opacity": {
                    "value": 0.4,
                    "random": true,
                    "anim": {"enable": true, "speed": 0.5, "opacity_min": 0.1, "sync": false}
                }, // Subtle opacity animation
                "size": {"value": 3, "random": true, "anim": {"enable": false}}, // Small, static size
                "line_linked": {"enable": false}, // No lines
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {"enable": false}
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {"onhover": {"enable": false}, "onclick": {"enable": false}, "resize": true}, // Basic interactivity off
            },
            "retina_detect": true
        });
    }

});