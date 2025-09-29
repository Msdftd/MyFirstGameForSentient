// ================= main.js =================


// Draw obstacles
for (const o of obstacles) {
ctx.drawImage(obstacleImg, o.x, o.y, o.w, o.h);
}


document.getElementById('score').textContent = score;
document.getElementById('high').textContent = high;
}


function roundRect(ctx, x, y, w, h, r) {
ctx.beginPath();
ctx.moveTo(x + r, y);
ctx.arcTo(x + w, y, x + w, y + h, r);
ctx.arcTo(x + w, y + h, x, y + h, r);
ctx.arcTo(x, y + h, x, y, r);
ctx.arcTo(x, y, x + w, y, r);
ctx.closePath();
ctx.fill();
}


function gameOver() {
running = false;
if (score > high) {
high = score;
localStorage.setItem('dodge_high', high);
}
setTimeout(() => {
const again = confirm(`Game Over\nScore: ${score}\nHigh: ${high}\n\nPlay again?`);
if (again) restart();
}, 60);
}


function restart() {
obstacles = [];
spawnTimer = 0;
spawnInterval = 60;
gravitySpeed = 2;
score = 0;
running = true;
player.x = W / 2 - player.w / 2;
loop();
}


let rafId;
function loop() {
update();
draw();
if (running) rafId = requestAnimationFrame(loop);
else cancelAnimationFrame(rafId);
}


document.getElementById('restartBtn').addEventListener('click', () => { restart(); });
document.getElementById('muteBtn').addEventListener('click', () => {
muted = !muted;
document.getElementById('muteBtn').textContent = muted ? 'Unmute' : 'Mute';
});


function fixPixelRatio() {
const ratio = Math.min(window.devicePixelRatio || 1, 2);
canvas.width = Math.round(W * ratio);
canvas.height = Math.round(H * ratio);
canvas.style.width = W + 'px';
canvas.style.height = H + 'px';
ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}


window.addEventListener('resize', () => { resize(); fixPixelRatio(); });
