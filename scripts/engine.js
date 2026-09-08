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

    iskeys(code) {
        return this.justPressed.has(code);
    }

    update() {
        this.justPressed.clear();
    }
}