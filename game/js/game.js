const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const healthDisplay = document.getElementById('health');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const gameState = {
    keys: {},
    mouse: { x: 0, y: 0, isDown: false },
    lastTime: 0,
    deltaTime: 0
};

window.addEventListener('keydown', (e) => {
    gameState.keys[e.key.toLowerCase()] = true;
});

window.addEventListener('keyup', (e) => {
    gameState.keys[e.key.toLowerCase()] = false;
});

canvas.addEventListener('mousemove', (e) => {
    gameState.mouse.x = e.clientX;
    gameState.mouse.y = e.clientY;
});

canvas.addEventListener('mousedown', (e) => {
    if (e.button === 0) { // LPM
        gameState.mouse.isDown = true;
    }
});

canvas.addEventListener('mouseup', (e) => {
    if (e.button === 0) {
        gameState.mouse.isDown = false;
    }
});

function gameLoop(timestamp) {
    gameState.deltaTime = (timestamp - gameState.lastTime) / 1000;
    gameState.lastTime = timestamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    player.update(gameState);
    player.render(ctx);

    mobs.update(gameState, player);
    mobs.render(ctx);

    healthDisplay.textContent = `HP: ${player.health}`;

    requestAnimationFrame(gameLoop);
}

player.init();
mobs.spawnMob(canvas.width, canvas.height);
inventory.init();

requestAnimationFrame(gameLoop);
