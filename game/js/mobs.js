const mobs = {
    list: [],
    spawnCooldown: 5,
    spawnTimer: 0,

    spawnMob: function(maxX, maxY) {
        // Spawn moba w losowym miejscu na mapie
        const padding = 200; // Nie spawnuj zbyt blisko gracza
        let x, y;
        
        do {
            x = Math.random() * (maxX - 40);
            y = Math.random() * (maxY - 40);
        } while (Math.abs(x - player.x) < padding && Math.abs(y - player.y) < padding);

        this.list.push({
            x: x,
            y: y,
            width: 40,
            height: 40,
            health: 5,
            maxHealth: 5,
            color: '#e74c3c',
            speed: 50
        });
    },

    // Reszta kodu pozostaje bez zmian
    update: function(gameState, player) {
        // Aktualizacja timerów spawnu
        this.spawnTimer -= gameState.deltaTime;
        if (this.spawnTimer <= 0 && this.list.length < 1) {
            this.spawnTimer = this.spawnCooldown;
            this.spawnMob(gameState.mapSize, gameState.mapSize);
        }

        // Aktualizacja mobów
        this.list.forEach(mob => {
            // Proste śledzenie gracza
            const dx = player.x - mob.x;
            const dy = player.y - mob.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > 0) {
                mob.x += (dx / distance) * mob.speed * gameState.deltaTime;
                mob.y += (dy / distance) * mob.speed * gameState.deltaTime;
            }

            // Kolizja z graczem
            if (this.checkCollision(mob, player)) {
                player.takeDamage(1 * gameState.deltaTime);
            }
        });

        // Usuwanie martwych mobów
        this.list = this.list.filter(mob => mob.health > 0);
    },

    checkAttack: function(x, y, damage) {
        this.list.forEach(mob => {
            if (x >= mob.x && x <= mob.x + mob.width &&
                y >= mob.y && y <= mob.y + mob.height) {
                mob.health -= damage;
            }
        });
    },

    checkCollision: function(a, b) {
        return a.x < b.x + b.width &&
               a.x + a.width > b.x &&
               a.y < b.y + b.height &&
               a.y + a.height > b.y;
    },

    render: function(ctx) {
        this.list.forEach(mob => {
            // Renderowanie moba
            ctx.fillStyle = mob.color;
            ctx.fillRect(mob.x, mob.y, mob.width, mob.height);

            // Renderowanie zdrowia
            ctx.fillStyle = 'red';
            ctx.fillRect(mob.x, mob.y - 10, mob.width * (mob.health / mob.maxHealth), 5);
        });
    }
};
