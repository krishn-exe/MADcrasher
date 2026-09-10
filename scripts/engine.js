export class InputManager {
  constructor() {
    this.keysDown = new Set();
    this.justPressed = new Set();

    const blockedKeys = new Set(['KeyA', 'KeyD', 'KeyE', 'Space', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']);

        window.addEventListener('keydown', (e) => {
            if (blockedKeys.has(e.code)) {
                e.preventDefault();
            }

            if (!e.repeat) {
                this.justPressed.add(e.code);
            }
            this.keysDown.add(e.code);
        });

        window.addEventListener('keyup', (e) => {
            this.keysDown.delete(e.code);
            this.justPressed.delete(e.code);
        });
    }

    isDown(code) {
        return this.keysDown.has(code);
    }

    isJustPressed(code) {
        return this.justPressed.has(code);
    }

    update() {
        this.justPressed.clear();
    }
}

export class Renderer {
    constructor(ctx) {
        this.ctx = ctx;
        this.halfWidth = 60;
        this.halfHeight = 30;
    }
    screenCoords(x,y,z){
        return {
            x: this.ctx.canvas.width / 2 + (y - x) * this.halfWidth,
            y: this.ctx.canvas.height - ((x + y) * this.halfHeight + z)
        }
    }
    render(entities){
        entities.sort((a,b) => (a.z - b.z) || ((b.x + b.y) - (a.x + a.y)));

        for(const entity of entities){
            entity.draw(this.ctx);
        }
    }
}

export class EntityManager {
    constructor() {
        this.entities = [];

        this.player = null;
        this.enemies = [];
        this.bullets = [];
        this.roads = [];
        this.boosts = [];
        this.obstacles = [];
        this.background = null;

    }

    add(entity) {
        this.entities.push(entity);
        switch (entity.type) {
            case 'background':
                this.background = entity;
                break;
            case 'player':
                this.player = entity;
                break;
            case 'enemy':
                this.enemies.push(entity);
                break;
            case 'bullet':
                this.bullets.push(entity);
                break;
            case 'road':
                this.roads.push(entity);
                break;
            case 'boost':
            case 'pad':
                this.boosts.push(entity);
                break;
            case 'obstacle':
                this.obstacles.push(entity);
                break;
        }
    }
    remove(entity) {
        const index = this.entities.indexOf(entity);
        const type = entity.type;

        if (index > -1) {
            this.entities.splice(index, 1);
        }

        switch (type) {
            case 'background':
                this.background = null;
                break;
            case 'player':
                this.player = null;
                break;
            case 'enemy':
                this.enemies.splice(this.enemies.indexOf(entity), 1);
                break;
            case 'bullet':
                this.bullets.splice(this.bullets.indexOf(entity), 1);
                break;
            case 'road':
                this.roads.splice(this.roads.indexOf(entity), 1);
                break;
            case 'boost':
                this.boosts.splice(this.boosts.indexOf(entity), 1);
                break;
            case 'obstacle':
                this.obstacles.splice(this.obstacles.indexOf(entity), 1);
                break;
        }

    }
    getEntities() {
        return this.entities;
    }   

    areColliding(entityA, entityB) {
        if (!entityA || !entityB) return false;

        const ax1 = entityA.x; const ax2 = entityA.x + entityA.width;
        const ay1 = entityA.y; const ay2 = entityA.y + entityA.length;
        const az1 = entityA.z; const az2 = entityA.z + (entityA.height ?? 1);

        const bx1 = entityB.x; const bx2 = entityB.x + entityB.width;
        const by1 = entityB.y; const by2 = entityB.y + entityB.length;
        const bz1 = entityB.z; const bz2 = entityB.z + (entityB.height ?? 1);

        if (ax1 < bx2 && ax2 > bx1 &&
            ay1 < by2 && ay2 > by1 &&
            az1 < bz2 && az2 > bz1) {
            return true;
        }
        return false;
    }

    getCollisions() {

        const collisions = {
            playerWithEnemy: [],
            playerWithBullets: [],
            playerWithBoosts: [],
            playerWithObstacles: [],
            enemyPileups: [],
        };

        if (this.player) {
            for (let i = 0; i < this.enemies.length; i++) {
                const enemy = this.enemies[i];
                if (this.areColliding(this.player, enemy)) {
                    collisions.playerWithEnemy.push(enemy);
                }
            }

            for (let i = 0; i < this.bullets.length; i++) {
                const bullet = this.bullets[i];
                if (this.areColliding(bullet, this.player)) {
                    collisions.playerWithBullets.push(bullet);
                }
            }

            for (let i = 0; i < this.boosts.length; i++) {
                const boost = this.boosts[i];
                if (this.areColliding(boost, this.player)) {
                    collisions.playerWithBoosts.push(boost);
                }
            }

            for (let i = 0; i < this.obstacles.length; i++) {
                const obstacle = this.obstacles[i];
                if (this.areColliding(obstacle, this.player)) {
                    collisions.playerWithObstacles.push(obstacle);
                }
            }
        }

        for (let i = 0; i < this.bullets.length; i++) {
            const bullet = this.bullets[i];
            for (let j = 0; j < this.enemies.length; j++) {
                const enemy = this.enemies[j];
                if (this.areColliding(bullet, enemy)) {
                    collisions.enemyPileups.push({ bullet, enemy });
                    break;
                }
            }
        }

        for (let i = 0; i < this.enemies.length; i++) {
            for (let j = i + 1; j < this.enemies.length ; j++) {
                if (this.areColliding(this.enemies[i], this.enemies[j])) {
                    collisions.enemyPileups.push([this.enemies[i], this.enemies[j]]);
                }
            }
        }

    return collisions;
    }
}