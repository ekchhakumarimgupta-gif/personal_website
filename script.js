/**
 * Portfolio Interactive Script - Mohammad Raza
 * Vanilla JavaScript implementation for SPA section switching, 
 * URL hash navigation, accessibility state updates, and smooth transitions.
 */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. ELEMENT SELECTIONS & STATE VARIABLES
    // ----------------------------------------------------------------------
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    // Prevent overlapping animations during fast clicks
    let isTransitioning = false;
    const TRANSITION_DURATION_MS = 300; // Matches CSS transition duration (300ms)

    // Valid section identifiers
    const VALID_SECTIONS = ['about', 'work'];

    // ----------------------------------------------------------------------
    // 2. CORE SECTION SWITCHING LOGIC
    // ----------------------------------------------------------------------
    /**
     * Switches the displayed section with a smooth fade-out and fade-in transition.
     * @param {string} targetSectionId - The target section name ('about' or 'work')
     * @param {boolean} updateHistory - Whether to update the URL hash in browser history
     */
    function switchSection(targetSectionId, updateHistory = true) {
        // Validate section ID; default to 'about' if invalid
        if (!VALID_SECTIONS.includes(targetSectionId)) {
            targetSectionId = 'about';
        }

        const currentPanel = document.querySelector('.tab-panel.active');
        const targetPanel = document.getElementById(`section-${targetSectionId}`);
        const targetButton = document.getElementById(`btn-${targetSectionId}`);

        // If target panel is already active or an animation is in progress, do nothing
        if (!targetPanel || targetPanel === currentPanel || isTransitioning) {
            return;
        }

        isTransitioning = true;

        // Step A: Fade out current active section
        if (currentPanel) {
            currentPanel.classList.add('fade-out');
        }

        // Step B: Wait for fade-out animation to complete, then swap sections
        setTimeout(() => {
            // Hide current panel
            if (currentPanel) {
                currentPanel.classList.remove('active', 'fade-out');
                currentPanel.classList.add('hidden');
            }

            // Reveal target panel
            targetPanel.classList.remove('hidden');
            targetPanel.classList.add('active', 'fade-in');

            // Clean up animation class after fade-in finishes
            setTimeout(() => {
                targetPanel.classList.remove('fade-in');
                isTransitioning = false;
            }, TRANSITION_DURATION_MS);

            // Update button UI and ARIA states
            updateTabStates(targetButton);

            // Update browser URL hash without scrolling the page
            if (updateHistory && window.location.hash !== `#${targetSectionId}`) {
                history.pushState(null, '', `#${targetSectionId}`);
            }
        }, TRANSITION_DURATION_MS);
    }

    // ----------------------------------------------------------------------
    // 3. ACCESSIBILITY & BUTTON STATE UPDATES
    // ----------------------------------------------------------------------
    /**
     * Updates active classes and ARIA attributes on tab buttons.
     * @param {HTMLElement} activeBtn - The button to activate
     */
    function updateTabStates(activeBtn) {
        navButtons.forEach(btn => {
            const isActive = (btn === activeBtn);
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
            btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
            btn.setAttribute('tabindex', isActive ? '0' : '-1');
        });
    }

    // ----------------------------------------------------------------------
    // 4. EVENT LISTENERS: CLICK, KEYBOARD & HASH NAVIGATION
    // ----------------------------------------------------------------------
    
    // Attach click handlers to navigation buttons
    navButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const targetSection = e.currentTarget.getAttribute('data-target');
            switchSection(targetSection, true);
        });
    });

    // Keyboard navigation (Arrow keys & Home/End) for ARIA tablist standards
    const tabList = document.querySelector('.nav-controls');
    if (tabList) {
        tabList.addEventListener('keydown', (e) => {
            const buttonsArray = Array.from(navButtons);
            const currentIndex = buttonsArray.indexOf(document.activeElement);

            if (currentIndex === -1) return;

            let nextIndex = null;

            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                nextIndex = (currentIndex + 1) % buttonsArray.length;
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                nextIndex = (currentIndex - 1 + buttonsArray.length) % buttonsArray.length;
            } else if (e.key === 'Home') {
                nextIndex = 0;
            } else if (e.key === 'End') {
                nextIndex = buttonsArray.length - 1;
            }

            if (nextIndex !== null) {
                e.preventDefault();
                buttonsArray[nextIndex].focus();
                const targetSection = buttonsArray[nextIndex].getAttribute('data-target');
                switchSection(targetSection, true);
            }
        });
    }

    // Handle browser back / forward buttons (popstate event)
    window.addEventListener('popstate', () => {
        const hash = window.location.hash.replace('#', '') || 'about';
        switchSection(hash, false);
    });

    // ----------------------------------------------------------------------
    // 5. INITIAL PAGE LOAD HANDLER
    // ----------------------------------------------------------------------
    function initPortfolio() {
        // Parse initial URL hash (e.g. #work or #about)
        const initialHash = window.location.hash.replace('#', '');
        
        if (initialHash && VALID_SECTIONS.includes(initialHash)) {
            // Activate the section indicated in the URL hash immediately without transition delay
            const targetPanel = document.getElementById(`section-${initialHash}`);
            const targetButton = document.getElementById(`btn-${initialHash}`);
            
            tabPanels.forEach(panel => {
                panel.classList.add('hidden');
                panel.classList.remove('active');
            });

            if (targetPanel && targetButton) {
                targetPanel.classList.remove('hidden');
                targetPanel.classList.add('active');
                updateTabStates(targetButton);
            }
        } else {
            // Default to 'about' section on clean load
            updateTabStates(document.getElementById('btn-about'));
        }
    }

    // Initialize application
    initPortfolio();
});
