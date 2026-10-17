$(document).ready(function () {
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

    menuButton.on('click', function () {
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
    $(window).on('scroll load', function () {
        $('#scroll-top').toggleClass('active', window.scrollY > 60);
    });
});

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[character]));
}

function isUsableLink(value) {
    return typeof value === 'string' && /^https?:\/\//i.test(value.trim());
}

let selectedProjectFilter = '*';

function getProjects() {
    return fetch('/projects/projects.json').then(response => {
        if (!response.ok) {
            throw new Error(`Unable to load projects (${response.status})`);
        }
        return response.json();
    }).then(projects => {
        if (!Array.isArray(projects)) {
            throw new Error('Expected projects.json to contain an array.');
        }
        return projects;
    });
}

function showProjects(projects) {
    const container = document.querySelector('.work .box-container');
    const language = window.PortfolioLanguage?.current || 'en';
    const validProjects = projects.filter(project =>
        project &&
        project.name &&
        project.desc &&
        project.category &&
        project.category !== 'android' &&
        project.links &&
        (isUsableLink(project.links.view) || isUsableLink(project.links.code))
    );

    if (!validProjects.length) {
        const message = window.PortfolioLanguage?.t('projects-empty') ||
            'Project details are being updated. Please check back soon.';
        container.innerHTML = `<p class="empty-state">${escapeHTML(message)}</p>`;
        return;
    }

    container.innerHTML = validProjects.map(project => `
        <div class="grid-item ${escapeHTML(project.category)}">
          <article class="box tilt">
            ${project.image ? `<img draggable="false" src="/assets/images/projects/${escapeHTML(project.image)}.png" alt="" loading="lazy" />` : ''}
            <div class="content">
              <div class="tag"><h3>${escapeHTML(project[`name_${language}`] || project.name)}</h3></div>
              <div class="desc">
                <p>${escapeHTML(project[`desc_${language}`] || project.desc)}</p>
                <div class="btns">
                  ${isUsableLink(project.links.view) ? `<a href="${escapeHTML(project.links.view)}" class="btn" target="_blank" rel="noopener noreferrer"><i class="fas fa-eye" aria-hidden="true"></i> ${escapeHTML(window.PortfolioLanguage?.t('projects-view') || 'View')}</a>` : ''}
                  ${isUsableLink(project.links.code) ? `<a href="${escapeHTML(project.links.code)}" class="btn" target="_blank" rel="noopener noreferrer">${escapeHTML(window.PortfolioLanguage?.t('projects-code') || 'Code')} <i class="fas fa-code" aria-hidden="true"></i></a>` : ''}
                </div>
              </div>
            </div>
          </article>
        </div>`).join('');

    container.querySelectorAll('img').forEach(image => {
        image.addEventListener('error', () => image.remove(), { once: true });
    });

    const grid = $('.work .box-container').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows'
    });
    grid.isotope({ filter: selectedProjectFilter });

    $('.button-group').off('click', 'button').on('click', 'button', function () {
        $('.button-group').find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
        selectedProjectFilter = $(this).attr('data-filter');
        grid.isotope({ filter: selectedProjectFilter });
    });
}

// Re-render localized cards when the visitor switches languages.
document.addEventListener('portfolio:languagechange', function () {
    if (window.loadedProjects) {
        showProjects(window.loadedProjects);
    } else {
        const emptyState = document.querySelector('.work .box-container .empty-state');
        if (emptyState) {
            const key = emptyState.classList.contains('error') ? 'projects-error' : 'projects-empty';
            emptyState.textContent = window.PortfolioLanguage.t(key);
        }
    }
});

getProjects()
    .then(projects => {
        window.loadedProjects = projects;
        showProjects(projects);
    })
    .catch(error => {
        console.error('Error loading projects:', error);
        const container = document.querySelector('.work .box-container');
        if (container) {
            const message = window.PortfolioLanguage?.t('projects-error') ||
                'Projects could not be loaded. Please try again later.';
            container.innerHTML = `<p class="empty-state error">${escapeHTML(message)}</p>`;
        }
    });
