document.addEventListener('DOMContentLoaded', () => {
    initLazyLoading();
    initFloatingBackground();
    initInteractions();
    initAmbientAudio();
});

/**
 * 1. Native Lazy Loading image fade-in transition
 * Ensures images transition in smoothly once the browser loads them.
 */
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('.blog-image');

    lazyImages.forEach(img => {
        // If image is already fully loaded in cache
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            // Add event listener for when it loads
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        }
    });
}

/**
 * 2. Subtle Floating Background Generator
 * Spawns low-opacity stylized Egyptian symbols that slowly drift upwards.
 * Utilizes high-performance inline SVGs to ensure currentColor styling works perfectly.
 */
function initFloatingBackground() {
    const container = document.getElementById('bg-symbols-container');
    if (!container) return;

    // Paths defined directly in JS to enable SVG fill="currentColor" inside the DOM
    const SYMBOLS = [
        {
            name: 'ankh',
            viewBox: '0 0 100 100',
            svgContent: `
        <path d="M50,10 C40,10 32,18 32,28 C32,38 40,46 50,46 C60,46 68,38 68,28 C68,18 60,10 50,10 Z M50,15 C57,15 63,21 63,28 C63,35 57,41 50,41 C43,41 37,35 37,28 C37,21 43,15 50,15 Z" />
        <path d="M47,46 L53,46 L53,52 L68,52 L68,58 L53,58 L53,90 L47,90 L47,58 L32,58 L32,52 L47,52 Z" />
      `
        },
        {
            name: 'eye-of-horus',
            viewBox: '0 0 100 100',
            svgContent: `
        <path d="M20,25 C35,15 65,15 80,25 C65,18 35,18 20,25 Z" />
        <path d="M15,45 C25,32 50,30 85,45 C75,55 50,58 15,45 Z M18,45 C50,55 72,52 81,45 C50,34 25,34 18,45 Z" />
        <circle cx="48" cy="44" r="11" />
        <path d="M45,55 C45,65 38,72 38,72 C38,72 49,68 49,55 Z" />
        <path d="M60,49 C60,65 48,78 65,78 C75,78 75,68 68,68 C64,68 64,72 66,72 C68,72 68,74 65,74 C55,74 65,62 65,51 Z" />
      `
        },
        {
            name: 'lotus',
            viewBox: '0 0 100 100',
            svgContent: `
        <path d="M50,15 C45,35 40,55 50,85 C60,55 55,35 50,15 Z" />
        <path d="M47,83 C35,65 15,50 18,38 C22,33 30,40 45,60 C48,64 48,75 47,83 Z" />
        <path d="M53,83 C65,65 85,50 82,38 C78,33 70,40 55,60 C52,64 52,75 53,83 Z" />
        <path d="M45,84 C25,75 5,65 5,52 C5,45 15,48 35,68 C41,74 43,80 45,84 Z" />
        <path d="M55,84 C75,75 95,65 95,52 C95,45 85,48 65,68 C59,74 57,80 55,84 Z" />
        <rect x="47" y="85" width="6" height="10" rx="3" />
      `
        },
        {
            name: 'pyramid',
            viewBox: '0 0 100 100',
            svgContent: `
        <polygon points="50,15 15,80 50,85" opacity="0.8" />
        <polygon points="50,15 50,85 85,80" opacity="0.4" />
        <line x1="10" y1="85" x2="90" y2="85" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      `
        }
    ];

    // Configure number of active symbols based on screen size
    const maxSymbols = window.innerWidth < 768 ? 6 : 12;

    for (let i = 0; i < maxSymbols; i++) {
        createSingleFloatingSymbol(container, SYMBOLS, i);
    }
}

/**
 * Creates and appends a single floating symbol with randomized, staggered properties.
 */
function createSingleFloatingSymbol(container, symbolTemplates, index) {
    // Select symbol template
    const symbol = symbolTemplates[index % symbolTemplates.length];

    // Create element wrapper
    const el = document.createElement('div');
    el.className = 'floating-symbol';

    // Random sizing (between 30px and 70px)
    const size = Math.floor(Math.random() * 40) + 30;
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;

    // Random horizontal position (0% to 90% of screen width)
    const leftPos = Math.random() * 90;
    el.style.left = `${leftPos}%`;

    // Staggered animation duration (between 7s and 14s for faster, clearer movement)
    const duration = Math.random() * 7 + 7;
    el.style.animationDuration = `${duration}s`;

    // Staggered animation delay to spread them out initially
    const delay = Math.random() * 12;
    el.style.animationDelay = `${delay}s`;

    // Inject SVG content
    el.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="${symbol.viewBox}" fill="currentColor" style="width: 100%; height: 100%;">
      ${symbol.svgContent}
    </svg>
  `;

    container.appendChild(el);
}
