// Shared copy keeps the language selector consistent across every portfolio route.
const portfolioTranslations = {
    en: {
        "title-home": "Portfolio | Antonio Jose Lorenzo",
        "title-projects": "Projects | Antonio Jose Lorenzo",
        "title-experience": "Experience | Antonio Jose Lorenzo",
        "title-404": "Page not found | Antonio Jose Lorenzo",
        "description-home": "Explore the portfolio of Antonio Jose Lorenzo, an IT support professional focused on Linux administration, databases, and data analytics.",
        "switch-language": "Switch to Spanish",
        "main-navigation": "Main navigation",
        "menu-open": "Open navigation menu",
        "menu-close": "Close navigation menu",
        "nav-home": "Home",
        "nav-about": "About",
        "nav-skills": "Skills",
        "nav-certifications": "Certifications",
        "nav-education": "Education",
        "nav-work": "Work",
        "nav-experience": "Experience",
        "nav-contact": "Contact",
        "hero-greeting": "Hello,",
        "hero-name-prefix": "I'm Antonio Jose",
        "hero-intro": "I specialize in",
        "hero-cta": "About Me",
        "role-it": "IT support",
        "role-powerbi": "data analytics with Power BI",
        "role-linux": "GNU/Linux administration",
        "role-dba": "database administration",
        "about-heading": "About Me",
        "about-name": "I'm Antonio Jose Lorenzo",
        "about-role": "IT Support Specialist · GNU/Linux Administrator",
        "about-description": "IT specialist with 6 years of experience in GNU/Linux administration, databases, and data analytics with Power BI. Focused on automation, monitoring, and infrastructure optimization to ensure high availability and security across telecommunications, technology, and public safety environments.",
        "about-age": "Age:",
        "about-phone": "Phone:",
        "about-email": "Email:",
        "about-location": "Location:",
        "about-location-value": "Santo Domingo, Dominican Republic",
        "resume-link": "View my CV",
        "skills-heading": "Skills & Abilities",
        "skills-more": "View all skills",
        "skills-less": "Show fewer skills",
        "certifications-heading": "Certifications",
        "certifications-loading": "Loading certifications...",
        "certifications-empty": "Certifications will appear here.",
        "certifications-error": "Certifications could not be loaded. Please try again later.",
        "certifications-verify": "View credential",
        "certifications-preview": "Certificate preview",
        "certifications-previous": "Previous certification",
        "certifications-next": "Next certification",
        "certifications-list": "Certifications",
        "certifications-view-all": "View all certifications",
        "education-heading": "My Education",
        "education-quote": "Education is not the learning of facts, but the training of the mind to think.",
        "education-degree": "Higher Technician in Computer Support",
        "education-year-itsc": "Graduate",
        "education-year-highschool": "2019",
        "education-highschool-degree": "Technical High School Diploma in IT",
        "projects-heading": "Selected Projects",
        "projects-page-heading": "My Projects",
        "projects-all": "View All Projects",
        "projects-filter-all": "All Projects",
        "projects-empty": "Project details are being updated. Please check back soon.",
        "projects-error": "Projects could not be loaded. Please try again later.",
        "projects-view": "View",
        "projects-code": "Code",
        "experience-heading": "Experience",
        "experience-intro": "Experience across IT support and systems administration.",
        "experience-support": "IT Support",
        "experience-admin": "Systems Administrator and IT Support",
        "experience-first-dates": "January 2021 - February 2022",
        "experience-second-dates": "February 2022 - October 2022",
        "experience-current-dates": "April 2024 - Present",
        "experience-all": "View All Experience",
        "experience-back": "Back to Home",
        "contact-heading": "Get in Touch",
        "form-name": "Name",
        "form-name-aria": "Your name",
        "form-email": "Email",
        "form-email-aria": "Your email address",
        "form-phone": "Phone (optional)",
        "form-phone-aria": "Your phone number (optional)",
        "form-message": "Message",
        "form-message-aria": "Your message",
        "form-submit": "Submit",
        "form-sending": "Sending your message...",
        "form-success": "Thanks for reaching out. Your message has been sent.",
        "form-error": "Your message could not be sent. Please try again or email me directly.",
        "form-unavailable": "The contact service is unavailable. Please email me directly.",
        "footer-description": "Thank you for visiting my personal portfolio website. Connect with me over socials. Keep Rising 🚀",
        "footer-quick-links": "Quick links",
        "footer-contact": "Contact info",
        "not-found-heading": "Looks like you’re lost",
        "not-found-description": "The page you’re looking for isn’t available.",
        "not-found-home": "Back to Home"
    },
    es: {
        "title-home": "Portafolio | Antonio Jose Lorenzo",
        "title-projects": "Proyectos | Antonio Jose Lorenzo",
        "title-experience": "Experiencia | Antonio Jose Lorenzo",
        "title-404": "Página no encontrada | Antonio Jose Lorenzo",
        "description-home": "Conoce el portafolio de Antonio Jose Lorenzo, profesional de soporte IT enfocado en administración Linux, bases de datos y análisis de datos.",
        "switch-language": "Cambiar a inglés",
        "main-navigation": "Navegación principal",
        "menu-open": "Abrir menú de navegación",
        "menu-close": "Cerrar menú de navegación",
        "nav-home": "Inicio",
        "nav-about": "Sobre mí",
        "nav-skills": "Habilidades",
        "nav-certifications": "Certificaciones",
        "nav-education": "Educación",
        "nav-work": "Proyectos",
        "nav-experience": "Experiencia",
        "nav-contact": "Contacto",
        "hero-greeting": "Hola,",
        "hero-name-prefix": "Soy Antonio Jose",
        "hero-intro": "Me especializo en",
        "hero-cta": "Sobre mí",
        "role-it": "soporte TI",
        "role-powerbi": "análisis de datos con Power BI",
        "role-linux": "administración GNU/Linux",
        "role-dba": "administración de bases de datos",
        "about-heading": "Sobre mí",
        "about-name": "Soy Antonio Jose Lorenzo",
        "about-role": "Especialista en soporte IT · Administrador GNU/Linux",
        "about-description": "Especialista TI con 6 años de experiencia en administración GNU/Linux, bases de datos y análisis de datos con Power BI. Orientado a la automatización, monitoreo y optimización de infraestructura para garantizar la alta disponibilidad y seguridad en entornos de telecomunicaciones, tecnología y seguridad pública.",
        "about-age": "Edad:",
        "about-phone": "Teléfono:",
        "about-email": "Correo:",
        "about-location": "Ubicación:",
        "about-location-value": "Santo Domingo, República Dominicana",
        "resume-link": "Ver mi currículum",
        "skills-heading": "Habilidades y conocimientos",
        "skills-more": "Ver todas las habilidades",
        "skills-less": "Mostrar menos habilidades",
        "certifications-heading": "Certificaciones",
        "certifications-loading": "Cargando certificaciones...",
        "certifications-empty": "Las certificaciones aparecerán aquí.",
        "certifications-error": "No se pudieron cargar las certificaciones. Inténtalo de nuevo más tarde.",
        "certifications-verify": "Ver credencial",
        "certifications-preview": "Vista previa del certificado",
        "certifications-previous": "Certificación anterior",
        "certifications-next": "Siguiente certificación",
        "certifications-list": "Certificaciones",
        "certifications-view-all": "Ver todas las certificaciones",
        "education-heading": "Mi educación",
        "education-quote": "La educación no consiste en aprender hechos, sino en entrenar la mente para pensar.",
        "education-degree": "Técnico Superior en Soporte Informático",
        "education-year-itsc": "Egresado",
        "education-year-highschool": "2019",
        "education-highschool-degree": "Bachiller Técnico en Informática",
        "projects-heading": "Proyectos destacados",
        "projects-page-heading": "Mis proyectos",
        "projects-all": "Ver todos los proyectos",
        "projects-filter-all": "Todos los proyectos",
        "projects-empty": "Estamos actualizando los detalles de los proyectos. Vuelve pronto.",
        "projects-error": "No se pudieron cargar los proyectos. Inténtalo de nuevo más tarde.",
        "projects-view": "Ver",
        "projects-code": "Código",
        "experience-heading": "Experiencia",
        "experience-intro": "Experiencia en soporte IT y administración de sistemas.",
        "experience-support": "Soporte IT",
        "experience-admin": "Administrador de sistemas y soporte IT",
        "experience-first-dates": "Enero de 2021 - Febrero de 2022",
        "experience-second-dates": "Febrero de 2022 - Octubre de 2022",
        "experience-current-dates": "Abril de 2024 - Actualidad",
        "experience-all": "Ver toda la experiencia",
        "experience-back": "Volver al inicio",
        "contact-heading": "Contacto",
        "form-name": "Nombre",
        "form-name-aria": "Tu nombre",
        "form-email": "Correo electrónico",
        "form-email-aria": "Tu correo electrónico",
        "form-phone": "Teléfono (opcional)",
        "form-phone-aria": "Tu teléfono (opcional)",
        "form-message": "Mensaje",
        "form-message-aria": "Tu mensaje",
        "form-submit": "Enviar",
        "form-sending": "Enviando tu mensaje...",
        "form-success": "Gracias por escribirme. Tu mensaje fue enviado.",
        "form-error": "No se pudo enviar el mensaje. Inténtalo de nuevo o escríbeme por correo.",
        "form-unavailable": "El servicio de contacto no está disponible. Por favor, escríbeme por correo.",
        "footer-description": "Gracias por visitar mi portafolio. Conectemos a través de mis redes. ¡Sigue creciendo! 🚀",
        "footer-quick-links": "Enlaces rápidos",
        "footer-contact": "Información de contacto",
        "not-found-heading": "Parece que te has perdido",
        "not-found-description": "La página que buscas no está disponible.",
        "not-found-home": "Volver al inicio"
    }
};

