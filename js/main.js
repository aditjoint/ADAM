/**
 * ADIT Joint - Main JavaScript
 * Author: ADIT Joint
 * Version: 1.0
 */
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const main = document.querySelector('main');

    if (header && main) {
        const setMainPadding = () => {
            main.style.paddingTop = header.offsetHeight + 'px';
        };
        setMainPadding(); // initial
        window.addEventListener('resize', setMainPadding); // update on resize
    }
});

    // --- Daily background ---
    if (main) {
        const today = new Date();
        const day = today.getDate(); // 1-31
        const imagePath = `/images/daily-backgrounds/bg-${day}.jpg`;
        main.style.backgroundImage = `url('${imagePath}')`;
        main.style.backgroundSize = 'cover';
        main.style.backgroundPosition = 'center';
        main.style.backgroundRepeat = 'no-repeat';
        main.style.backgroundAttachment = 'fixed';
    }

    // --- Initialize features ---
    initMobileMenu();
    initTabs();
    initScrollAnimation();
    initServiceCardEffects();

    // --- Smooth scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.classList.contains('dropdown-toggle')) return;
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Highlight current page ---
    (function highlightCurrentPage() {
        const currentPage = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            if (link.classList.contains('dropdown-toggle')) return;
            if (
                currentPage.endsWith(linkPath) ||
                (currentPage.includes(linkPath) && linkPath !== 'index.html' && linkPath !== '/')
            ) {
                link.classList.add('active');
                const parentDropdown = link.closest('.dropdown');
                if (parentDropdown) {
                    const dropdownToggle = parentDropdown.querySelector('.dropdown-toggle');
                    if (dropdownToggle) {
                        dropdownToggle.classList.add('active');
                    }
                }
            }
        });
    })();

    // --- Hero parallax ---
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scroll = window.pageYOffset;
            heroSection.style.backgroundPosition = `center ${scroll * 0.3}px`;
        });
    }

    // --- Function definitions ---

    function initMobileMenu() {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mainNav = document.querySelector('.main-nav');
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

        if (mobileMenuToggle && mainNav) {
            // Toggle menu
            mobileMenuToggle.addEventListener('click', function () {
                mainNav.classList.toggle('active');
                const icon = this.querySelector('i');
                if (mainNav.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });

            // Close menu on outside click
            document.addEventListener('click', function(event) {
                const isInsideNav = mainNav.contains(event.target);
                const isToggle = mobileMenuToggle.contains(event.target);
                const isMenuOpen = mainNav.classList.contains('active');
                if (!isInsideNav && !isToggle && isMenuOpen) {
                    mainNav.classList.remove('active');
                    const icon = mobileMenuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        }

        // Mobile dropdowns
        if (dropdownToggles.length > 0) {
            dropdownToggles.forEach(toggle => {
                toggle.addEventListener('click', function(e) {
                    if (window.innerWidth < 992) {
                        e.preventDefault();
                        const parent = this.parentElement;
                        parent.classList.toggle('active');
                        const icon = this.querySelector('i');
                        if (icon) {
                            icon.style.transform = parent.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
                        }
                    }
                });
            });
        }
    }

    function initTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabPanes = document.querySelectorAll('.tab-pane');

        if (tabBtns.length > 0 && tabPanes.length > 0) {
            tabBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const tabId = btn.dataset.tab;
                    tabBtns.forEach(b => b.classList.remove('active'));
                    tabPanes.forEach(p => p.classList.remove('active'));
                    btn.classList.add('active');
                    document.getElementById(tabId).classList.add('active');
                });
            });
        }
    }

    function initScrollAnimation() {
        const elements = document.querySelectorAll('.expertise-card, .service-card, .about-image, .value-box');

        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8;
        }

        function handleScrollAnimation() {
            elements.forEach(element => {
                if (isInViewport(element)) {
                    element.classList.add('animated');
                }
            });
        }

        handleScrollAnimation();
        window.addEventListener('scroll', handleScrollAnimation);
    }

    function initServiceCardEffects() {
        const serviceCards = document.querySelectorAll('.hero-services .service-card, .expertise-card');
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
            });
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }

});
