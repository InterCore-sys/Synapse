document.addEventListener('DOMContentLoaded', () => {
    const selectorBtn = document.getElementById('platform-selector-btn');
    const platformMenu = document.getElementById('platform-menu');
    const activeDisplay = document.getElementById('active-platform-display');
    const currentTag = document.getElementById('current-tag');
    const navLinks = document.querySelectorAll('nav a');

    // Content Views (Main Sections)
    const reviewViewsContainer = document.getElementById('review-views');
    const gitbutlerView = document.getElementById('gitbutler-view');
    const pipelinesView = document.getElementById('pipelines-view');
    const allContentViews = [reviewViewsContainer, gitbutlerView, pipelinesView];

    // Review Platform Views (Nested Sections)
    const platforms = {
        'gh': { name: 'GitHub', tag: 'Pulls', element: document.getElementById('gh-view'), icon: '🐙' },
        'gr': { name: 'Gerrit', tag: 'Changes', element: document.getElementById('gr-view'), icon: 'G' },
        'gl': { name: 'GitLab', tag: 'Merge Requests', element: document.getElementById('gl-view'), icon: '🦊' }
    };
    
    let activePlatform = 'gh'; // Default to GitHub

    /** Hides all main content sections */
    const hideAllViews = () => {
        allContentViews.forEach(view => view.classList.add('hidden'));
    };

    /** * Switches the main content area based on the selected navigation link.
     * @param {string} viewId - The ID of the view to show ('workspace', 'pipelines', or 'reviews')
     */
    const switchMainView = (viewId) => {
        hideAllViews();
        
        // Hide the platform selector when not on the Code Reviews page
        selectorBtn.parentElement.classList.toggle('hidden', viewId !== 'reviews');

        if (viewId === 'workspace') {
            gitbutlerView.classList.remove('hidden');
        } else if (viewId === 'pipelines') {
            pipelinesView.classList.remove('hidden');
        } else if (viewId === 'reviews') {
            reviewViewsContainer.classList.remove('hidden');
            // Ensure the currently active platform view is shown within the reviews container
            Object.values(platforms).forEach(p => {
                p.element.classList.toggle('hidden', p.element.id !== `${activePlatform}-view`);
            });
        }
        
        // Update URL (Simulated based on main view)
        history.pushState(null, '', `/project/repo/${viewId}`);
    };

    /** * Switches the active review platform (GH, GR, or GL).
     * @param {string} platformKey - 'gh', 'gr', or 'gl'
     */
    const switchPlatformView = (platformKey) => {
        activePlatform = platformKey;
        
        const p = platforms[platformKey];
        
        // 1. Update the display chip
        activeDisplay.innerHTML = `${p.icon} ${p.name} (${p.tag})`;
        
        // 2. Update the platform tag
        currentTag.textContent = `[${p.name}: ${p.tag}]`;
        
        // 3. Swap the active review content
        Object.values(platforms).forEach(item => {
            // Only the element matching the activePlatformKey should be visible
            item.element.classList.toggle('hidden', item.element.id !== `${platformKey}-view`);
        });

        // 4. Update URL (Simulated)
        const pathSegment = (platformKey === 'gh') ? 'pulls' : (platformKey === 'gr' ? 'changes' : 'merge_requests');
        history.pushState(null, '', `/project/repo/reviews/${pathSegment}`);
    };

    // --- Event Listeners ---
    
    // Toggle the platform menu visibility
    selectorBtn.addEventListener('click', () => {
        const isExpanded = selectorBtn.getAttribute('aria-expanded') === 'true';
        selectorBtn.setAttribute('aria-expanded', !isExpanded);
        // Toggle the 'hidden' class on the menu
        platformMenu.classList.toggle('hidden'); 
    });

    // Handle selection from the platform menu
    platformMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const platformKey = e.target.dataset.platform;
            switchPlatformView(platformKey);
            platformMenu.classList.add('hidden'); // Close menu after selection
            selectorBtn.setAttribute('aria-expanded', 'false');
        }
    });

    // Handle main navigation clicks
    navLinks.forEach(navLink => {
        navLink.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 1. Update active nav class
            document.querySelector('nav .active-nav')?.classList.remove('active-nav');
            e.currentTarget.classList.add('active-nav');
            
            // 2. Switch the main content view
            const viewId = e.currentTarget.getAttribute('href').substring(1);
            switchMainView(viewId);
        });
    });

    // Initial setup: start on reviews, GitHub view
    // Set the Reviews link to active
    document.getElementById('nav-reviews').classList.add('active-nav');
    // Ensure the main content view is set correctly
    switchMainView('reviews'); 
    // Ensure the default platform view is set correctly
    switchPlatformView('gh');
});
