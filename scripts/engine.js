// Input Manager

export class InputManager {
  constructor() {
    this.keysDown = new Set();
    this.justPressed = new Set();

    const blockedKeys = new Set(['KeyA', 'KeyD', 'KeyE', 'Space']);

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

    iskey(code) {
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
    }
    add(entity) {
        this.entities.push(entity);
        return entity;
    }
    remove(entity) {
        const index = this.entities.indexOf(entity);
        if (index > -1) {
            this.entities.splice(index, 1);
        }
    }
    getEntities() {
        return this.entities;
    }

    areColliding(entityA, entityB) {
        const ax1 = entityA.x; const ax2 = entityA.x + entityA.width;
        const ay1 = entityA.y; const ay2 = entityA.y + entityA.length;
        const az1 = entityA.z; const az2 = entityA.z + entityA.height;

        const bx1 = entityB.x; const bx2 = entityB.x + entityB.width;
        const by1 = entityB.y; const by2 = entityB.y + entityB.length;
        const bz1 = entityB.z; const bz2 = entityB.z + entityB.height;

        if (ax1 < bx2 && ax2 > bx1 &&
            ay1 < by2 && ay2 > by1 &&
            az1 < bz2 && az2 > bz1) {
            return true;
        }
        return false;
    }
}