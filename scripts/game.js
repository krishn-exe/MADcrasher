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

if (IM.isDown('KeyA')) {
    ctx.font = '30px Arial';
    ctx.fillStyle = 'red';
    ctx.fillText('A key is pressed', 50, 50);
    console.log('A key is pressed');
}