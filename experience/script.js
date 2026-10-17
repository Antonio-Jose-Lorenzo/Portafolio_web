$(document).ready(function(){
    const menuButton = $('#menu');
    const navbar = $('.navbar');

    function closeMenu() {
        menuButton
            .removeClass('fa-times')
            .addClass('fa-bars')
            .attr('aria-expanded', 'false')
            .attr('aria-label', window.PortfolioLanguage?.t('menu-open') || 'Open navigation menu');
        navbar.removeClass('nav-toggle');
    }

    menuButton.on('click', function(){
        const isOpen = $(this).attr('aria-expanded') !== 'true';
        $(this)
            .toggleClass('fa-times', isOpen)
            .toggleClass('fa-bars', !isOpen)
            .attr('aria-expanded', String(isOpen))
            .attr('aria-label', window.PortfolioLanguage?.t(isOpen ? 'menu-close' : 'menu-open') ||
                (isOpen ? 'Close navigation menu' : 'Open navigation menu'));
        navbar.toggleClass('nav-toggle', isOpen);
    });

    navbar.find('a').on('click', closeMenu);
    $(document).on('keydown', function (event) {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });
    $(document).on('click', function (event) {
        if (
            navbar.hasClass('nav-toggle') &&
            !navbar[0].contains(event.target) &&
            !menuButton[0].contains(event.target)
        ) {
            closeMenu();
        }
    });
    $(window).on('scroll load',function(){
        $('#scroll-top').toggleClass('active', window.scrollY > 60);
    });
});

// Keep every experience card visible immediately instead of hiding it behind an animation.
