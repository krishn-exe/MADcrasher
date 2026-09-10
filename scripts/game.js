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


function createBikeSprite() {
    const sCanvas = document.createElement('canvas');
    sCanvas.width = 110;
    sCanvas.height = 80;
    const sCtx = sCanvas.getContext('2d');

    
    sCtx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    sCtx.beginPath();
    sCtx.ellipse(55, 52, 38, 12, -Math.PI / 6, 0, Math.PI * 2);
    sCtx.fill();

    sCtx.fillStyle = '#101015'; 
   
    sCtx.beginPath();
    sCtx.ellipse(32, 54, 15, 8, -Math.PI / 6, 0, Math.PI * 2);
    sCtx.fill();
    
    sCtx.beginPath();
    sCtx.ellipse(78, 30, 15, 8, -Math.PI / 6, 0, Math.PI * 2);
    sCtx.fill();

    
    sCtx.fillStyle = '#00f0ff';
    sCtx.beginPath();
    sCtx.arc(32, 54, 4, 0, Math.PI * 2);
    sCtx.arc(78, 30, 4, 0, Math.PI * 2);
    sCtx.fill();

    
    sCtx.fillStyle = '#e61c38'; 
    sCtx.beginPath();
    sCtx.moveTo(96, 20); 
    sCtx.lineTo(65, 42);
    sCtx.lineTo(24, 52); 
    sCtx.lineTo(34, 58); 
    sCtx.lineTo(76, 36); 
    sCtx.closePath();
    sCtx.fill();

    
    sCtx.fillStyle = '#3a3ab5';
    sCtx.beginPath();
    sCtx.moveTo(48, 26);
    sCtx.lineTo(82, 26);
    sCtx.lineTo(60, 42);
    sCtx.lineTo(32, 42);
    sCtx.closePath();
    sCtx.fill();

    
    sCtx.fillStyle = '#00f0ff';
    sCtx.beginPath();
    sCtx.ellipse(68, 25, 12, 6, -Math.PI / 8, 0, Math.PI * 2);
    sCtx.fill();

    
    sCtx.fillStyle = '#ffaa00';
    sCtx.fillRect(18, 48, 8, 5);

    return sCanvas;
}



const bikeSprite = createBikeSprite();

function createEnemySprite() {
    const sCanvas = document.createElement('canvas');
    sCanvas.width = 110;
    sCanvas.height = 80;
    const sCtx = sCanvas.getContext('2d');

    
    sCtx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    sCtx.beginPath();
    sCtx.ellipse(55, 48, 42, 12, -Math.PI / 6, 0, Math.PI * 2);
    sCtx.fill();

    
    sCtx.fillStyle = '#101015';
    sCtx.beginPath();
    sCtx.ellipse(32, 54, 15, 8, -Math.PI / 6, 0, Math.PI * 2); // Front tire (closer to player)
    sCtx.ellipse(78, 30, 15, 8, -Math.PI / 6, 0, Math.PI * 2); // Rear tire
    sCtx.fill();

    
    sCtx.fillStyle = '#00e676';
    sCtx.beginPath();
    sCtx.moveTo(18, 56);
    sCtx.lineTo(45, 38);
    sCtx.lineTo(92, 18); 
    sCtx.lineTo(82, 32);
    sCtx.lineTo(35, 58);
    sCtx.closePath();
    sCtx.fill();

   
    sCtx.fillStyle = '#4a148c';
    sCtx.beginPath();
    sCtx.moveTo(35, 44);
    sCtx.lineTo(75, 24);
    sCtx.lineTo(65, 38);
    sCtx.lineTo(30, 52);
    sCtx.closePath();
    sCtx.fill();

    
    sCtx.fillStyle = '#ff1744';
    sCtx.beginPath();
    sCtx.ellipse(45, 40, 12, 5, -Math.PI / 6, 0, Math.PI * 2);
    sCtx.fill();

   
    sCtx.fillStyle = '#ffff00';
    sCtx.beginPath();
    sCtx.arc(20, 54, 3, 0, Math.PI * 2);
    sCtx.arc(26, 58, 3, 0, Math.PI * 2);
    sCtx.fill();

    return sCanvas;
}


