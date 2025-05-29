const player = {
    x: 0,
    y: 0,
    width: 40,
    height: 40,
    speed: 200,
    health: 100,
    color: '#3498db',
    attackDamage: 10,
    attackCooldown: 0.5,
    attackTimer: 0,

    init: function() {
        this.x = gameState.mapSize / 2 - this.width / 2;
        this.y = gameState.mapSize / 2 - this.height / 2;
    },

    update: function(gameState) {
        // Ruch
        let moveX = 0;
        let moveY = 0;

        if (gameState.keys['w']) moveY -= 1;
        if (gameState.keys['s']) moveY += 1;
        if (gameState.keys['a']) moveX -= 1;
        if (gameState.keys['d']) moveX += 1;

        // Normalizacja wektora ruchu
        if (moveX !== 0 || moveY !== 0) {
            const length = Math.sqrt(moveX * moveX + moveY * moveY);
            moveX /= length;
            moveY /= length;
        }

        this.x += moveX * this.speed * gameState.deltaTime;
        this.y += moveY * this.speed * gameState.deltaTime;

        // Ograniczenie ruchu do granic mapy
        this.x = Math.max(0, Math.min(gameState.mapSize - this.width, this.x));
        this.y = Math.max(0, Math.min(gameState.mapSize - this.height, this.y));

        // Atak
        this.attackTimer -= gameState.deltaTime;
        if (gameState.mouse.isDown && this.attackTimer <= 0) {
            this.attackTimer = this.attackCooldown;
            this.attack(gameState.mouse.x, gameState.mouse.y);
        }
    },

    attack: function(targetX, targetY) {
        mobs.checkAttack(targetX, targetY, this.attackDamage);
    },

    takeDamage: function(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            console.log('Game Over!');
            this.health = 0;
        }
    },

    render: function(ctx) {
        // Renderowanie gracza
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Renderowanie zdrowia
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y - 10, this.width * (this.health / 100), 5);
    }
};
