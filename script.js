// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksList = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.querySelector('i').classList.toggle('fa-times');
            hamburger.querySelector('i').classList.toggle('fa-bars');
        });
    }

    // Close mobile menu when a link is clicked
    navLinksList.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.querySelector('i').classList.remove('fa-times');
            hamburger.querySelector('i').classList.add('fa-bars');
        });
    });

    // Navbar Background on Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Scroll Reveal Animation
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on initial load

    // Update Active Nav Link on Scroll
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100; // Offset for navbar

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinksList.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;

            const formData = new FormData();
            formData.append('entry.169047433', document.getElementById('name').value);
            formData.append('entry.380060760', document.getElementById('email').value);
            formData.append('entry.1967139030', document.getElementById('message').value);

            fetch('https://docs.google.com/forms/u/0/d/e/1FAIpQLSfvDbW2QMf0_my2oISdHDQ3tH0bTM32Bh-8X92B8lBfWw_iEA/formResponse', {
                method: 'POST',
                mode: 'no-cors',
                body: formData
            }).then(() => {
                formStatus.innerHTML = '<span class="status-success"><i class="fas fa-check-circle"></i> Message sent successfully! I will get back to you soon.</span>';
                contactForm.reset();
                btn.innerHTML = originalText;
                btn.disabled = false;
                
                setTimeout(() => {
                    formStatus.innerHTML = '';
                }, 5000);
            }).catch(error => {
                formStatus.innerHTML = '<span class="status-error" style="color: #ff6b6b;"><i class="fas fa-times-circle"></i> An error occurred. Please try again later.</span>';
                btn.innerHTML = originalText;
                btn.disabled = false;
            });
        });
    }

    // Dynamic Server Load Bars Animation
    const loadBars = document.querySelectorAll('.load-bar .fill');
    setInterval(() => {
        loadBars.forEach(bar => {
            // Randomly adjust the width to simulate server load
            const currentWidth = parseFloat(bar.style.width);
            const fluctuation = (Math.random() * 20) - 10; // -10% to +10%
            let newWidth = currentWidth + fluctuation;
            
            // Constrain between 10% and 95%
            if (newWidth < 10) newWidth = 10;
            if (newWidth > 95) newWidth = 95;
            
            bar.style.width = `${newWidth}%`;
            bar.style.transition = 'width 1s ease-in-out';
        });
    }, 2000);
});
