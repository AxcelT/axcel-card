document.addEventListener('DOMContentLoaded', () => {
    // — MOBILE DETECTION & OVERLAY TOGGLE —
    // function isMobileDevice() {
        // modern API
        // if (navigator.userAgentData && typeof navigator.userAgentData.mobile === 'boolean') {
        //     return navigator.userAgentData.mobile;
        // }
        // // UA string fallback
        // const ua = navigator.userAgent || navigator.vendor || window.opera;
        // const mobileRegex = /Android|Mobi|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        // if (mobileRegex.test(ua)) {
        //     return true;
        // }
        // touch-first check
    //     return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    // }

    // function checkAndShowMobileWarning() {
    //     const warning = document.getElementById('mobile-warning');
    //     const content = document.getElementById('site-content');

    //     if (isMobileDevice()) {
    //         warning.classList.remove('hidden');
    //         content.classList.add('hidden');
    //     } else {
    //         warning.classList.add('hidden');
    //         content.classList.remove('hidden');
    //     }
    // }

    // Run on initial load + whenever viewport changes
    // checkAndShowMobileWarning();
    // window.addEventListener('resize', checkAndShowMobileWarning);

    // — TYPEWRITER EFFECT (JS) —
    const typeEl = document.getElementById('typewriter');
    const fullText = typeEl.textContent.trim();
    typeEl.textContent = '';
    let charIndex = 0;
    const speed = 50;
    function typeWriter() {
        if (charIndex < fullText.length) {
        typeEl.textContent += fullText.charAt(charIndex++);
        setTimeout(typeWriter, speed);
        }
    }
    typeWriter();

    // -- VARIABLES & ELEMENTS --
    let currentSlide = 0;
    const slides   = document.querySelectorAll('.slide');
    const nav      = document.getElementById('mainNav');
    const navLinks = nav.querySelectorAll('.nav-link');
    const ANIM_DUR = 150;
    const BUFFER_MS = 50;

    // -- SLIDE & NAV FUNCTIONS --
    function updateNavTheme(idx) {
        if (idx === 0) {
            nav.classList.add('nav-dark');
            nav.classList.remove('nav-light');
            document.documentElement.style.setProperty('--active-fg', '#f5f5f5');
            document.documentElement.style.setProperty('--indicator-color', '#f5f5f5');
        } else {
            nav.classList.add('nav-light');
            nav.classList.remove('nav-dark');
            document.documentElement.style.setProperty('--active-fg', '#18181b');
            document.documentElement.style.setProperty('--indicator-color', '#18181b');
        }
        navLinks.forEach(a => a.classList.toggle('active', Number(a.dataset.slide) === idx));
    }

    function showSlide(i) {
        slides.forEach((s, idx) => {
            s.style.transform = `translateY(${100 * (idx - i)}vh)`;
        });
        updateNavTheme(i);
        currentSlide = i;
    }

    // -- SCROLL-DOWN BUTTON --
    const scrollDown = document.getElementById('scrollDown');
    if (scrollDown) {
        scrollDown.addEventListener('click', () => showSlide(1));
    }

    // -- WHEEL NAVIGATION --
    document.addEventListener('wheel', e => {
        const dir = e.deltaY > 0 ? 1 : -1;
        const next = Math.min(Math.max(currentSlide + dir, 0), slides.length - 1);
        showSlide(next);
    });

    // -- NAV LINK CLICKS --
    navLinks.forEach(a =>
        a.addEventListener('click', e => {
            e.preventDefault();
            showSlide(Number(a.dataset.slide));
        })
    );

    // -- Badge expand/collapse toggle --
    document.querySelectorAll('.tags').forEach(container => {
        const badges = Array.from(container.querySelectorAll('.badge.tech-badge'));
        if (badges.length <= 4) return;

        // hide extras initially
        const extras = badges.slice(4);
        extras.forEach(b => b.classList.add('d-none'));

        // create the toggle button
        const toggleBtn = document.createElement('span');
        toggleBtn.classList.add('badge', 'tech-badge', 'more-badge');
        toggleBtn.textContent   = `+${extras.length} more`;
        toggleBtn.dataset.state = 'collapsed';

         // Start *inside* the .tags flex container
        container.append(toggleBtn);

        // click → expand/collapse
        toggleBtn.addEventListener('click', () => {
            if (toggleBtn.dataset.state === 'collapsed') {
                extras.forEach(b => b.classList.remove('d-none'));
                toggleBtn.textContent   = 'Collapse';
                toggleBtn.dataset.state = 'expanded';
                // Move below the badges
                container.after(toggleBtn);
            } else {
                extras.forEach(b => b.classList.add('d-none'));
                toggleBtn.textContent   = `+${extras.length} more`;
                toggleBtn.dataset.state = 'collapsed';
                // Move back inside the badges row
                container.append(toggleBtn);
            }
        });
    });

    // -- INITIALIZE --
    showSlide(0);
});
