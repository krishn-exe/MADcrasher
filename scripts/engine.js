// Input Manager

export class InputManager {
  constructor() {
    this.keysDown = new Set();
    this.keys = new Set();

    const blockedKeys = new Set(['KeyA', 'KeyD', 'KeyE', 'Space']);

        window.addEventListener('keydown', (e) => {
            if (blockedKeys.has(e.code)) {
                e.preventDefault();
            }

            if (!e.repeat) {
                this.keys.add(e.code);
            }
            this.keysDown.add(e.code);
        });

        window.addEventListener('keyup', (e) => {
            this.keysDown.delete(e.code);
            this.keys.delete(e.code);
        });
    }

    isDown(code) {
        return this.keysDown.has(code);
    }

    iskeys(code) {
        return this.keys.has(code);
    }

    update() {
        this.keys.clear();
    }
}