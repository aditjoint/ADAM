/**
 * ADIT Joint - Unified Main JavaScript
 * Handles header, dropdowns, mobile menu, daily backgrounds, and scroll animations
 */
document.addEventListener('DOMContentLoaded', function() {

    const main = document.querySelector("main");
    const headerPlaceholder = document.getElementById("header-placeholder");

    /** Adjust main padding below header */
    function adjustMainPadding() {
        const header = document.querySelector("header");
        if(header && main) {
            main.style.paddingTop = header.offsetHeight + "px";
        }
    }

    // Initial adjustment
    adjustMainPadding();

    // Observe dynamic header injection
    if(headerPlaceholder) {
        const observer = new MutationObserver(() => adjustMainPadding());
        observer.observe(headerPlaceholder, { childList: true, subtree: true });
    }

    // Adjust on window resize
    window.addEventListener("resize", adjustMainPadding);

    /** Set daily background image */
    (function setDailyBackground() {
        const today = new Date();
        const day = today.getDate(); // 1-31
        const body = document.body;
        // Remove previous day classes
        body.className = body.className.replace(/\bday\d{1,2}\b/g, '');
        body.classList.add(`day${day}`);
        // Optional overlay: already handled via CSS
    })();

    /** Initialize mobile menu toggle */
    function initMobileMenu() {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mainNav = document.querySelector('.main-nav');

        if(mobileMenuToggle && mainNav) {
            mobileMenuToggle.addEventListener('click', function () {
                mainNav.classList.toggle('active');
                const icon = this.querySelector('i');
                if(icon) {
                    icon.classList.toggle('fa-bars');
                    icon.classList.toggle('fa-times');
                }
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(event) {
                const isInsideNav = mainNav.contains(event.target);
                const isToggle = mobileMenuToggle.contains(event.target);
                if(!isInsideNav && !isToggle && mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    const icon = mobileMenuToggle.querySelector('i');
                    if(icon) {
                        icon.classList.add('fa-bars');
                        icon.classList.remove('fa-times');
                    }
                }
            });
        }
    }

    /** Initialize dropdowns: click for mobile, hover for desktop */
    function initDropdowns() {
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e){
                if(window.innerWidth < 992) { // mobile only
                    e.preventDefault();
                    const parent = this.parentElement;
                    parent.classList.toggle('active');
                    const icon = this.querySelector('i');
                    if(icon) {
                        icon.style.transform = parent.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
                    }
                }
            });
        });
    }

    /** Initialize tabs */
    function initTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabPanes = document.querySelectorAll('.tab-pane');
        if(tabBtns.length > 0 && tabPanes.length > 0) {
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

    /** Smooth scroll for anchors */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e){
            if(this.classList.contains('dropdown-toggle')) return;
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if(targetEl) {
                e.preventDefault();
                window.scrollTo({
                    top: targetEl.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    /** Highlight current navigation link */
    (function highlightCurrentPage() {
        const currentPage = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            if(link.classList.contains('dropdown-toggle')) return;
            if(currentPage.endsWith(linkPath) || (currentPage.includes(linkPath) && linkPath !== 'index.html' && linkPath !== '/')) {
                link.classList.add('active');
                const parentDropdown = link.closest('.dropdown');
                if(parentDropdown) {
                    const dropdownToggle = parentDropdown.querySelector('.dropdown-toggle');
                    if(dropdownToggle) dropdownToggle.classList.add('active');
                }
            }
        });
    })();

    // Initialize all
    initMobileMenu();
    initDropdowns();
    initTabs();
});
