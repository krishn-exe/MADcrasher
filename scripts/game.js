// Module imports
import { InputManager, Renderer } from './engine.js';


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
const RD = new Renderer(ctx);

class RoadSegment {
    constructor(x, y) {
        this.x = x;       
        this.y = y;               
        this.z = 0;               
        this.width = 6;
        this.length = 10;

        this.topColor = '#3d4452';
    }

    draw(ctx) {

        const pBack   = RD.screenCoords(this.x, this.y + this.length, this.z);
        const pRight  = RD.screenCoords(this.x + this.width, this.y + this.length, this.z);
        const pFront  = RD.screenCoords(this.x + this.width, this.y, this.z);
        const pLeft   = RD.screenCoords(this.x, this.y, this.z);

        ctx.fillStyle = this.topColor;
        ctx.beginPath();
        ctx.moveTo(pBack.x, pBack.y);
        ctx.lineTo(pRight.x, pRight.y);
        ctx.lineTo(pFront.x, pFront.y);
        ctx.lineTo(pLeft.x, pLeft.y);
        ctx.closePath();
        ctx.fill();

    }
}

//Entities

const entities = [];
entities.push(new RoadSegment(9, 0));
entities.push(new RoadSegment(9, 9));
entities.push(new RoadSegment(9,18));
entities.push(new RoadSegment(9, 27));



// Game loop
function gameLoop() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '50px Arial';
    ctx.fillStyle = 'blue';
    ctx.fillText('Press A D or space', 500, 300);

    RD.render(entities);

    if (IM.isDown('KeyA') || IM.isDown("")) {
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