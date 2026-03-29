/* =========================================
   1. NAVIGATION ET SMOOTH SCROLL
   ========================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); 
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth' 
        });
    });
});

const homeButton = document.getElementById('back-to-top-home');
homeButton.addEventListener('click', (e) => {
    e.preventDefault(); 
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/* =========================================
   2. ANIMATIONS AU DEFILEMENT (Intersection Observer)
   ========================================= */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
        }
    });
}, { threshold: 0.1 });

// Applique l'observateur aux éléments ciblés
document.querySelectorAll('section, article').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});

/* =========================================
   3. VALIDATION DU FORMULAIRE
   ========================================= */
const contactForm = document.querySelector('form');
contactForm.addEventListener('submit', (e) => {
    const email = document.getElementById('email').value;

    if (!email.includes('@') || !email.includes('.') || email.startsWith('@') || email.endsWith('@') || email.startsWith('.') || email.endsWith('.')) {
        e.preventDefault(); // Bloque l'envoi si invalide
        alert('Oups ! Ton adresse email ne semble pas valide.');
    }
});

/* =========================================
   4. GESTION DU THEME (Dark / Light)
   ========================================= */
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Vérifier et appliquer le thème sauvegardé
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    body.classList.add(currentTheme);
}

// Changement de thème au clic
themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');

    if (currentTheme === 'light-theme') {
        document.querySelector('.icon-moon').style.display = 'none';
        document.querySelector('.icon-sun').style.display = 'block';
    }
});

/* =========================================
   5. GESTION DE LA LANGUE (Français / Anglais)
   ========================================= */

/* =========================================
   5. GESTION DE LA LANGUE (FR / EN)
   ========================================= */

const translations = {
    fr: {
        "nav.about":   "À propos",
        "nav.projects": "Projets",
        "nav.contact": "Contact",
        "nav.cv":      "Télécharger mon CV",
        "hero.title":  "Bonjour, je suis Lucas VERDOUCQ",
        "hero.subtitle": "Étudiant à Epitech Lille.",
        "about.title": "À propos",
        "about.p1": "Je suis un étudiant à Epitech, passionné par la création et la résolution de problèmes complexes.",
        "about.p2": "Je me spécialise dans le développement web et les jeux vidéo.",
        "about.p3": "J'ai débuté le code en recréant des petits jeux et en codant avec mon grand frère.",
        "about.p4": "Je suis toujours à la recherche de nouvelles opportunités pour apprendre et grandir en tant que développeur.",
        "about.p5": "Mon objectif actuel est de trouver un stage pour acquérir plus d'expérience.",
        "projects.title": "Mes Projets",
        "projects.wolf.title": "Wolf3D (en cours)",
        "projects.wolf.desc": "Un jeu en 2.5D inspiré du classique Wolfenstein 3D, développé en C avec la librairie SFML. Ce projet est un sujet de l'école.",
        "projects.code": "Voir le code",
        "projects.demo": "Démo live",
        "skills.title": "Compétences",
        "skills.languages": "Langages",
        "skills.tools": "Outils",
        "contact.title": "Me contacter",
        "contact.name": "Nom :",
        "contact.namePlaceholder": "Nom Prénom",
        "contact.email": "Email :",
        "contact.emailPlaceholder": "ex: email@gmail.com",
        "contact.message": "Message :",
        "contact.messagePlaceholder": "Ton message",
        "contact.send": "Envoyer",
        "footer": "© 2026 Lucas VERDOUCQ. Tous droits réservés."
    },
    en: {
        "nav.about":   "About",
        "nav.projects": "Projects",
        "nav.contact": "Contact",
        "nav.cv":      "Download my Resume",
        "hero.title":  "Hi, I'm Lucas VERDOUCQ",
        "hero.subtitle": "Student at Epitech Lille.",
        "about.title": "About me",
        "about.p1": "I'm a student at Epitech, passionate about creation and solving complex problems.",
        "about.p2": "I specialize in web development and video games.",
        "about.p3": "I started coding by recreating small games and coding alongside my older brother.",
        "about.p4": "I'm always looking for new opportunities to learn and grow as a developer.",
        "about.p5": "My current goal is to find an internship to gain more experience.",
        "projects.title": "My Projects",
        "projects.wolf.title": "Wolf3D (in progress)",
        "projects.wolf.desc": "A 2.5D game inspired by the classic Wolfenstein 3D, developed in C with the SFML library. This project is a school assignment.",
        "projects.code": "View code",
        "projects.demo": "Live demo",
        "skills.title": "Skills",
        "skills.languages": "Languages",
        "skills.tools": "Tools",
        "contact.title": "Contact me",
        "contact.name": "Name:",
        "contact.namePlaceholder": "First Last",
        "contact.emailPlaceholder": "ex: email@gmail.com",
        "contact.email": "Email:",
        "contact.message": "Message:",
        "contact.messagePlaceholder": "Your message",
        "contact.send": "Send",
        "footer": "© 2026 Lucas VERDOUCQ. All rights reserved."
    }
};

const langToggle = document.getElementById('lang-toggle');
let currentLang = localStorage.getItem('lang') || 'fr';

function applyLang(lang) {
    // Traduit les textes
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) el.textContent = translations[lang][key];
    });

    // Traduit les placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) el.placeholder = translations[lang][key];
    });

    // Met à jour le bouton et la balise <html>
    langToggle.textContent = lang === 'fr' ? '🇫🇷 Français' :'🇬🇧 English';
    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);
    currentLang = lang;
}

// Applique la langue sauvegardée au chargement
applyLang(currentLang);

// Bascule au clic
langToggle.addEventListener('click', () => {
    applyLang(currentLang === 'fr' ? 'en' : 'fr');
});