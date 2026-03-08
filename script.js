// ─── EmailJS Init ────────────────────────────────────────────────────────────
emailjs.init("VLZ7To3D18IDglE5m");

// ─── Canvas Setup ────────────────────────────────────────────────────────────
const canvas = document.getElementById("starfield");
const ctx    = canvas.getContext("2d");

// Track logical width/height instead of physical canvas dimensions
let cw = window.innerWidth;
let ch = window.innerHeight;

function resizeCanvas() {
    cw = window.innerWidth;
    ch = window.innerHeight;
    
    // Support high-DPI (Retina/Mobile) screens to prevent blurring
    const dpr = window.devicePixelRatio || 1;
    canvas.width  = cw * dpr;
    canvas.height = ch * dpr;
    
    // Scale pixel coordinate system back to logical CSS sizes
    ctx.scale(dpr, dpr);
}
resizeCanvas();

// ─── Config ──────────────────────────────────────────────────────────────────
const STAR_COUNT      = 700;
const COLOR_HUES      = [220, 240, 260, 280]; // blue-violet palette
const TEXT_COLOR      = "hsla(250, 75%, 78%,";
const GLOW_COLOR      = "rgba(120, 90, 255, 1)";
const MOBILE_BREAKPT  = 600;

// ─── State ───────────────────────────────────────────────────────────────────
let isMobile       = window.innerWidth < MOBILE_BREAKPT;
let frameIncrement = isMobile ? 3 : 1;
let frameNumber    = 0;

// ─── Stars ───────────────────────────────────────────────────────────────────
const starArray = Array.from({ length: STAR_COUNT }, () => ({
    x:       Math.random() * cw,
    y:       Math.random() * ch,
    radius:  Math.random() * 1.4 + 0.1,
    hue:     COLOR_HUES[Math.floor(Math.random() * COLOR_HUES.length)],
    sat:     Math.floor(Math.random() * 50 + 50),
    opacity: Math.random(),
    drift:   (Math.random() - 0.5) * 0.08, // subtle horizontal drift
}));

