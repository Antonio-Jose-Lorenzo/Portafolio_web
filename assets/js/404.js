$(document).ready(function(){
    const menuButton = $('#menu');
    const navbar = $('.navbar');

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

    navbar.find('a').on('click', function(){
        menuButton
            .removeClass('fa-times')
            .addClass('fa-bars')
            .attr('aria-expanded', 'false')
            .attr('aria-label', window.PortfolioLanguage?.t('menu-open') || 'Open navigation menu');
        navbar.removeClass('nav-toggle');
    });
    $(document).on('keydown', function(event){
        if (event.key === 'Escape') {
            menuButton
                .removeClass('fa-times')
                .addClass('fa-bars')
                .attr('aria-expanded', 'false')
                .attr('aria-label', window.PortfolioLanguage?.t('menu-open') || 'Open navigation menu');
            navbar.removeClass('nav-toggle');
        }
    });
    $(document).on('click', function(event){
        if (!navbar[0].contains(event.target) && !menuButton[0].contains(event.target)) {
            menuButton
                .removeClass('fa-times')
                .addClass('fa-bars')
                .attr('aria-expanded', 'false')
                .attr('aria-label', window.PortfolioLanguage?.t('menu-open') || 'Open navigation menu');
            navbar.removeClass('nav-toggle');
        }
    });
});