// Keep one language choice for the homepage and its detail pages.
const portfolioLanguage = {
    current: localStorage.getItem("portfolio-language") === "es" ? "es" : "en",
    t(key) {
        return portfolioTranslations[this.current][key] || portfolioTranslations.en[key] || key;
    },
    set(language) {
        this.current = language === "es" ? "es" : "en";
        localStorage.setItem("portfolio-language", this.current);
        this.apply();
        document.dispatchEvent(new CustomEvent("portfolio:languagechange", {
            detail: { language: this.current }
        }));
    },
    apply() {
        const language = this.current;
        document.documentElement.lang = language;
        document.querySelectorAll("[data-i18n]").forEach(element => {
            element.textContent = this.t(element.dataset.i18n);
        });
        document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
            element.placeholder = this.t(element.dataset.i18nPlaceholder);
        });
        document.querySelectorAll("[data-i18n-aria]").forEach(element => {
            element.setAttribute("aria-label", this.t(element.dataset.i18nAria));
        });

        const pageTitleKey = document.documentElement.dataset.titleKey;
        if (pageTitleKey) {
            document.title = this.t(pageTitleKey);
        }

        const description = document.querySelector('meta[name="description"][data-i18n-content]');
        if (description) {
            description.content = this.t(description.dataset.i18nContent);
        }

        const toggle = document.getElementById("language-toggle");
        if (toggle) {
            toggle.querySelector("span").textContent = language === "en" ? "ES" : "EN";
            toggle.setAttribute("aria-label", this.t("switch-language"));
            toggle.title = this.t("switch-language");
        }

        document.getElementById("site-navigation")?.setAttribute("aria-label", this.t("main-navigation"));
        const menuButton = document.getElementById("menu");
        if (menuButton) {
            const isOpen = menuButton.getAttribute("aria-expanded") === "true";
            menuButton.setAttribute("aria-label", this.t(isOpen ? "menu-close" : "menu-open"));
        }

        const resume = document.getElementById("resume-link");
        if (resume) {
            // Keep one visible CV link and point it to the file matching the active locale.
            resume.href = language === "es" ? resume.dataset.resumeEs : resume.dataset.resumeEn;
        }
    }
};

window.PortfolioLanguage = portfolioLanguage;
portfolioLanguage.apply();

document.getElementById("language-toggle")?.addEventListener("click", () => {
    portfolioLanguage.set(portfolioLanguage.current === "en" ? "es" : "en");
});