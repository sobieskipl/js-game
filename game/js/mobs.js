const mobs = {
    list: [],
    spawnCooldown: 5,
    spawnTimer: 0,

    spawnMob: function(maxX, maxY) {
        this.list.push({
            x: Math.random() * (maxX - 40),
            y: Math.random() * (maxY - 40),
            width: 40,
            height: 40,
            health: 5,
            maxHealth: 5,
            color: '#e74c3c',
            speed: 50
        });
    },

    update: function(gameState, player) {
        this.spawnTimer -= gameState.deltaTime;
        if (this.spawnTimer <= 0 && this.list.length < 1) {
            this.spawnTimer = this.spawnCooldown;
            this.spawnMob(canvas.width, canvas.height);
        }

        this.list.forEach(mob => {
            // Proste śledzenie gracza
            const dx = player.x - mob.x;
            const dy = player.y - mob.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > 0) {
                mob.x += (dx / distance) * mob.speed * gameState.deltaTime;
                mob.y += (dy / distance) * mob.speed * gameState.deltaTime;
            }

            if (this.checkCollision(mob, player)) {
                player.takeDamage(1 * gameState.deltaTime);
            }
        });

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
            ctx.fillStyle = mob.color;
            ctx.fillRect(mob.x, mob.y, mob.width, mob.height);

            ctx.fillStyle = 'red';
            ctx.fillRect(mob.x, mob.y - 10, mob.width * (mob.health / mob.maxHealth), 5);
        });
    }
};
