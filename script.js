let slideIndex = 0;
let slideInterval;
let selectedSongSrc = '';
let poppedCount = 0;

function nextPage(pageId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(sec => sec.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');

    if (pageId === 'page2') {
        startAutoSlider();
    } else {
        stopAutoSlider();
    }
}

// Select Song Function
function selectSong(songPath, element) {
    selectedSongSrc = songPath;
    const audio = document.getElementById('bg-music');
    const source = document.getElementById('audio-source');
    const playBtn = document.getElementById('play-pause-btn');

    document.querySelectorAll('.song-btn').forEach(btn => btn.classList.remove('selected'));
    element.classList.add('selected');

    source.src = songPath;
    audio.load();
    audio.play();

    playBtn.disabled = false;
    playBtn.innerText = '⏸️ Pause Song';
}

// Play / Pause Toggle Function
function togglePlayPause() {
    const audio = document.getElementById('bg-music');
    const playBtn = document.getElementById('play-pause-btn');

    if (!selectedSongSrc) return;

    if (audio.paused) {
        audio.play();
        playBtn.innerText = '⏸️ Pause Song';
    } else {
        audio.pause();
        playBtn.innerText = '▶️ Play Song';
    }
}

// Auto Slider Logic
function startAutoSlider() {
    const track = document.getElementById('slider-track');
    const slides = document.querySelectorAll('.slide');
    if (!track || slides.length === 0) return;

    slideInterval = setInterval(() => {
        slideIndex = (slideIndex + 1) % slides.length;
        track.style.transform = `translateX(-${slideIndex * 100}%)`;
    }, 2000);
}

function stopAutoSlider() {
    clearInterval(slideInterval);
}

// Candle Blow Logic
function blowCandle() {
    const flame = document.getElementById('flame');
    const msg = document.getElementById('cake-msg');
    const btn = document.getElementById('balloon-btn');

    if(flame) flame.style.display = 'none';
    if(msg) msg.innerText = "Yaaay! Wish made ✨";
    if(btn) btn.style.display = 'inline-block';
}

// Pop Balloon Mini-Game Logic
function popSingleBalloon(element) {
    if (element.dataset.popped) return;
    element.dataset.popped = "true";

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    gsap.to(element, {
        scale: 1.5,
        opacity: 0,
        duration: 0.15,
        onComplete: () => {
            element.style.visibility = 'hidden';
        }
    });

    const shapes = ['✨', '🎉', '💥', '⭐', '💖'];
    for (let i = 0; i < 6; i++) {
        const conf = document.createElement('div');
        conf.innerHTML = shapes[i % shapes.length];
        conf.style.position = 'fixed';
        conf.style.left = `${centerX}px`;
        conf.style.top = `${centerY}px`;
        conf.style.fontSize = '20px';
        conf.style.pointerEvents = 'none';
        conf.style.zIndex = '100';
        document.body.appendChild(conf);

        gsap.to(conf, {
            x: (Math.random() - 0.5) * 100,
            y: (Math.random() - 0.5) * 100,
            opacity: 0,
            scale: 1.4,
            duration: 0.6,
            onComplete: () => conf.remove()
        });
    }

    poppedCount++;
    if (poppedCount === 5) {
        document.getElementById('balloon-hint').innerText = "All balloons popped! 🎉✨";
        document.getElementById('wishes-btn').style.display = 'inline-block';
    }
}

// Double tap photo heart fountain
const slider = document.querySelector('.slider-container');
let lastTap = 0;

if (slider) {
    slider.addEventListener('dblclick', (e) => {
        burstHearts(e.clientX, e.clientY);
    });

    slider.addEventListener('touchend', (e) => {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        if (tapLength < 300 && tapLength > 0) {
            const touch = e.changedTouches[0];
            burstHearts(touch.clientX, touch.clientY);
        }
        lastTap = currentTime;
    });
}

function burstHearts(x, y) {
    const heartEmojis = ['💖', '💕', '✨', '💗', '🌸'];

    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = heartEmojis[i % heartEmojis.length];
            heart.style.position = 'fixed';
            heart.style.left = `${x - 15}px`;
            heart.style.top = `${y - 15}px`;
            heart.style.fontSize = `${Math.random() * 14 + 24}px`;
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '999';
            document.body.appendChild(heart);

            const randomX = (Math.random() - 0.5) * 80;
            const randomY = -(Math.random() * 60 + 70);

            gsap.fromTo(heart, 
                { scale: 0.3, opacity: 1 }, 
                { 
                    scale: Math.random() * 0.6 + 1.2, 
                    x: randomX,
                    y: randomY, 
                    opacity: 0, 
                    duration: 1 + Math.random() * 0.4, 
                    ease: "power2.out",
                    onComplete: () => heart.remove() 
                }
            );
        }, i * 70);
    }
}

