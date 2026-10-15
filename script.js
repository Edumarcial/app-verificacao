// Background Matrix Rain Animation
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const characters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#$%^&*()*&^%';
const fontSize = 14;
let columns = canvas.width / fontSize;
const drops = [];

for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(3, 10, 3, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff66';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}
setInterval(drawMatrix, 33);

// Intro Screen Handling
window.addEventListener('load', () => {
    setTimeout(() => {
        const introScreen = document.getElementById('intro-screen');
        const mainContainer = document.getElementById('main-container');

        introScreen.style.opacity = '0';
        setTimeout(() => {
            introScreen.classList.add('hidden');
            mainContainer.classList.remove('hidden');
        }, 500);
    }, 2000);
});

// Form Validation and Popup Logic
const form = document.getElementById('vacancy-form');
const popupOverlay = document.getElementById('popup-overlay');
const popupCard = document.getElementById('popup-card');
const popupMessage = document.getElementById('popup-message');
const popupCloseBtn = document.getElementById('popup-close');
const popupActionBtn = document.getElementById('popup-action');

const MIN_HEIGHT = 1.70;
const MIN_AGE = 18;

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const age = parseInt(document.getElementById('age').value, 10);
    const height = parseFloat(document.getElementById('height').value);

    popupCard.classList.remove('success', 'error');

    if (height >= MIN_HEIGHT && age >= MIN_AGE) {
        popupMessage.textContent = `Parabéns! Você pode prosseguir no processo para a vaga!`;
        popupCard.classList.add('success');
    } else {
        popupMessage.textContent = `Infelizmente você não é apto à vaga`;
        popupCard.classList.add('error');
    }

    popupOverlay.classList.remove('hidden');
});

function closePopup() {
    popupOverlay.classList.add('hidden');
}

popupCloseBtn.addEventListener('click', closePopup);
popupActionBtn.addEventListener('click', closePopup);
popupOverlay.addEventListener('click', function(event) {
    if (event.target === popupOverlay) {
        closePopup();
    }
});