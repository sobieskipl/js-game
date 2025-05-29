const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const healthDisplay = document.getElementById('health');

// Ustawienia canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Stan gry
const gameState = {
    keys: {},
    mouse: { x: 0, y: 0, isDown: false },
    lastTime: 0,
    deltaTime: 0,
    camera: { x: 0, y: 0 },
    mapSize: 5000
};

// Nasłuchiwanie zdarzeń
window.addEventListener('keydown', (e) => {
    gameState.keys[e.key.toLowerCase()] = true;
});

window.addEventListener('keyup', (e) => {
    gameState.keys[e.key.toLowerCase()] = false;
});

canvas.addEventListener('mousemove', (e) => {
    gameState.mouse.x = e.clientX + gameState.camera.x;
    gameState.mouse.y = e.clientY + gameState.camera.y;
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

// Pętla gry
function gameLoop(timestamp) {
    gameState.deltaTime = (timestamp - gameState.lastTime) / 1000;
    gameState.lastTime = timestamp;

    // Czyszczenie ekranu z zielonym tłem
    ctx.fillStyle = '#2ecc71'; // Zielone tło
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Aktualizacja kamery
    gameState.camera.x = player.x - canvas.width / 2 + player.width / 2;
    gameState.camera.y = player.y - canvas.height / 2 + player.height / 2;

    // Ograniczenie kamery do rozmiarów mapy
    gameState.camera.x = Math.max(0, Math.min(gameState.mapSize - canvas.width, gameState.camera.x));
    gameState.camera.y = Math.max(0, Math.min(gameState.mapSize - canvas.height, gameState.camera.y));

    // Zapisanie stanu transformacji
    ctx.save();
    // Przesunięcie kamery
    ctx.translate(-gameState.camera.x, -gameState.camera.y);

    // Aktualizacja i renderowanie gracza
    player.update(gameState);
    player.render(ctx);

    // Aktualizacja i renderowanie mobów
    mobs.update(gameState, player);
    mobs.render(ctx);

    // Przywrócenie stanu transformacji
    ctx.restore();

    // Aktualizacja zdrowia (zaokrąglone)
    healthDisplay.textContent = `HP: ${Math.round(player.health)}`;

    requestAnimationFrame(gameLoop);
}

// Inicjalizacja
player.init();
mobs.spawnMob(gameState.mapSize, gameState.mapSize);
inventory.init();

// Start gry
requestAnimationFrame(gameLoop);
