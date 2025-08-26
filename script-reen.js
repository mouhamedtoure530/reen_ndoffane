// script-reen.js

document.addEventListener('DOMContentLoaded', () => {

    /**
     * Menu de Navigation Mobile
     */
    const navToggle = document.querySelector('.js-nav-toggle'); // S'assurer que le HTML a bien cette classe sur le bouton
    const mainNav = document.getElementById('main-navigation-reen');
    const body = document.body;

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
            navToggle.setAttribute('aria-expanded', !isExpanded);
            
            // Ajoute/retire la classe sur le body pour gérer l'état ouvert du menu et le non-défilement
            body.classList.toggle('nav-open'); 

            // Si vous avez une classe spécifique pour activer le menu (en plus de .nav-open sur body)
            // mainNav.classList.toggle('is-active'); 
        });

        // Fermer le menu si on clique sur un lien d'ancre (pour une SPA-like)
        mainNav.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', () => {
                if (body.classList.contains('nav-open')) {
                    body.classList.remove('nav-open');
                    navToggle.setAttribute('aria-expanded', 'false');
                    // if (mainNav.classList.contains('is-active')) {
                    //     mainNav.classList.remove('is-active');
                    // }
                }
            });
        });
    }


    /**
     * Classe 'scrolled' pour le Header
     */
    const siteHeader = document.getElementById('site-header-reen');
    const scrollThreshold = 50; // Nombre de pixels à défiler avant d'ajouter la classe

    if (siteHeader) {
        const handleScroll = () => {
            if (window.scrollY > scrollThreshold) {
                siteHeader.classList.add('scrolled');
            } else {
                siteHeader.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Vérifier au chargement initial si la page est déjà scrollée
    }


    /**
     * Animations au Défilement (Intersection Observer)
     */
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (animatedElements.length > 0 && "IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Optionnel: arrêter d'observer une fois l'animation jouée pour optimiser
                    // observerInstance.unobserve(entry.target); 
                } else {
                    // Optionnel: retirer la classe si l'élément sort de la vue (pour rejouer l'animation)
                    // Pourrait être activé si vous voulez que l'animation se rejoue à chaque fois
                    // entry.target.classList.remove('is-visible'); 
                }
            });
        }, {
            threshold: 0.1, // Déclenche quand 10% de l'élément est visible. Ajustez selon vos besoins (0 à 1).
            // rootMargin: "0px 0px -50px 0px" // Optionnel: Ajuste la "boîte" de détection. Utile pour un lazy loading précoce.
        });

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    } else if (animatedElements.length > 0) {
        // Fallback pour les navigateurs ne supportant pas IntersectionObserver (rare de nos jours)
        // Vous pourriez simplement rendre tous les éléments visibles ou utiliser une autre méthode
        animatedElements.forEach(el => {
            el.classList.add('is-visible');
        });
        console.warn("IntersectionObserver n'est pas supporté. Les animations au défilement pourraient ne pas fonctionner comme prévu.");
    }

    /**
     * Optionnel: Définir la hauteur du header comme variable CSS
     * Utile si la hauteur du header est dynamique et que le CSS du menu mobile en dépend.
     */
    if (siteHeader) {
        const setHeaderHeightVar = () => {
            const headerHeight = siteHeader.offsetHeight;
            document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
        };
        setHeaderHeightVar(); // Au chargement
        window.addEventListener('resize', setHeaderHeightVar); // En cas de redimensionnement
    }


    /**
     * Optionnel : Active link styling for navigation based on scroll position
     * (Plus complexe, nécessite de calculer la position des sections)
     */
    // const navLinks = mainNav.querySelectorAll('.main-navigation__link[href^="#"]');
    // const sections = [];
    // navLinks.forEach(link => {
    //     const sectionId = link.getAttribute('href');
    //     if (sectionId && sectionId.length > 1) { // href="#" est ignoré
    //         const section = document.querySelector(sectionId);
    //         if (section) {
    //             sections.push({link: link, section: section});
    //         }
    //     }
    // });

    // if (sections.length > 0) {
    //     const activateNavLink = () => {
    //         let currentSectionId = '';
    //         const headerOffset = siteHeader ? siteHeader.offsetHeight + 20 : 80; // Hauteur du header + un offset

    //         sections.forEach(item => {
    //             const sectionTop = item.section.offsetTop - headerOffset;
    //             const sectionBottom = sectionTop + item.section.offsetHeight;

    //             if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
    //                 currentSectionId = item.section.id;
    //             }
    //         });

    //         navLinks.forEach(link => {
    //             link.classList.remove('active');
    //             if (link.getAttribute('href') === `#${currentSectionId}`) {
    //                 link.classList.add('active');
    //             }
    //         });
    //     };
        
    //     window.addEventListener('scroll', activateNavLink);
    //     activateNavLink(); // Activer au chargement
    // }


}); // Fin de DOMContentLoaded