const enemySprite = createEnemySprite();


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
    constructor(x, y, width = 7, length = 10) {
        this.x = x;       
        this.y = y;               
        this.z = 0;               
        this.width = width;
        this.length = length;
        this.topColor = '#4e4868';
    }

    update(speed) {
        this.y = this.y - speed;
    }

    draw(ctx) {
        
        const pBack  = RD.screenCoords(this.x, this.y + this.length, this.z);
        const pRight = RD.screenCoords(this.x + this.width, this.y + this.length, this.z);
        const pFront = RD.screenCoords(this.x + this.width, this.y, this.z);
        const pLeft  = RD.screenCoords(this.x, this.y, this.z);

        
        const dropZ = -8;
        const pFrontDrop = RD.screenCoords(this.x + this.width, this.y, this.z + dropZ);
        const pLeftDrop  = RD.screenCoords(this.x, this.y, this.z + dropZ);

        ctx.fillStyle = '#221c38'; 
        ctx.beginPath();
        ctx.moveTo(pLeft.x, pLeft.y);
        ctx.lineTo(pFront.x, pFront.y);
        ctx.lineTo(pFrontDrop.x, pFrontDrop.y);
        ctx.lineTo(pLeftDrop.x, pLeftDrop.y);
        ctx.closePath();
        ctx.fill();

        
        ctx.fillStyle = '#4e4868';
        ctx.beginPath();
        ctx.moveTo(pBack.x, pBack.y);
        ctx.lineTo(pRight.x, pRight.y);
        ctx.lineTo(pFront.x, pFront.y);
        ctx.lineTo(pLeft.x, pLeft.y);
        ctx.closePath();
        ctx.fill();

       
        ctx.strokeStyle = '#8278a8';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(pLeft.x, pLeft.y);
        ctx.lineTo(pBack.x, pBack.y);
        ctx.stroke();

        
        ctx.strokeStyle = '#322c4c';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(pFront.x, pFront.y);
        ctx.lineTo(pRight.x, pRight.y);
        ctx.stroke();
    }
}

class Bullet {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.speed = 0.6;
        this.length = 1.0;
    }

    update() {
        this.y = this.y + this.speed;
    }

    draw(ctx) {
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
        this.z = 5; 
        this.speed = 0.1;
        this.width = 1;
        this.length = 1.5;

        this.groundZ= 5;
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
        center.y - 25,
        spriteWidth,
        spriteHeight
       );

       
        for (const b of this.bullets) {
            b.draw(ctx);
        }



    }
}

class Enemy {
    constructor(x, y) {
        this.type = 'enemy';
        this.x = x;
        this.y = y;
        this.z = 5; 
        this.width = 1;
        this.length = 1.5;
        this.speed = 0.04;
    }

    update(scrollSpeed) {
    
        this.y -= (this.speed + scrollSpeed);

    
        if (this.y < -2) {
            this.respawn();
        }
    }

    respawn() {
        this.y = 22 + Math.random() * 6; 
        this.x = 6.0 + Math.random() * 4.5; 
    }

           draw(ctx) {
        const center = RD.screenCoords(
            this.x + this.width / 2,
            this.y + this.length / 2,
            this.z
        );

        const spriteWidth = 105;
        const spriteHeight = 78;

        ctx.drawImage(
            enemySprite,
            center.x - spriteWidth / 2,
            center.y - 25,
            spriteWidth,
            spriteHeight
        );
    }

}




//Entities

EM.entities.push(new RoadSegment(5, 0));
EM.entities.push(new RoadSegment(5, 10));

const playerVehicle = new Vehicle('player', 6.5, 4);
EM.entities.push(playerVehicle);


const enemies = [
    new Enemy(7.0, 16),
    new Enemy(9.5, 23)
];

for (const enemy of enemies) {
    EM.entities.push(enemy);
}

let score = 0;


// Game loop
function gameLoop() {
    drawStarField(ctx);

    const scrollSpeed = 0.08;
    for(const entity of EM.entities){
        if(entity instanceof RoadSegment){
            entity.update(scrollSpeed);

            if(entity.y + entity.length < 0){
                entity.y += 20;
            }
        }
    }

        for (const enemy of enemies) {
        enemy.update(scrollSpeed);
    }


    playerVehicle.update();

        // Bullet-to-Enemy Collision Check
    for (let bIndex = playerVehicle.bullets.length - 1; bIndex >= 0; bIndex--) {
        const bullet = playerVehicle.bullets[bIndex];

        for (const enemy of enemies) {
            // AABB hit distance check in world coordinates
            const dx = Math.abs(bullet.x - (enemy.x + enemy.width / 2));
            const dy = Math.abs(bullet.y - (enemy.y + enemy.length / 2));

            if (dx < 1.0 && dy < 1.2) {
                // HIT! Remove the bullet
                playerVehicle.bullets.splice(bIndex, 1);

                // Respawn the destroyed enemy back at the horizon
                enemy.respawn();

                // Award points
                score += 100;
                break;
            }
        }
    }



    RD.render(EM.entities);
    IM.update();

        // Draw Retro Arcade Score HUD
    ctx.fillStyle = '#ffff00';
    ctx.font = 'bold 22px "Courier New", monospace';
    ctx.fillText(`SCORE: ${score}`, 30, 45);


    requestAnimationFrame(gameLoop);
}

gameLoop();