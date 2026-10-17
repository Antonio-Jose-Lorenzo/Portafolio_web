$(document).ready(function () {
    const menuButton = $('#menu');
    const navbar = $('.navbar');
    const closeMenu = function () {
        menuButton
            .removeClass('fa-times')
            .addClass('fa-bars')
            .attr('aria-expanded', 'false')
            .attr('aria-label', window.PortfolioLanguage?.t('menu-open') || 'Open navigation menu');
        navbar.removeClass('nav-toggle');
    };

    menuButton.on('click', function () {
        const isOpen = $(this).attr('aria-expanded') !== 'true';
        $(this).toggleClass('fa-times', isOpen).toggleClass('fa-bars', !isOpen);
        $(this)
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

        const currentSection = $('section[id]').toArray().find(function (section) {
            const bounds = section.getBoundingClientRect();
            return bounds.top <= 200 && bounds.bottom > 200;
        });
        if (currentSection) {
            navbar.find('a').removeClass('active').removeAttr('aria-current');
            navbar.find(`a[href="#${currentSection.id}"]`)
                .addClass('active')
                .attr('aria-current', 'location');
        }
    });

    $('a[href^="#"]').on('click', function (e) {
        const target = document.getElementById(this.hash.slice(1));
        if (!target) {
            return;
        }
        e.preventDefault();
        target.scrollIntoView({
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
            block: 'start'
        });
    });

    $('#contact-form').on('submit', function (event) {
        event.preventDefault();
        const form = this;
        const submitButton = form.querySelector('button[type="submit"]');
        const status = document.getElementById('contact-status');

        if (!window.emailjs) {
            status.textContent = window.PortfolioLanguage?.t('form-unavailable') ||
                'The contact service is unavailable. Please email me directly.';
            status.classList.add('error');
            return;
        }

        submitButton.disabled = true;
        status.textContent = window.PortfolioLanguage?.t('form-sending') || 'Sending your message...';
        status.classList.remove('error');
        Promise.resolve()
            .then(function () {
                emailjs.init('user_TTDmetQLYgWCLzHTDgqxm');
                return emailjs.sendForm('contact_service', 'template_contact', form);
            })
            .then(function () {
                form.reset();
                status.textContent = window.PortfolioLanguage?.t('form-success') ||
                    'Thanks for reaching out. Your message has been sent.';
            })
            .catch(function () {
                status.textContent = window.PortfolioLanguage?.t('form-error') ||
                    'Your message could not be sent. Please try again or email me directly.';
                status.classList.add('error');
            })
            .finally(function () {
                submitButton.disabled = false;
            });
    });
});

async function fetchData(type = 'skills') {
    const paths = {
        skills: './skills.json',
        projects: './projects/projects.json',
        certifications: './certifications.json'
    };
    const path = paths[type];
    const response = await fetch(path);
    if (!response.ok) {
        throw new Error(`Unable to load ${path} (${response.status})`);
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
        throw new Error(`Expected an array in ${path}`);
    }
    return data;
}

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

let homeProjects = null;
let homeProjectsFailed = false;
const visibleSkillsLimit = 12;
let loadedSkills = null;
let skillsExpanded = false;
let loadedCertifications = null;
let certificationsLoadFailed = false;

