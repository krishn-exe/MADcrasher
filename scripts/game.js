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


function createBikeSprite(){
    const sCanvas = document.createElement('canvas');
    sCanvas.width = 120;
    sCanvas.height = 90;
    const sCtx = sCanvas.getContext('2d');

   
    sCtx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    sCtx.beginPath();
    sCtx.ellipse(55, 60, 35, 14, -Math.PI / 6, 0, Math.PI * 2);
    sCtx.fill();

   
    sCtx.fillStyle = '#201a40';
    sCtx.beginPath();
    sCtx.moveTo(20, 55);
    sCtx.lineTo(95, 22);
    sCtx.lineTo(105, 30);
    sCtx.lineTo(30, 68);
    sCtx.closePath();
    sCtx.fill();

    
    sCtx.fillStyle = '#e61c38'; 
    sCtx.beginPath();
    sCtx.moveTo(105, 20); 
    sCtx.lineTo(70, 52);  
    sCtx.lineTo(25, 62);  
    sCtx.lineTo(12, 48);  
    sCtx.lineTo(45, 18);  
    sCtx.closePath();
    sCtx.fill();

    sCtx.fillStyle = '#3a3ab5';
    sCtx.beginPath();
    sCtx.moveTo(50, 24);
    sCtx.lineTo(90, 24);
    sCtx.lineTo(60, 44);
    sCtx.lineTo(30, 44);
    sCtx.closePath();
    sCtx.fill();

    sCtx.fillStyle = '#00f0ff';
    sCtx.beginPath();
    sCtx.ellipse(72, 26, 14, 6, -Math.PI / 8, 0, Math.PI * 2);
    sCtx.fill();

    sCtx.fillStyle = '#ffcc00';
    sCtx.fillRect(14, 52, 10, 6);
    sCtx.fillRect(26, 58, 10, 6);

    return sCanvas;
}

const bikeSprite = createBikeSprite();  

const stars = [];
const starCount = 60;

for(let i = 0; i< starCount; i++){
    stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 1.5  + 0.5,
        speed: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.7 + 0.3,
        
    })
}

function drawStarField(ctx) {
    ctx.fillStyle = '#08082a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle =  '#ffffff';
    for(const s of stars){
        ctx.globalAlpha = s.alpha;
        ctx.fillRect(s.x, s.y, s.size, s.size);
        
        s.y = s.y + s.speed;
        
        if(s.y > canvas.height){
        s.y = 0;    
        s.x = Math.random() * canvas.width;
       }
    }

    ctx.globalAlpha = 1.0;

    
}

class RoadSegment {
    constructor(x, y , width = 7, length = 10) {
        this.x = x;       
        this.y = y;               
        this.z = 0;               
        this.width = width;
        this.length = length;

        this.topColor = '#3d4452';
    }

    update(speed){
        this.y = this.y-speed;
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

class Bullet{
    constructor(x, y, z){
        this.x = x;
        this.y=y;
        this.z=z;
        this.speed=0.6;
        this.length=1.0;
    }

    update(){
        this.y = this.y + this.speed;

    }

    draw(ctx){
        const start = RD.screenCoords(this.x, this.y, this.z);
        const tip = RD.screenCoords(this.x, this.y + this.length, this.z);

        ctx.strokeStyle = '#00ffcc';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(tip.x, tip.y);
        ctx.stroke();
    }
}

class Vehicle {
    constructor(type, x = 8, y = 5) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.z = 20; 
        this.speed = 0.1;
        this.width = 1;
        this.length = 1.5;

        this.groundZ= 20;
        this.vz= 0;
        this.isJumping = false;

        this.bullets = [];
        this.shootCoolDown = 0;
    }

    update() {
        if (this.type === 'player') {
            if (IM.isDown('KeyA') || IM.isDown('ArrowLeft')) {
                this.x += this.speed;
            }
            if (IM.isDown('KeyD') || IM.isDown('ArrowRight')) {
                this.x -= this.speed;
            }
            if(IM.isDown('KeyW') || IM.isDown('ArrowUp')){
                this.y += this.speed;
            }
            if(IM.isDown('KeyS') || IM.isDown('ArrowDown')) {
                this.y -= this.speed;
            }
            if(IM.isDown('Space') && !this.isJumping){
                this.isJumping = true;
                this.vz=2.5;
            }

            if(this.isJumping){
                this.z = this.z+this.vz;
                this.vz = this.vz-0.08;

                if(this.z <= this.groundZ){
                    this.z = this.groundZ;
                    this.vz=0;
                    this.isJumping=false;
                }
            }

            if(this.shootCoolDown > 0){

                this.shootCoolDown--;

            }

            if(IM.isDown('KeyZ') && this.shootCoolDown === 0){
                const bullet = new Bullet(
                    this.x + this.width /2,
                    this.y + this.length,
                    this.z
                );

              this.bullets.push(bullet);
              this.shootCoolDown = 12;
            }

            for (let i = this.bullets.length - 1; i >= 0; i--) {
                const b = this.bullets[i];
                b.update();

                 if (b.y > 25) {
                    this.bullets.splice(i, 1);
                }
            }

            const minX = 5.2;
            const maxX = 11.2;
            if(this.x < minX) this.x = minX;
            if(this.x > maxX) this.x = maxX

            const minY = 0.8;
            const maxY = 18.0;
            if(this.y < minY) this.y = minY;
            if(this.y > maxY) this.y = maxY;
        }
    }

    draw(ctx) {
       const center = RD.screenCoords(
        this.x + this.width/2,
        this.y + this.length/2,
        this.z
       );

       const spriteWidth = 105;
       const spriteHeight = 78; 

       ctx.drawImage(
        bikeSprite,
        center.x - spriteWidth/2,
        center.y - spriteHeight/2,
        spriteWidth,
        spriteHeight
       );

       
        for (const b of this.bullets) {
            b.draw(ctx);
        }



    }
}



//Entities

EM.entities.push(new RoadSegment(5, 0));
EM.entities.push(new RoadSegment(5, 10));

const playerVehicle = new Vehicle('player', 6.5, 4);
EM.entities.push(playerVehicle);

// Game loop
function gameLoop() {
    drawStarField(ctx);

    const scrollSpeed = 0.08;
    for(const entity of EM.entities){
        if(entity instanceof RoadSegment){
            entity.update(scrollSpeed);

            if(entity.y + entity.length < -2){
                entity.y = 10;
            }
        }
    }

    playerVehicle.update();
    RD.render(EM.entities);
    IM.update();
    requestAnimationFrame(gameLoop);
}

gameLoop();