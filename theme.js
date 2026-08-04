// Theme toggle functionality - shared across all pages
(function() {
    'use strict';

    var themeToggle = document.getElementById('theme-toggle');
    var themeIconLight = document.querySelector('.theme-icon-light');
    var themeIconDark = document.querySelector('.theme-icon-dark');
    var srLiveRegion = document.querySelector('.theme-toggle .sr-only');

    if (!themeToggle) {
        return;
    }

    // Get saved theme from localStorage or default to 'light'
    var savedTheme = localStorage.getItem('chatview-theme') || 'light';

    // Set initial theme
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Update icon based on theme and initial aria state
    updateThemeState(savedTheme);

    // Theme toggle click handler
    themeToggle.addEventListener('click', function() {
        var currentTheme = document.documentElement.getAttribute('data-theme');
        var newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('chatview-theme', newTheme);
        updateThemeState(newTheme);
    });

    // Keyboard support - Space and Enter keys
    themeToggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            themeToggle.click();
        }
    });

    // Global keyboard shortcut - Ctrl+Shift+T
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.key === 'T') {
            e.preventDefault();
            themeToggle.click();
        }
    });

    // Update icon visibility and ARIA state based on current theme
    function updateThemeState(theme) {
        var isDark = theme === 'dark';

        if (isDark) {
            themeIconLight.style.display = 'none';
            themeIconDark.style.display = 'block';
        } else {
            themeIconLight.style.display = 'block';
            themeIconDark.style.display = 'none';
        }

        // Update ARIA attributes for accessibility
        themeToggle.setAttribute('aria-checked', isDark ? 'true' : 'false');
        themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');

        // Update screen reader live region for dynamic announcements
        if (srLiveRegion) {
            srLiveRegion.textContent = isDark ? 'Dark mode enabled' : 'Light mode enabled';
        }
    }
})();