document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            navMenu.classList.remove('active');
        }));
    }

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    revealElements.forEach(el => revealObserver.observe(el));

    // --- Interactive FAQ Accordion ---
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const faqAnswer = question.nextElementSibling;
            const icon = question.querySelector('.mix-icon');
            
            // Close other open items
            document.querySelectorAll('.faq-item.active').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    item.querySelector('.faq-answer').style.maxHeight = null;
                    const otherIcon = item.querySelector('.mix-icon');
                    if (otherIcon) {
                        otherIcon.classList.remove('fa-minus');
                        otherIcon.classList.add('fa-plus');
                        otherIcon.style.transform = 'rotate(0deg)';
                    }
                }
            });

            // Toggle current item
            faqItem.classList.toggle('active');
            
            if (faqItem.classList.contains('active')) {
                faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
                icon.style.transform = 'rotate(180deg)';
            } else {
                faqAnswer.style.maxHeight = null;
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });

    // --- Cart Drawer Logic ---
    const cartTrigger = document.getElementById('cart-drawer-trigger');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCartBtn = document.getElementById('close-cart');

    if (cartTrigger && cartDrawer && cartOverlay && closeCartBtn) {
        const openCart = (e) => {
            e.preventDefault();
            cartDrawer.classList.add('active');
            cartOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            
            // Trigger dynamic progress bar fill animation
            setTimeout(() => {
                const fill = document.querySelector('.progress-fill');
                if(fill) {
                    fill.style.width = '0%';
                    setTimeout(() => fill.style.width = '25%', 100);
                }
            }, 300);
        };

        const closeCart = () => {
            cartDrawer.classList.remove('active');
            cartOverlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        cartTrigger.addEventListener('click', openCart);
        closeCartBtn.addEventListener('click', closeCart);
        cartOverlay.addEventListener('click', closeCart);
    }

    // --- Specific Mega Menu Mobile Toggle ---
    const catalogLink = document.getElementById('catalog-link');
    const megaMenuEle = document.getElementById('mega-menu');
    if (catalogLink && megaMenuEle) {
        catalogLink.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                megaMenuEle.classList.toggle('mobile-open');
                if (megaMenuEle.classList.contains('mobile-open')) {
                    megaMenuEle.style.display = 'block';
                    megaMenuEle.style.position = 'relative';
                    megaMenuEle.style.top = '0';
                    megaMenuEle.style.opacity = '1';
                    megaMenuEle.style.visibility = 'visible';
                } else {
                    megaMenuEle.style.display = 'none';
                }
            }
        });
    }

});
