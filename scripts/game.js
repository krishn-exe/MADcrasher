// Module imports
import { InputManager, Renderer, EntityManager} from './engine.js';


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
const EM = new EntityManager();

class RoadSegment {
    constructor(x, y , width = 7, length = 10) {
        this.x = x;       
        this.y = y;               
        this.z = 0;               
        this.width = width;
        this.length = length;

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

class Vehicle {
    constructor(type, x, y) {
        this.type = type
        this.x = x;
        this.y = y;
        this.z = 5; 
        this.speed = 0.1;
        this.width = 1;
        this.length = 1.5;
        this.height = 1;
    }

    update() {
        if (this.type === 'player') {
            if (IM.isDown('KeyA')) {
                this.x -= this.speed;
            }
            if (IM.isDown('KeyD')) {
                this.x += this.speed;
            }
        }
    }

    draw(ctx) {
        const pBack = RD.screenCoords(this.x, this.y + this.length, this.z);
        const pRight = RD.screenCoords(this.x + this.width, this.y + this.length, this.z);
        const pFront = RD.screenCoords(this.x + this.width, this.y, this.z);
        const pLeft = RD.screenCoords(this.x, this.y, this.z);

        ctx.fillStyle = '#00e5ff';
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

EM.add(new RoadSegment(5, 0));
EM.add(new RoadSegment(5, 10));

const playerVehicle = new Vehicle('player', 8, 5);
EM.add(playerVehicle);

// Game loop
function gameLoop() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    playerVehicle.update();
    RD.render(EM.entities);
    IM.update();
    requestAnimationFrame(gameLoop);
}

gameLoop();