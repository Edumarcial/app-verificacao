// Background Soft Fire Sparks Animation
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const sparks = [];
const numSparks = 60;

for (let i = 0; i < numSparks; i++) {
    sparks.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2.5 + 1,
        speedY: Math.random() * 0.8 + 0.3,
        speedX: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.7 + 0.2,
        color: Math.random() > 0.4 ? '#ff6600' : '#ffcc00'
    });
}

function drawSparks() {
    ctx.fillStyle = 'rgba(8, 3, 2, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    sparks.forEach(spark => {
        ctx.save();
        ctx.globalAlpha = spark.alpha;
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.radius, 0, Math.PI * 2);
        ctx.fillStyle = spark.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = spark.color;
        ctx.fill();
        ctx.restore();

        spark.y -= spark.speedY;
        spark.x += spark.speedX;

        if (spark.y < 0) {
            spark.y = canvas.height + 10;
            spark.x = Math.random() * canvas.width;
        }
    });
}
setInterval(drawSparks, 33);

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