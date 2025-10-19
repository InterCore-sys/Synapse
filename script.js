document.addEventListener('DOMContentLoaded', () => {
    const selectorBtn = document.getElementById('platform-selector-btn');
    const platformMenu = document.getElementById('platform-menu');
    const activeDisplay = document.getElementById('active-platform-display');
    const reviewsHeading = document.getElementById('reviews-heading');
    const currentTag = document.getElementById('current-tag');
    
    // Content Views
    const reviewViews = document.getElementById('review-views');
    const gitbutlerView = document.getElementById('gitbutler-view');
    const pipelinesView = document.getElementById('pipelines-view');
    const allContentViews = [reviewViews, gitbutlerView, pipelinesView];

    // Review Platform Views
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

    /** Switches the main content area based on the selected navigation link */
    const switchMainView = (viewId) => {
        hideAllViews();
        if (viewId === 'workspace') {
            gitbutlerView.classList.remove('hidden');
        } else if (viewId === 'pipelines') {
            pipelinesView.classList.remove('hidden');
        } else { // Default to reviews
            reviewViews.classList.remove('hidden');
            // Ensure the correct platform view is shown within the reviews section
            Object.values(platforms).forEach(p => {
                p.element.classList.toggle('hidden', p.element.id !== `${activePlatform}-view`);
            });
        }
    };

    /** Switches the active review platform (GH, GR, or GL) */
    const switchPlatformView = (platformKey) => {
        activePlatform = platformKey;
        
        // 1. Update the display chip
        const p = platforms[platformKey];
        activeDisplay.innerHTML = `<span class="platform-icon">${p.icon}</span> ${p.name} (${p.tag})`;
        
        // 2. Update the platform tag
        currentTag.textContent = `[${p.name}: ${p.tag}]`;
        
        // 3. Swap the active review content
        Object.values(platforms).forEach(item => {
            item.element.classList.toggle('hidden', item.element.id !== `${platformKey}-view`);
        });

        // 4. Update URL (Simulated)
        const path = (platformKey === 'gh') ? 'pulls' : (platformKey === 'gr' ? 'changes' : 'merge_requests');
        history.pushState(null, '', `/project/repo/${path}`);
    };

    // --- Event Listeners ---
    
    // Toggle the platform menu visibility
    selectorBtn.addEventListener('click', () => {
        const isExpanded = selectorBtn.getAttribute('aria-expanded') === 'true';
        selectorBtn.setAttribute('aria-expanded', !isExpanded);
        platformMenu.classList.toggle('hidden');
    });

    // Handle selection from the platform menu
    platformMenu.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', (e) => {
            const platformKey = e.target.dataset.platform;
            switchPlatformView(platformKey);
            platformMenu.classList.add('hidden'); // Close menu after selection
            selectorBtn.setAttribute('aria-expanded', 'false');
        });
    });

    // Handle main navigation clicks (Workspace, Pipelines, Code Reviews)
    document.querySelectorAll('nav a').forEach(navLink => {
        navLink.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector('nav .active-nav')?.classList.remove('active-nav');
            e.currentTarget.classList.add('active-nav');
            
            const viewId = e.currentTarget.getAttribute('href').substring(1);
            switchMainView(viewId);
        });
    });

    // Initial setup: start on reviews, GitHub view
    switchMainView('reviews'); 
    switchPlatformView('gh');
});
