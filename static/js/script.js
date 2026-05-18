document.addEventListener('DOMContentLoaded', () => {
    
    // --- Page 1: Landing Page Typewriter ---
    const typewriterContainer = document.getElementById('typewriter-container');
    if (typewriterContainer) {
        const lines = [
            "Loading happiness...",
            "Searching favorite person...",
            "100% Match Found 💙"
        ];
        
        let lineIndex = 0;
        let charIndex = 0;
        let currentElement = null;

        function typeLine() {
            if (lineIndex < lines.length) {
                if (charIndex === 0) {
                    currentElement = document.createElement('div');
                    typewriterContainer.appendChild(currentElement);
                }

                if (charIndex < lines[lineIndex].length) {
                    currentElement.innerHTML = lines[lineIndex].substring(0, charIndex + 1) + '<span class="cursor"></span>';
                    charIndex++;
                    setTimeout(typeLine, 50 + Math.random() * 50);
                } else {
                    currentElement.innerHTML = lines[lineIndex]; // Remove cursor from completed line
                    lineIndex++;
                    charIndex = 0;
                    setTimeout(typeLine, 800); // Pause before next line
                }
            } else {
                // Done typing
                setTimeout(() => {
                    document.getElementById('start-btn-container').classList.remove('hidden');
                    document.getElementById('start-btn-container').classList.add('fade-in-up');
                }, 500);
            }
        }
        
        setTimeout(typeLine, 500);
    }

    // --- Intersection Observer for Scroll Animations ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // If it's a counter, animate it
                const counter = entry.target.querySelector('.counter');
                if (counter && !counter.classList.contains('counted')) {
                    animateCounter(counter);
                    counter.classList.add('counted');
                }
                
                // If it's the infinite counter, animate to max then show string
                const counterInf = entry.target.querySelector('.counter-infinite');
                if (counterInf && !counterInf.classList.contains('counted')) {
                    animateCounterInfinite(counterInf);
                    counterInf.classList.add('counted');
                }
                
                // If it's the progress bar card, animate progress
                const progressBar = entry.target.querySelector('.progress-bar-fill');
                if (progressBar) {
                    progressBar.style.width = '100%';
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.hidden-element').forEach(el => {
        observer.observe(el);
    });

    // --- Counter Animation function ---
    function animateCounter(el) {
        const target = +el.getAttribute('data-target');
        const duration = 2000; // ms
        const step = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                el.innerText = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                el.innerText = target;
            }
        };
        updateCounter();
    }

    function animateCounterInfinite(el) {
        const target = +el.getAttribute('data-target');
        const finalStr = el.getAttribute('data-final') || "Infinite";
        const duration = 2500; // ms
        const step = target / (duration / 16); 
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                el.innerText = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                el.innerText = finalStr;
            }
        };
        updateCounter();
    }

    // --- Page 4: Hacker Terminal & Surprise ---
    const finalSurprise = document.getElementById('final-surprise');
    
    if (finalSurprise) {
        // Trigger surprise immediately for the new cute theme
        startConfetti();
        
        const finalTypewriter = document.getElementById('final-typewriter');
        if (finalTypewriter) {
             const finalLines = [
                "Happy Birthday SRAVYA 💙✨",
                "To the most beautiful and sweetest girl,",
                "You make every single day magical.",
                "I love you 🐾💙"
            ];
            
            let flIndex = 0;
            let fcIndex = 0;
            let fEl = null;

            function typeFinalLine() {
                if (flIndex < finalLines.length) {
                    if (fcIndex === 0) {
                        fEl = document.createElement('div');
                        if (flIndex === 0) {
                            fEl.className = 'giant-text';
                        } else {
                            fEl.className = 'emotional-text';
                        }
                        finalTypewriter.appendChild(fEl);
                    }

                    if (fcIndex < finalLines[flIndex].length) {
                        fEl.innerHTML = finalLines[flIndex].substring(0, fcIndex + 1) + '<span class="cursor"></span>';
                        fcIndex++;
                        setTimeout(typeFinalLine, 50 + Math.random() * 50);
                    } else {
                        fEl.innerHTML = finalLines[flIndex];
                        flIndex++;
                        fcIndex = 0;
                        setTimeout(typeFinalLine, 600);
                    }
                }
            }
            setTimeout(typeFinalLine, 1000);
        }

        // Try to play music if element exists
        const audio = document.getElementById('bg-music');
        if (audio) {
            // Need user interaction to play audio usually, but we try
            document.body.addEventListener('click', () => {
                audio.play().catch(e => console.log(e));
            }, {once:true});
        }
    }

    // --- Blue Heart Confetti Implementation ---
    function startConfetti() {
        const canvas = document.getElementById('confetti-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const pieces = [];
        // Cute blue palette + white
        const colors = ['#87ceeb', '#b0e0e6', '#e6e6fa', '#ffffff', '#6495ed'];

        for (let i = 0; i < 200; i++) {
            pieces.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                size: Math.random() * 12 + 6,
                color: colors[Math.floor(Math.random() * colors.length)],
                speedY: Math.random() * 4 + 2,
                speedX: Math.random() * 3 - 1.5,
                rotation: Math.random() * 360,
                rotationSpeed: Math.random() * 10 - 5,
                isHeart: Math.random() > 0.5 // 50% chance to be a heart shape
            });
        }

        function drawHeart(ctx, x, y, size, color) {
            ctx.save();
            ctx.translate(x, y);
            ctx.scale(size/20, size/20);
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(0, 5);
            ctx.bezierCurveTo(0, 0, -10, 0, -10, 10);
            ctx.bezierCurveTo(-10, 20, 0, 25, 0, 30);
            ctx.bezierCurveTo(0, 25, 10, 20, 10, 10);
            ctx.bezierCurveTo(10, 0, 0, 0, 0, 5);
            ctx.fill();
            ctx.restore();
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            pieces.forEach(p => {
                if (p.isHeart) {
                    drawHeart(ctx, p.x, p.y, p.size * 1.5, p.color);
                } else {
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.rotation * Math.PI / 180);
                    ctx.fillStyle = p.color;
                    ctx.beginPath();
                    ctx.arc(0, 0, p.size/2, 0, Math.PI*2);
                    ctx.fill();
                    ctx.restore();
                }

                p.y += p.speedY;
                p.x += p.speedX;
                p.rotation += p.rotationSpeed;

                if (p.y > canvas.height) {
                    p.y = -20;
                    p.x = Math.random() * canvas.width;
                }
            });

            requestAnimationFrame(animate);
        }
        animate();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
});
