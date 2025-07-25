// Clint's Design Mixology Lab - script.js

document.addEventListener('DOMContentLoaded', () => {
    // ===== Navigation Switching =====
    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            document.querySelectorAll('.section').forEach(section => section.classList.add('hidden'));
            document.querySelector(link.getAttribute('href')).classList.remove('hidden');
            window.scrollTo(0, 0);
        });
    });

    // ===== Start Mixing Button =====
    const startMixingBtn = document.getElementById('start-mixing');
    if (startMixingBtn) {
        startMixingBtn.addEventListener('click', () => {
            document.getElementById('hero').classList.add('hidden');
            document.getElementById('mixer').classList.remove('hidden');
            window.scrollTo(0, 0);
        });
    }

    // ===== Color Palettes =====
    const palettes = [
        ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"],
        ["#0f172a", "#2563eb", "#10b981", "#facc15", "#f97316"],
        ["#1e293b", "#334155", "#64748b", "#cbd5e1", "#f8fafc"],
        ["#3b82f6", "#9333ea", "#f43f5e", "#22c55e", "#f59e0b"],
        ["#ff6b6b", "#feca57", "#48dbfb", "#1dd1a1", "#5f27cd"],
        ["#f87171", "#fb923c", "#facc15", "#4ade80", "#60a5fa"],
        ["#d946ef", "#8b5cf6", "#22d3ee", "#34d399", "#f59e0b"]
    ];

    function getRandomPalette() {
        return palettes[Math.floor(Math.random() * palettes.length)];
    }

    function displayPalette(colors) {
        const paletteContainer = document.getElementById('palette-container');
        paletteContainer.innerHTML = '';

        colors.forEach(color => {
            const colorDiv = document.createElement('div');
            colorDiv.className = 'palette-color';
            colorDiv.style.backgroundColor = color;
            colorDiv.title = color;
            colorDiv.textContent = color;
            colorDiv.addEventListener('click', () => {
                navigator.clipboard.writeText(color).then(() => {
                    alert(`${color} copied to clipboard!`);
                });
            });
            paletteContainer.appendChild(colorDiv);
        });

        launchConfetti();
    }

    // ===== Mix Palette Button =====
    const mixPaletteBtn = document.getElementById('mix-palette');
    if (mixPaletteBtn) {
        mixPaletteBtn.addEventListener('click', () => {
            const colors = getRandomPalette();
            displayPalette(colors);
        });
    }

    // ===== Surprise Me Button =====
    const randomPaletteBtn = document.getElementById('random-palette');
    if (randomPaletteBtn) {
        randomPaletteBtn.addEventListener('click', () => {
            const colors = getRandomPalette();
            displayPalette(colors);
        });
    }

    // ===== Contact Form Validation =====
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            const feedback = document.getElementById('form-feedback');

            if (!name || !email || !message) {
                feedback.textContent = 'Please fill in all fields.';
                feedback.style.color = 'red';
                return;
            }

            const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
            if (!emailRegex.test(email)) {
                feedback.textContent = 'Please enter a valid email address.';
                feedback.style.color = 'red';
                return;
            }

            feedback.textContent = 'Message sent successfully!';
            feedback.style.color = 'green';
            contactForm.reset();
        });
    }
});

// ===== Confetti Launcher =====
function launchConfetti() {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
    } else {
        console.log("🎉 Confetti triggered! (Include confetti library for effects)");
    }
}