function drawStars() {
    for (const star of starArray) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${star.hue}, ${star.sat}%, 88%, ${star.opacity})`;
        ctx.fill();
    }
}

function updateStars() {
    for (const star of starArray) {
        if (Math.random() > 0.992) {
            star.opacity = Math.random();
        }
        // subtle parallax drift
        star.x += star.drift;
        if (star.x < 0)  star.x = cw;
        if (star.x > cw) star.x = 0;
    }
}

// ─── Text Sequence ───────────────────────────────────────────────────────────
// Each entry: { lines: string[], linesMobile?: string[], start, hold, end }
// Frames: fade-in [start → start+250], hold [start+250 → hold], fade-out [hold → end]
const textSequence = [
    {
        lines:       ["every single day, I cannot believe how lucky"],
        start:       0,
        hold:        550,
        end:         800,
    },
    {
        lines:       ["amongst trillions and trillions of stars, over billions of years"],
        linesMobile: ["amongst trillions and trillions of stars,", "over billions of years"],
        start:       1100,
        hold:        1650,
        end:         1900,
    },
    {
        lines:       ["to be alive, and to get to share this life with"],
        start:       2200,
        hold:        2750,
        end:         3000,
    },
    {
        lines:       ["is so incredibly, unfathomably unlikely"],
        start:       3300,
        hold:        3850,
        end:         4100,
    },
    {
        lines:       ["and yet here we are — to get the impossible chance to know each other"],
        linesMobile: ["and yet here we are —", "to get the impossible chance", "to know each other"],
        start:       4400,
        hold:        4950,
        end:         5200,
    },
    {
        lines:       ["You are more cherished than all the atoms the universe can contain ❤️"],
        linesMobile: ["You are more cherished than", "all the atoms the universe can contain ❤️"],
        start:       5500,
        hold:        99999,
        end:         99999,
    },
];

// Lines that appear after the final message
const SUBTITLE_START  = 6000;
const SUBTITLE_LINES  = ["(I hope this made you smile)"];
const TAGLINE_START   = 6250;
const TAGLINE_TEXT    = "Happy Valentine's Day, Dihh❤️";

let subtitleOpacity = 0;
let taglineOpacity  = 0;

// ─── Drawing Helpers ─────────────────────────────────────────────────────────
function getLines(entry) {
    return (isMobile && entry.linesMobile) ? entry.linesMobile : entry.lines;
}

function drawLines(lines, centerY, fontSize, lineHeight, alpha) {
    ctx.fillStyle = `${TEXT_COLOR} ${alpha})`;
    lines.forEach((line, i) => {
        ctx.fillText(line, cw / 2, centerY + i * (fontSize + lineHeight));
    });
}

function drawText() {
    const fontSize   = Math.min(28, window.innerWidth / 26);
    const lineHeight = 10;
    const fadeSpeed  = isMobile ? 0.03 : 0.01;
    const cx         = cw / 2;
    const cy         = ch / 2;

    ctx.font      = `300 ${fontSize}px 'Cormorant Garamond', serif`;
    ctx.textAlign = "center";

    // Glow
    ctx.shadowColor   = GLOW_COLOR;
    ctx.shadowBlur    = 14;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Render each text sequence entry
    for (const entry of textSequence) {
        const { start, hold, end } = entry;
        const fadeIn  = start + 250;
        const fadeOut = hold;

        if (frameNumber >= start && frameNumber < end) {
            let alpha;
            if (frameNumber < fadeIn) {
                // Fading in
                alpha = Math.min(1, (frameNumber - start) / (fadeIn - start));
            } else if (frameNumber < fadeOut) {
                // Holding
                alpha = 1;
            } else {
                // Fading out
                alpha = Math.max(0, 1 - (frameNumber - fadeOut) / (end - fadeOut));
            }
            drawLines(getLines(entry), cy, fontSize, lineHeight, alpha);
        }
    }

    // Subtitle line
    if (frameNumber >= SUBTITLE_START) {
        ctx.fillStyle = `${TEXT_COLOR} ${subtitleOpacity})`;
        ctx.font = `300 ${Math.min(20, window.innerWidth / 34)}px 'Cormorant Garamond', serif`;
        ctx.fillText(SUBTITLE_LINES[0], cx, cy + 60);
        subtitleOpacity = Math.min(1, subtitleOpacity + fadeSpeed);
    }

    // Tagline
    if (frameNumber >= TAGLINE_START) {
        ctx.fillStyle = `${TEXT_COLOR} ${taglineOpacity})`;
        ctx.font = `italic 300 ${Math.min(22, window.innerWidth / 30)}px 'Cormorant Garamond', serif`;
        ctx.fillText(TAGLINE_TEXT, cx, cy + 110);
        taglineOpacity = Math.min(1, taglineOpacity + fadeSpeed);

        button.style.display = "block";
    }

    // Reset shadow
    ctx.shadowColor = "transparent";
    ctx.shadowBlur  = 0;
}

// ─── Button ──────────────────────────────────────────────────────────────────
const button = document.getElementById("valentinesButton");

button.addEventListener("click", () => {
    if (button.textContent.startsWith("Send")) {
        button.textContent = "Sending...";
        button.disabled    = true;

        emailjs.send("service_8ndysij", "template_na1ns9l", {
            to_email: "jophits@gmail.com",
            to_name:  "Dhiya",
            message:  "wt if im serious,gn❤️\n\n~j",
            from_name: "J"
        }).then(
            () => {
                button.textContent = "Check Your Inbox 💌";
                button.disabled    = false;
            },
            () => {
                button.textContent = "Something went wrong 😞";
                button.disabled    = false;
            }
        );
    }
});

// ─── Main Loop ───────────────────────────────────────────────────────────────
function draw() {
    ctx.clearRect(0, 0, cw, ch);

    drawStars();
    updateStars();
    drawText();

    if (frameNumber < 99999) {
        frameNumber += frameIncrement;
    }

    window.requestAnimationFrame(draw);
}

// ─── Init ────────────────────────────────────────────────────────────────────
window.requestAnimationFrame(draw);

window.addEventListener("resize", () => {
    resizeCanvas();
    isMobile       = window.innerWidth < MOBILE_BREAKPT;
    frameIncrement = isMobile ? 3 : 1;
});
