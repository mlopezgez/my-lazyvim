// Navigation Module for Vim Ninja Guide
// Handles mobile menu, active nav highlighting, and TOC generation

(function() {
    'use strict';

    // Mobile menu toggle
    function initMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const mainNav = document.getElementById('main-nav');

        if (hamburger && mainNav) {
            hamburger.addEventListener('click', function() {
                mainNav.classList.toggle('mobile-open');
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!hamburger.contains(e.target) && !mainNav.contains(e.target)) {
                    mainNav.classList.remove('mobile-open');
                }
            });

            // Close menu when a link is clicked
            mainNav.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', function() {
                    mainNav.classList.remove('mobile-open');
                });
            });
        }
    }

    // Highlight active page in navigation
    function highlightActivePage() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.main-nav a');

        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            if (currentPath.includes(linkPath)) {
                link.classList.add('active');
            }
        });
    }

    // Generate Table of Contents from headings
    function generateTOC() {
        const tocSidebar = document.querySelector('.toc-sidebar');
        if (!tocSidebar) return;

        const lessonContent = document.querySelector('.lesson-content');
        if (!lessonContent) return;

        const headings = lessonContent.querySelectorAll('h2, h3');
        if (headings.length === 0) return;

        const tocList = document.createElement('ul');
        tocList.className = 'toc-list';

        headings.forEach((heading, index) => {
            // Create anchor ID if it doesn't exist
            if (!heading.id) {
                heading.id = heading.textContent
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '');
            }

            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `#${heading.id}`;
            a.textContent = heading.textContent;

            if (heading.tagName === 'H3') {
                a.classList.add('toc-h3');
            }

            a.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.getElementById(heading.id);
                if (target) {
                    // Smooth scroll with offset for fixed header
                    const headerOffset = 100;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Update active TOC link
                    updateActiveTOCLink(heading.id);
                }
            });

            li.appendChild(a);
            tocList.appendChild(li);
        });

        // Clear existing content and add new TOC
        const existingList = tocSidebar.querySelector('.toc-list');
        if (existingList) {
            existingList.remove();
        }
        tocSidebar.appendChild(tocList);
    }

    // Update active TOC link based on scroll position
    function updateActiveTOCLink(activeId) {
        const tocLinks = document.querySelectorAll('.toc-list a');
        tocLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${activeId}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Scroll spy for TOC
    function initScrollSpy() {
        const lessonContent = document.querySelector('.lesson-content');
        if (!lessonContent) return;

        const headings = lessonContent.querySelectorAll('h2, h3');
        if (headings.length === 0) return;

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateActiveTOCLink(entry.target.id);
                }
            });
        }, {
            rootMargin: '-100px 0px -66% 0px'
        });

        headings.forEach(heading => {
            if (heading.id) {
                observer.observe(heading);
            }
        });
    }

    // Smooth scroll for all anchor links
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 100;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Add copy button to code blocks
    function initCodeBlockCopyButtons() {
        document.querySelectorAll('pre code').forEach(codeBlock => {
            const pre = codeBlock.parentElement;
            const button = document.createElement('button');
            button.className = 'copy-button';
            button.textContent = 'Copy';
            button.style.cssText = `
                position: absolute;
                top: 0.5rem;
                right: 0.5rem;
                padding: 0.25rem 0.75rem;
                background: var(--accent-blue);
                color: var(--bg-primary);
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 0.85rem;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;

            pre.style.position = 'relative';
            pre.appendChild(button);

            pre.addEventListener('mouseenter', () => {
                button.style.opacity = '1';
            });

            pre.addEventListener('mouseleave', () => {
                button.style.opacity = '0';
            });

            button.addEventListener('click', async () => {
                const code = codeBlock.textContent;
                try {
                    await navigator.clipboard.writeText(code);
                    button.textContent = 'Copied!';
                    setTimeout(() => {
                        button.textContent = 'Copy';
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy:', err);
                    button.textContent = 'Failed';
                    setTimeout(() => {
                        button.textContent = 'Copy';
                    }, 2000);
                }
            });
        });
    }

    // Add copy button to keybind badges
    function initKeybindCopyButtons() {
        document.querySelectorAll('kbd').forEach(kbd => {
            const wrapper = document.createElement('span');
            wrapper.className = 'keybind';

            kbd.parentNode.insertBefore(wrapper, kbd);
            wrapper.appendChild(kbd);

            const button = document.createElement('button');
            button.className = 'copy-keybind';
            button.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
            `;
            button.setAttribute('aria-label', 'Copy keybind');

            wrapper.appendChild(button);

            button.addEventListener('click', async () => {
                const text = kbd.textContent;
                try {
                    await navigator.clipboard.writeText(text);
                    button.innerHTML = '✓';
                    setTimeout(() => {
                        button.innerHTML = `
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                        `;
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy:', err);
                }
            });
        });
    }

    // Initialize fade-in animations on scroll
    function initFadeInAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe sections on lesson pages
        document.querySelectorAll('.lesson-content > section, .practice-exercise, .workflow-pattern, .tip-box, .warning-box').forEach(el => {
            observer.observe(el);
        });
    }

    // Initialize on page load
    document.addEventListener('DOMContentLoaded', function() {
        initMobileMenu();
        highlightActivePage();
        generateTOC();
        initScrollSpy();
        initSmoothScroll();
        initCodeBlockCopyButtons();
        initKeybindCopyButtons();
        initFadeInAnimations();
    });

})();
