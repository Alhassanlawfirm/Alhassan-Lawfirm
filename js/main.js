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
    
    // BULLETPROOF DROPDOWN SOLUTION
    // Wait a bit for DOM to be fully ready
    setTimeout(function() {
        const dropdowns = document.querySelectorAll('.dropdown');
        
        // Process each dropdown
        dropdowns.forEach((dropdown, index) => {
            const originalLink = dropdown.querySelector('> a');
            const submenu = dropdown.querySelector('.dropdown-menu');
            
            if (originalLink && submenu) {
                console.log(`Processing dropdown ${index}:`, dropdown);
                
                // Store original href for desktop use
                const originalHref = originalLink.getAttribute('href');
                
                // Create a completely new link element
                const newLink = document.createElement('a');
                newLink.innerHTML = originalLink.innerHTML;
                newLink.className = originalLink.className;
                
                // Set href conditionally
                if (isMobile()) {
                    newLink.setAttribute('href', '#');
                    newLink.setAttribute('data-original-href', originalHref);
                } else {
                    newLink.setAttribute('href', originalHref || '#');
                }
                
                // Replace the original link
                originalLink.parentNode.replaceChild(newLink, originalLink);
                
                // Add mobile-only click handler
                newLink.addEventListener('click', function(e) {
                    console.log('Link clicked, isMobile:', isMobile());
                    
                    if (isMobile()) {
                        // FORCE stop everything on mobile
                        e.preventDefault();
                        e.stopPropagation();
                        e.stopImmediatePropagation();
                        
                        console.log('Mobile click prevented');
                        
                        // Toggle dropdown
                        const isCurrentlyActive = dropdown.classList.contains('active');
                        
                        // Close all other dropdowns
                        dropdowns.forEach(otherDropdown => {
                            if (otherDropdown !== dropdown) {
                                otherDropdown.classList.remove('active');
                            }
                        });
                        
                        // Toggle current dropdown
                        if (isCurrentlyActive) {
                            dropdown.classList.remove('active');
                            console.log('Dropdown closed');
                        } else {
                            dropdown.classList.add('active');
                            console.log('Dropdown opened');
                        }
                        
                        return false;
                    } else {
                        // Desktop: restore original href if it exists and navigate
                        const originalHref = this.getAttribute('data-original-href');
                        if (originalHref && originalHref !== '#' && originalHref !== '') {
                            this.setAttribute('href', originalHref);
                        }
                    }
                });
                
                // Disable ALL hover/focus events on mobile
                ['mouseenter', 'mouseover', 'focus', 'touchstart'].forEach(eventType => {
                    dropdown.addEventListener(eventType, function(e) {
                        if (isMobile()) {
                            e.preventDefault();
                            e.stopPropagation();
                            return false;
                        }
                    });
                });
            }
        });
        
        // Handle window resize - update href attributes
        window.addEventListener('resize', function() {
            dropdowns.forEach(dropdown => {
                const link = dropdown.querySelector('> a');
                if (link) {
                    const originalHref = link.getAttribute('data-original-href');
                    
                    if (isMobile()) {
                        link.setAttribute('href', '#');
                        dropdown.classList.remove('active');
                    } else {
                        link.setAttribute('href', originalHref || '#');
                        dropdown.classList.remove('active');
                    }
                }
            });
            
            // Close mobile menu if switching to desktop
            if (!isMobile()) {
                mainNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
        
    }, 100); // Small delay to ensure DOM is ready
    
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
            const isDropdownParent = parentDropdown && parentDropdown.querySelector('> a') === clickedLink;
            
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
    
    // Clients Slider
    const clientsSlider = document.querySelector('.clients-slider');
    
    if (clientsSlider && clientsSlider.children.length > 0) {
        setInterval(() => {
            clientsSlider.appendChild(clientsSlider.children[0]);
        }, 3000);
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