// Floating Background Elements
function createFloatingElements() {
    const colors = ['#FF1493', '#8A2BE2', '#FFD700', '#FF4500', '#00BFFF', '#32CD32'];
    const elements = ['confetti', 'balloon', 'heart', 'star'];
    const confettiShapes = ['▲', '■', '●', '★', '♥', '♦', '✦', '✧'];
    
    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            const element = document.createElement('div');
            const elementType = elements[Math.floor(Math.random() * elements.length)];
            element.className = elementType;
            element.style.position = 'fixed';
            element.style.pointerEvents = 'none';
            element.style.zIndex = '1';
            
            element.style.left = Math.random() * 100 + 'vw';
            element.style.top = -30 + 'px';
            
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            if (elementType === 'confetti') {
                element.innerHTML = confettiShapes[Math.floor(Math.random() * confettiShapes.length)];
                element.style.color = color;
                element.style.fontSize = (Math.random() * 10 + 8) + 'px';
            } else if (elementType === 'balloon') {
                element.innerHTML = '🎈';
                element.style.fontSize = (Math.random() * 14 + 12) + 'px';
                element.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
            } else if (elementType === 'heart') {
                element.innerHTML = '❤️';
                element.style.fontSize = (Math.random() * 12 + 10) + 'px';
                element.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
            } else if (elementType === 'star') {
                element.innerHTML = '✨';
                element.style.fontSize = (Math.random() * 10 + 8) + 'px';
            }
            
            document.body.appendChild(element);
            
            gsap.to(element, {
                y: window.innerHeight + 100,
                x: '+=' + (Math.random() * 160 - 80),
                rotation: Math.random() * 360,
                duration: Math.random() * 8 + 5,
                ease: "power1.out",
                onComplete: () => {
                    if (element.parentNode) {
                        document.body.removeChild(element);
                    }
                }
            });
            
        }, i * 250);
    }
}

window.addEventListener('load', createFloatingElements);
setInterval(createFloatingElements, 4000);

// Glitter Trail Cursor Effect
const sparkleShapes = ['✨', '✧', '✦', '★', '⋆'];
const sparkleColors = ['#FFD700', '#FF69B4', '#00FFFF', '#FF1493', '#7DF9FF', '#FFFFFF'];

function createGlitterSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = sparkleShapes[Math.floor(Math.random() * sparkleShapes.length)];
    sparkle.style.position = 'fixed';
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkle.style.color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
    sparkle.style.fontSize = `${Math.random() * 12 + 10}px`;
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '99999';
    sparkle.style.transform = 'translate(-50%, -50%)';
    sparkle.style.filter = 'drop-shadow(0 0 4px rgba(255, 215, 0, 0.8))';
    document.body.appendChild(sparkle);

    gsap.to(sparkle, {
        x: (Math.random() - 0.5) * 35,
        y: (Math.random() - 0.5) * 35 + 15,
        opacity: 0,
        scale: 0.2,
        rotation: Math.random() * 180 - 90,
        duration: 0.7,
        ease: "power1.out",
        onComplete: () => sparkle.remove()
    });
}

// Mouse Move (Desktop / Laptop)
window.addEventListener('mousemove', (e) => {
    createGlitterSparkle(e.clientX, e.clientY);
});

// Touch Move (Mobile / Tablet)
window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
        createGlitterSparkle(e.touches[0].clientX, e.touches[0].clientY);
    }
});