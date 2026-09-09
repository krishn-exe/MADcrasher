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
        this.halfWidth = 50;
        this.halfHeight = 25;
    }
    screenCoords(x,y,z){
        return {
            x: this.ctx.canvas.width / 2 + (y - x) * this.halfWidth,
            y: this.ctx.canvas.height - ((x + y) * this.halfHeight + z)
        }
    }
    render(entities){
        entities.sort((a,b) => (b.x + b.y) - (a.x + a.y));

        for(const entity of entities){
            entity.draw(this.ctx);
        }
    }
}