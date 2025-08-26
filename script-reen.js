// script-reen.js

document.addEventListener('DOMContentLoaded', () => {

    const body = document.body;
    const siteHeader = document.getElementById('site-header-reen');
    const mainNav = document.getElementById('main-navigation-reen');
    const navToggle = document.querySelector('.js-nav-toggle');

    // -------------------------------------------------------------------------
    // 1. GESTION DU MENU MOBILE (BURGER) - Basé sur votre logique existante
    // -------------------------------------------------------------------------
    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
            navToggle.setAttribute('aria-expanded', !isExpanded);
            
            body.classList.toggle('nav-open'); // Votre classe existante pour l'état ouvert
            
            // Pour l'animation du bouton burger lui-même (si votre CSS le gère avec .is-active sur le bouton)
            navToggle.classList.toggle('is-active'); 
            
            // Si le menu lui-même a besoin d'une classe .is-active (en plus de body.nav-open)
            // mainNav.classList.toggle('is-active'); 
        });

        // Fermer le menu si on clique sur un lien (ancre OU autre page)
        mainNav.querySelectorAll('.main-navigation__link').forEach(link => {
            link.addEventListener('click', () => {
                if (body.classList.contains('nav-open')) {
                    body.classList.remove('nav-open');
                    navToggle.setAttribute('aria-expanded', 'false');
                    navToggle.classList.remove('is-active'); // Réinitialiser le style du burger
                    // if (mainNav.classList.contains('is-active')) {
                    //     mainNav.classList.remove('is-active');
                    // }
                }
            });
        });
    }

    // -------------------------------------------------------------------------
    // 2. GESTION DU HEADER "SCROLLED" - Votre code existant
    // -------------------------------------------------------------------------
    const scrollThreshold = 50; 

    if (siteHeader) {
        const handleHeaderScroll = () => { // Renommé pour éviter conflit si vous aviez 'handleScroll' ailleurs
            if (window.scrollY > scrollThreshold) {
                siteHeader.classList.add('scrolled'); // Votre classe existante
            } else {
                siteHeader.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleHeaderScroll);
        handleHeaderScroll(); 
    }

    // -------------------------------------------------------------------------
    // 3. ANIMATIONS AU DÉFILEMENT - Votre code existant (Intersection Observer)
    // -------------------------------------------------------------------------
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (animatedElements.length > 0 && "IntersectionObserver" in window) {
        const animationObserver = new IntersectionObserver((entries, observerInstance) => { // Renommé 'observer'
            entries.forEach(entry => {
                const delay = entry.target.dataset.animationDelay || 0; // Récupération du délai
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('is-visible'); // Votre classe existante
                    }, delay * 100); // Appliquer le délai
                    
                    // Optionnel: arrêter d'observer une fois l'animation jouée
                    observerInstance.unobserve(entry.target); 
                } else {
                    // Si vous voulez que l'animation se rejoue (enlevez unobserve ci-dessus)
                    // entry.target.classList.remove('is-visible'); 
                }
            });
        }, {
            threshold: 0.1, 
            // rootMargin: "0px 0px -50px 0px" // Optionnel
        });

        animatedElements.forEach(el => {
            animationObserver.observe(el);
        });
    } else if (animatedElements.length > 0) {
        animatedElements.forEach(el => {
            el.classList.add('is-visible');
        });
        console.warn("IntersectionObserver n'est pas supporté. Animations affichées directement.");
    }

    // -------------------------------------------------------------------------
    // 4. BOUTON "RETOUR EN HAUT" - AJOUTÉ
    // -------------------------------------------------------------------------
    const backToTopButton = document.querySelector('.back-to-top-link');

    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { 
                // Assurez-vous d'avoir une classe CSS comme '.is-visible' pour le bouton
                // qui gère son affichage (opacity, visibility, transform)
                backToTopButton.classList.add('is-visible'); 
            } else {
                backToTopButton.classList.remove('is-visible');
            }
        });

        backToTopButton.addEventListener('click', (event) => {
            event.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    // -------------------------------------------------------------------------
    // 5. DÉFINIR LA HAUTEUR DU HEADER COMME VARIABLE CSS - Votre code existant
    // -------------------------------------------------------------------------
    if (siteHeader) {
        const setHeaderHeightVar = () => {
            const headerHeight = siteHeader.offsetHeight;
            document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
        };
        setHeaderHeightVar(); 
        window.addEventListener('resize', setHeaderHeightVar); 
    }


    // -------------------------------------------------------------------------
    // 6. OPTIONNEL: AMÉLIORATION ACCORDÉON FAQ (un seul ouvert à la fois) - AJOUTÉ
    // -------------------------------------------------------------------------
    const faqItems = document.querySelectorAll('.faq-item'); // En supposant que vos <details> ont cette classe
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const summary = item.querySelector('summary');
            if (summary) {
                summary.addEventListener('click', (event) => {
                    // On ne prévient pas le comportement par défaut car <details> le gère
                    if (!item.hasAttribute('open')) { // S'il va s'ouvrir
                        faqItems.forEach(otherItem => {
                            if (otherItem !== item && otherItem.hasAttribute('open')) {
                                otherItem.removeAttribute('open');
                            }
                        });
                    }
                });
            }
        });
    }
    
    // -------------------------------------------------------------------------
    // 7. OPTIONNEL : ACTIVE LINK STYLING - Votre code existant (commenté)
    //    (C'est une bonne base si vous voulez l'activer plus tard)
    // -------------------------------------------------------------------------
    // const navLinks = mainNav.querySelectorAll('.main-navigation__link[href^="#"]');
    // const sections = [];
    // ... (votre code pour les liens actifs) ...

}); // Fin de DOMContentLoaded