function getCertificationPreviewUrl(certification) {
    if (isUsableLink(certification.previewUrl)) {
        return certification.previewUrl;
    }
    if (!isUsableLink(certification.url)) {
        return null;
    }

    const megaFile = certification.url.match(/^https:\/\/(?:www\.)?mega\.nz\/file\/([A-Za-z0-9_-]+)(#[A-Za-z0-9_-]+)$/i);
    if (megaFile) {
        return `https://mega.nz/embed/${megaFile[1]}${megaFile[2]}`;
    }
    const credlyBadge = certification.url.match(/^https:\/\/(?:www\.)?credly\.com\/badges\/([a-f0-9-]+)\/public_url(?:[?#].*)?$/i);
    if (credlyBadge) {
        return `https://www.credly.com/embedded_badge/${credlyBadge[1]}`;
    }
    return null;
}

function renderSkills() {
    const container = document.getElementById('skillsContainer');
    const toggle = document.getElementById('skills-toggle');
    if (!container || !loadedSkills) {
        return;
    }

    const visibleSkills = skillsExpanded
        ? loadedSkills
        : loadedSkills.slice(0, visibleSkillsLimit);

    container.innerHTML = visibleSkills.map(skill => `
        <div class="bar">
            <div class="info">
                <img src="${escapeHTML(skill.icon)}" alt="" loading="lazy" />
                <span>${escapeHTML(skill.name)}</span>
            </div>
        </div>`).join('');

    if (toggle) {
        toggle.hidden = loadedSkills.length <= visibleSkillsLimit;
        toggle.setAttribute('aria-expanded', String(skillsExpanded));
        toggle.querySelector('[data-i18n]').textContent = window.PortfolioLanguage?.t(
            skillsExpanded ? 'skills-less' : 'skills-more'
        ) || (skillsExpanded ? 'Show fewer skills' : 'View all skills');
    }
}

fetchData('skills')
    .then(skills => {
        loadedSkills = skills.filter(skill => skill && skill.name && skill.icon);
        if (!document.getElementById('skillsContainer') || !loadedSkills.length) {
            throw new Error('No valid skills were found.');
        }
        renderSkills();
    })
    .catch(error => console.error('Error fetching skills:', error));

document.getElementById('skills-toggle')?.addEventListener('click', function () {
    skillsExpanded = !skillsExpanded;
    renderSkills();
});

document.addEventListener('portfolio:languagechange', renderSkills);

function renderCertifications() {
    const container = document.getElementById('certificationsContainer');
    if (!container) {
        return;
    }

    if (certificationsLoadFailed) {
        const errorMessage = escapeHTML(window.PortfolioLanguage?.t('certifications-error') || 'Certifications could not be loaded. Please try again later.');
        container.innerHTML = `<p class="certifications-state error">${errorMessage}</p>`;
        return;
    }

    if (!loadedCertifications) {
        return;
    }

    const certifications = loadedCertifications.filter(certification =>
        certification && certification.name && certification.issuer
    );

    container.innerHTML = certifications.length
        ? certifications.map(certification => {
            const previewUrl = getCertificationPreviewUrl(certification);
            const preview = previewUrl
                ? `<iframe src="${escapeHTML(previewUrl)}" title="${escapeHTML(certification.name)} certificate preview" loading="lazy" referrerpolicy="no-referrer" allow="fullscreen"></iframe>`
                : `<i class="fas fa-award" aria-hidden="true"></i><strong>${escapeHTML(certification.name)}</strong><span>${escapeHTML(certification.issuer)}</span>`;
            return `
                <article class="certificate-card">
                    <div class="certificate-preview${previewUrl ? ' has-embed' : ''}">
                        <span class="certificate-preview-label">${escapeHTML(window.PortfolioLanguage?.t('certifications-preview') || 'Certificate preview')}</span>
                        ${preview}
                    </div>
                    <div class="certificate-details">
                        <div>
                            <h3>${escapeHTML(certification.name)}</h3>
                            <p>${escapeHTML(certification.issuer)}</p>
                            ${certification.date ? `<p class="certificate-date">${escapeHTML(certification.date)}</p>` : ''}
                        </div>
                        ${isUsableLink(certification.url) ? `<a href="${escapeHTML(certification.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(window.PortfolioLanguage?.t('certifications-verify') || 'View credential')}</a>` : ''}
                    </div>
                </article>`;
        }).join('')
        : `<p class="certifications-state">${escapeHTML(window.PortfolioLanguage?.t('certifications-empty') || 'Certifications will appear here.')}</p>`;

    const previous = document.getElementById('certifications-previous');
    const next = document.getElementById('certifications-next');
    if (container && previous && next) {
        const hasMultiple = certifications.length > 1;
        previous.hidden = !hasMultiple;
        next.hidden = !hasMultiple;
        updateCertificationControls();
    }
}

function updateCertificationControls() {
    const container = document.getElementById('certificationsContainer');
    const previous = document.getElementById('certifications-previous');
    const next = document.getElementById('certifications-next');
    if (!container || !previous || !next) {
        return;
    }

    previous.disabled = container.scrollLeft <= 3;
    next.disabled = container.scrollLeft + container.clientWidth >= container.scrollWidth - 3;
}

document.getElementById('certificationsContainer')?.addEventListener('scroll', updateCertificationControls, { passive: true });
window.addEventListener('resize', updateCertificationControls);
function scrollCertificationCarousel(direction) {
    const container = document.getElementById('certificationsContainer');
    const cards = container ? [...container.querySelectorAll('.certificate-card')] : [];
    if (!container || cards.length < 2) {
        return;
    }

    const step = cards[0].getBoundingClientRect().width + 16;
    const currentIndex = Math.round(container.scrollLeft / step);
    const targetIndex = Math.max(0, Math.min(cards.length - 1, currentIndex + direction));
    container.scrollTo({
        left: cards[targetIndex].offsetLeft - cards[0].offsetLeft,
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    });
}

document.getElementById('certifications-previous')?.addEventListener('click', function () {
    scrollCertificationCarousel(-1);
});
document.getElementById('certifications-next')?.addEventListener('click', function () {
    scrollCertificationCarousel(1);
});

fetchData('certifications')
    .then(certifications => {
        loadedCertifications = certifications;
        renderCertifications();
    })
    .catch(error => {
        console.error('Error fetching certifications:', error);
        certificationsLoadFailed = true;
        renderCertifications();
    });

document.addEventListener('portfolio:languagechange', function () {
    renderCertifications();
    document.querySelectorAll('.certificate-details a').forEach(verifyLink => {
        verifyLink.textContent = window.PortfolioLanguage.t('certifications-verify');
    });
    document.querySelectorAll('.certificate-preview-label').forEach(previewLabel => {
        previewLabel.textContent = window.PortfolioLanguage.t('certifications-preview');
    });
});

function showProjects(projects) {
    const container = document.querySelector('#work .box-container');
    if (!container) {
        return;
    }

    const validProjects = projects.filter(project =>
        project &&
        project.name &&
        project.desc &&
        project.category !== 'android' &&
        project.links &&
        (isUsableLink(project.links.view) || isUsableLink(project.links.code))
    ).slice(0, 10);

    if (!validProjects.length) {
        const message = window.PortfolioLanguage?.t('projects-empty') ||
            'Project details are being updated. Please check back soon.';
        container.innerHTML = `<p class="empty-state">${escapeHTML(message)}</p>`;
        return;
    }

    const language = window.PortfolioLanguage?.current || 'en';
    const projectText = (project, field) => project[`${field}_${language}`] || project[field];
    container.innerHTML = validProjects.map(project => `
        <article class="box tilt">
          ${project.image ? `<img draggable="false" src="./assets/images/projects/${escapeHTML(project.image)}.png" alt="" loading="lazy" />` : ''}
          <div class="content">
            <div class="tag"><h3>${escapeHTML(projectText(project, 'name'))}</h3></div>
            <div class="desc">
              <p>${escapeHTML(projectText(project, 'desc'))}</p>
              <div class="btns">
                ${isUsableLink(project.links.view) ? `<a href="${escapeHTML(project.links.view)}" class="btn" target="_blank" rel="noopener noreferrer"><i class="fas fa-eye" aria-hidden="true"></i> ${escapeHTML(window.PortfolioLanguage?.t('projects-view') || 'View')}</a>` : ''}
                ${isUsableLink(project.links.code) ? `<a href="${escapeHTML(project.links.code)}" class="btn" target="_blank" rel="noopener noreferrer">${escapeHTML(window.PortfolioLanguage?.t('projects-code') || 'Code')} <i class="fas fa-code" aria-hidden="true"></i></a>` : ''}
              </div>
            </div>
          </div>
        </article>`).join('');

    container.querySelectorAll('img').forEach(image => {
        image.addEventListener('error', () => image.remove(), { once: true });
    });
}

fetchData('projects')
    .then(projects => {
        homeProjects = projects;
        showProjects(projects);
    })
    .catch(error => {
        console.error('Error fetching projects:', error);
        homeProjectsFailed = true;
        const container = document.querySelector('#work .box-container');
        if (container) {
            const message = window.PortfolioLanguage?.t('projects-error') ||
                'Projects could not be loaded. Please try again later.';
            container.innerHTML = `<p class="empty-state error">${escapeHTML(message)}</p>`;
        }
    });

// Project descriptions can include name_es and desc_es fields for Spanish visitors.
document.addEventListener('portfolio:languagechange', function () {
    const container = document.querySelector('#work .box-container');
    if (homeProjects) {
        showProjects(homeProjects);
    } else if (homeProjectsFailed && container) {
        container.innerHTML = `<p class="empty-state error">${escapeHTML(window.PortfolioLanguage.t('projects-error'))}</p>`;
    } else if (container?.querySelector('.empty-state')) {
        container.querySelector('.empty-state').textContent = window.PortfolioLanguage.t('projects-empty');
    }
});

function initializeTyping() {
    if (!window.Typed || !document.querySelector('.typing-text')) {
        return;
    }

    window.portfolioTyped?.destroy();
    window.portfolioTyped = new Typed('.typing-text', {
        strings: window.PortfolioLanguage
            ? ['role-it', 'role-powerbi', 'role-linux', 'role-dba'].map(key => window.PortfolioLanguage.t(key))
            : ['IT support', 'data analytics with Power BI', 'GNU/Linux administration', 'database administration'],
        loop: true,
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 900
    });
}

initializeTyping();
document.addEventListener('portfolio:languagechange', initializeTyping);

if (window.VanillaTilt && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    VanillaTilt.init(document.querySelectorAll('.tilt'), {
        max: 8,
        speed: 400,
        glare: true,
        'max-glare': 0.15
    });
}

if (window.ScrollReveal && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const reveal = ScrollReveal({
        origin: 'bottom',
        distance: '24px',
        duration: 650,
        reset: false
    });
    reveal.reveal('.home .content h1, .home .content p, .home .content .btn', { interval: 100 });
    reveal.reveal('.home .image, .about .row, .skills .container, .education .box', { interval: 120 });
    reveal.reveal('.work .box, .experience .timeline, .contact .container', { interval: 120 });
}

// pre loader start
// function loader() {
//     document.querySelector('.loader-container').classList.add('fade-out');
// }
// function fadeOut() {
//     setInterval(loader, 500);
// }
// window.onload = fadeOut;
// pre loader end
