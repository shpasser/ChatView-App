// Theme toggle functionality - shared across all pages
(function() {
    'use strict';

    var themeToggle = document.getElementById('theme-toggle');
    var themeIconLight = document.querySelector('.theme-icon-light');
    var themeIconDark = document.querySelector('.theme-icon-dark');

    if (!themeToggle) {
        return;
    }

    // Get saved theme from localStorage or default to 'light'
    var savedTheme = localStorage.getItem('chatview-theme') || 'light';

    // Set initial theme
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Update icon based on theme
    updateThemeIcon(savedTheme);

    // Theme toggle click handler
    themeToggle.addEventListener('click', function() {
        var currentTheme = document.documentElement.getAttribute('data-theme');
        var newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('chatview-theme', newTheme);
        updateThemeIcon(newTheme);
    });

    // Update icon visibility based on current theme
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIconLight.style.display = 'none';
            themeIconDark.style.display = 'block';
        } else {
            themeIconLight.style.display = 'block';
            themeIconDark.style.display = 'none';
        }
    }
})();