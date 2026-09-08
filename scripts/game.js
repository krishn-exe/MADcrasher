// Module imports
import { InputManager } from './engine.js';

// Canvas setup 
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();


const IM = new InputManager();


// Game loop
function gameLoop() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '50px Arial';
    ctx.fillStyle = 'blue';
    ctx.fillText('Press A D or space', 500, 300);

    if (IM.isDown('KeyA')) {
        ctx.font = '30px Arial';
        ctx.fillStyle = 'red';
        ctx.fillText('A key is pressed', 500, 400);
    }
    if (IM.isDown('KeyD')) {
        ctx.font = '30px Arial';
        ctx.fillStyle = 'red';
        ctx.fillText('D key is pressed', 500, 500);
    }
    if (IM.iskey('Space')) {
        ctx.font = '30px Arial';
        ctx.fillStyle = 'red';
        ctx.fillText('Space key was pressed', 500, 600);
    }


    IM.update();
    requestAnimationFrame(gameLoop);
}

gameLoop();