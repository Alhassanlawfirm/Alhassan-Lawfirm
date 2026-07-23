// Bulletproof Mobile Dropdown Fix for Al-Hassan Law Firm Website

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile detection
    function isMobile() {
        return window.innerWidth <= 992;
    }
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
    }
    
    // ===== قوائم الجوال: زر + لفتح التفاصيل، والرابط نفسه يفتح الصفحة =====
    setTimeout(function() {
        const dropdowns = document.querySelectorAll('.dropdown');

        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector(':scope > a');
            const submenu = dropdown.querySelector('.dropdown-menu');
            if (!link || !submenu) return;

            // إنشاء زر التوسيع (+) — يظهر في الجوال فقط عبر CSS
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'dropdown-toggle-btn';
            btn.setAttribute('aria-expanded', 'false');
            btn.setAttribute('aria-label', 'عرض القائمة الفرعية');
            btn.textContent = '+';
            dropdown.insertBefore(btn, submenu);

            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const isActive = dropdown.classList.contains('active');

                // إغلاق القوائم الأخرى
                dropdowns.forEach(d => {
                    if (d !== dropdown) {
                        d.classList.remove('active');
                        const b = d.querySelector('.dropdown-toggle-btn');
                        if (b) { b.textContent = '+'; b.setAttribute('aria-expanded', 'false'); }
                    }
                });

                dropdown.classList.toggle('active', !isActive);
                btn.textContent = isActive ? '+' : '\u2212';
                btn.setAttribute('aria-expanded', String(!isActive));
            });
        });

        // عند تكبير الشاشة للديسكتوب: إغلاق كل القوائم وإعادة الأزرار
        window.addEventListener('resize', function() {
            if (!isMobile()) {
                dropdowns.forEach(d => {
                    d.classList.remove('active');
                    const b = d.querySelector('.dropdown-toggle-btn');
                    if (b) { b.textContent = '+'; b.setAttribute('aria-expanded', 'false'); }
                });
                if (mainNav) mainNav.classList.remove('active');
                if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
            }
        });

    }, 100);
    
    // Enhanced Mobile Menu Scrolling
    if (mainNav) {
        mainNav.addEventListener('touchstart', function(e) {
            this.style.webkitOverflowScrolling = 'touch';
        });
        
        // Handle clicks on non-dropdown links
        mainNav.addEventListener('click', function(e) {
            const clickedLink = e.target.closest('a');
            if (!clickedLink) return;
            
            const parentDropdown = clickedLink.closest('.dropdown');
            const isDropdownParent = parentDropdown && parentDropdown.querySelector(':scope > a') === clickedLink;
            
            // If it's not a dropdown parent link (i.e., it's a regular link or dropdown child)
            if (!isDropdownParent && isMobile()) {
                // Close mobile menu
                mainNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                
                // Close all dropdowns
                document.querySelectorAll('.dropdown').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    }
    
    // Close dropdowns when clicking outside (mobile only)
    document.addEventListener('click', function(e) {
        if (isMobile()) {
            const clickedInsideNav = e.target.closest('.main-nav');
            const clickedMenuToggle = e.target.closest('.mobile-menu-toggle');
            
            if (!clickedInsideNav && !clickedMenuToggle) {
                document.querySelectorAll('.dropdown').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        }
    });
    
    // Rest of your existing code...
    // Back to Top Button
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });
        
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Form Validation
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // تجاهل نماذج Netlify — يتولاها معالج AJAX الخاص بها لإرسالها فعلياً.
        if (form.hasAttribute('data-netlify') || form.getAttribute('name') === 'contact') {
            return;
        }
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (isValid) {
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'تم إرسال النموذج بنجاح!';
                
                form.appendChild(successMessage);
                form.reset();
                
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            }
        });
    });
    
    // Smooth Scroll for Anchor Links
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                if (mainNav && mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
                
                document.documentElement.classList.add('smooth-scroll');
                
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                setTimeout(() => {
                    document.documentElement.classList.remove('smooth-scroll');
                }, 1000);
            }
        });
    });
    
    // Language Switcher
    const languageSwitch = document.querySelector('.language-switch a');
    
    if (languageSwitch) {
        languageSwitch.addEventListener('click', function(e) {
            // Language switching logic here
        });
    }
    
    // Add active class to current page link
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentLocation || 
            currentLocation.includes(link.getAttribute('href')) && link.getAttribute('href') !== 'index.html') {
            link.classList.add('active');
        }
    });
});