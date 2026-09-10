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

function createDestroyedBikeSprite() {
    const sCanvas = document.createElement('canvas');
    sCanvas.width = 110;
    sCanvas.height = 80;
    const sCtx = sCanvas.getContext('2d');

    // Scorch shadow
    sCtx.fillStyle = 'rgba(255, 60, 0, 0.4)';
    sCtx.beginPath();
    sCtx.ellipse(55, 52, 40, 14, 0, 0, Math.PI * 2);
    sCtx.fill();

    // Outer explosion burst
    sCtx.fillStyle = '#ff3d00';
    sCtx.beginPath();
    sCtx.arc(55, 42, 24, 0, Math.PI * 2);
    sCtx.arc(40, 36, 17, 0, Math.PI * 2);
    sCtx.arc(70, 38, 16, 0, Math.PI * 2);
    sCtx.fill();

    // Inner fiery core
    sCtx.fillStyle = '#ffea00';
    sCtx.beginPath();
    sCtx.arc(55, 42, 15, 0, Math.PI * 2);
    sCtx.arc(46, 38, 9, 0, Math.PI * 2);
    sCtx.arc(64, 40, 9, 0, Math.PI * 2);
    sCtx.fill();

    // Hot white flash
    sCtx.fillStyle = '#ffffff';
    sCtx.beginPath();
    sCtx.arc(55, 42, 7, 0, Math.PI * 2);
    sCtx.fill();

    // Debris fragments
    sCtx.fillStyle = '#00f0ff';
    sCtx.fillRect(26, 24, 6, 5);
    sCtx.fillRect(78, 22, 6, 5);
    sCtx.fillStyle = '#e61c38';
    sCtx.fillRect(36, 52, 7, 4);
    sCtx.fillRect(68, 54, 7, 4);

    return sCanvas;
}
const destroyedBikeSprite = createDestroyedBikeSprite();

function createDestroyedEnemySprite() {
    const sCanvas = document.createElement('canvas');
    sCanvas.width = 110;
    sCanvas.height = 80;
    const sCtx = sCanvas.getContext('2d');

    // Scorch shadow
    sCtx.fillStyle = 'rgba(0, 230, 118, 0.3)';
    sCtx.beginPath();
    sCtx.ellipse(55, 50, 40, 14, 0, 0, Math.PI * 2);
    sCtx.fill();

    // Outer plasma burst
    sCtx.fillStyle = '#ff1744';
    sCtx.beginPath();
    sCtx.arc(55, 42, 24, 0, Math.PI * 2);
    sCtx.arc(38, 38, 16, 0, Math.PI * 2);
    sCtx.arc(72, 36, 16, 0, Math.PI * 2);
    sCtx.fill();

    // Inner green/neon blast
    sCtx.fillStyle = '#00e676';
    sCtx.beginPath();
    sCtx.arc(55, 42, 14, 0, Math.PI * 2);
    sCtx.arc(46, 40, 8, 0, Math.PI * 2);
    sCtx.arc(64, 38, 8, 0, Math.PI * 2);
    sCtx.fill();

    // White core
    sCtx.fillStyle = '#ffffff';
    sCtx.beginPath();
    sCtx.arc(55, 42, 6, 0, Math.PI * 2);
    sCtx.fill();

    // Debris
    sCtx.fillStyle = '#ffff00';
    sCtx.fillRect(30, 28, 5, 5);
    sCtx.fillRect(75, 26, 6, 5);
    sCtx.fillStyle = '#4a148c';
    sCtx.fillRect(40, 56, 6, 4);

    return sCanvas;
}
const destroyedEnemySprite = createDestroyedEnemySprite();

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
        this.baseSpeed = 0.12;
        this.speed = 0.12;
        this.width = 1;
        this.length = 1.5;
        this.height = 1;

        this.groundZ= 5;
        this.vz= 0;
        this.isJumping = false;

        this.bullets = [];
        this.shootCoolDown = 0;

        // Flags & Frame Counters
        this.isDestroyed = false;
        this.destroyFrames = 30; // duration in frames to show destroyed sprite
        this.destroyTimer = 0;

        // Boost Pad: active only while colliding
        this.isOnBoostPad = false;
    }

    destroy() {
        if (this.isDestroyed) return;
        this.isDestroyed = true;
        this.destroyTimer = this.destroyFrames;
    }

    update() {
        if (this.isDestroyed) {
            if (this.destroyTimer === 0) this.destroyTimer = this.destroyFrames;
            this.destroyTimer--;
            if (this.destroyTimer <= 0) {
                this.isDestroyed = false;
                this.destroyTimer = 0;
                // Reset player position and boosts after destruction
                this.x = 6.5;
                this.y = 4;
                this.z = this.groundZ;
                this.vz = 0;
                this.isJumping = false;
                this.isOnBoostPad = false;
            }
            return;
        }

        // Boost pad gives a massive speed increase only while colliding
        if (this.isOnBoostPad) {
            this.speed = this.baseSpeed * 2.5;
        } else {
            this.speed = this.baseSpeed;
        }

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

            if((IM.isDown('KeyZ') || IM.isDown('KeyE')) && this.shootCoolDown === 0){
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

       // Boost thruster flames behind the bike when on boost pad
       if (this.isOnBoostPad) {
           ctx.save();
           const flameLen = 34;
           ctx.strokeStyle = '#ff6600';
           ctx.lineWidth = 4;
           ctx.beginPath();
           ctx.moveTo(center.x + 22, center.y + 10);
           ctx.lineTo(center.x + 22 + flameLen, center.y + 10 - flameLen * 0.45);
           ctx.stroke();
           ctx.restore();
       }

       const currentSprite = this.isDestroyed ? destroyedBikeSprite : bikeSprite;

       ctx.drawImage(
        currentSprite,
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
        this.height = 1;
        this.speed = 0.04;

        this.isDestroyed = false;
        this.destroyFrames = 30; // duration in frames to show destroyed sprite
        this.destroyTimer = 0;
    }

    destroy() {
        if (this.isDestroyed) return;
        this.isDestroyed = true;
        this.destroyTimer = this.destroyFrames;
    }

    update(scrollSpeed) {
        if (this.isDestroyed) {
            if (this.destroyTimer === 0) this.destroyTimer = this.destroyFrames;
            // Drift with the road while destroyed
            this.y -= scrollSpeed;
            this.destroyTimer--;
            if (this.destroyTimer <= 0) {
                this.isDestroyed = false;
                this.destroyTimer = 0;
                this.respawn();
            }
            return;
        }

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

        const currentSprite = this.isDestroyed ? destroyedEnemySprite : enemySprite;

        ctx.drawImage(
            currentSprite,
            center.x - spriteWidth / 2,
            center.y - 25,
            spriteWidth,
            spriteHeight
        );
    }

}

class BoostPad {
    constructor(x, y, length = 10.0, width = 2.2) {
        this.type = 'boost';
        this.subType = 'pad';
        this.x = x;
        this.y = y;
        this.z = 0.05; // Placed on the road surface
        this.length = length;
        this.width = width;
        this.height = 6.0; // High enough to intersect grounded vehicle at z=5

        this.animTimer = Math.random() * Math.PI * 2;
    }

    update(scrollSpeed) {
        this.animTimer += 0.05;
        this.y -= scrollSpeed;

        if (this.y + this.length < -5) {
            this.respawn();
        }
    }

    respawn() {
        this.y = 35 + Math.random() * 20;
        this.x = 6.5 + Math.random() * 2.0; // Stays centered on the road (minX=5, maxX=12)
    }

    draw(ctx) {
        const pBack   = RD.screenCoords(this.x, this.y + this.length, this.z);
        const pRight  = RD.screenCoords(this.x + this.width, this.y + this.length, this.z);
        const pFront  = RD.screenCoords(this.x + this.width, this.y, this.z);
        const pLeft   = RD.screenCoords(this.x, this.y, this.z);

        ctx.fillStyle = 'rgba(255, 120, 0, 0.45)';
        ctx.beginPath();
        ctx.moveTo(pBack.x, pBack.y);
        ctx.lineTo(pRight.x, pRight.y);
        ctx.lineTo(pFront.x, pFront.y);
        ctx.lineTo(pLeft.x, pLeft.y);
        ctx.closePath();
        ctx.fill();

        // Static direction arrows on the pad surface.
        const arrowLength = 1.2;
        const arrowWidth = 0.7;
        const arrowPositions = [
            this.y + this.length * 0.3,
            this.y + this.length * 0.7
        ];

        ctx.fillStyle = '#ffe600';
        for (const arrowY of arrowPositions) {
            const arrowPoints = [
                RD.screenCoords(this.x + this.width / 2, arrowY + arrowLength / 2, this.z + 0.02),
                RD.screenCoords(this.x + this.width / 2 + arrowWidth / 2, arrowY - arrowLength / 2, this.z + 0.02),
                RD.screenCoords(this.x + this.width / 2, arrowY - arrowLength * 0.1, this.z + 0.02),
                RD.screenCoords(this.x + this.width / 2 - arrowWidth / 2, arrowY - arrowLength / 2, this.z + 0.02)
            ];

            ctx.beginPath();
            ctx.moveTo(arrowPoints[0].x, arrowPoints[0].y);
            for (const point of arrowPoints.slice(1)) {
                ctx.lineTo(point.x, point.y);
            }
            ctx.closePath();
            ctx.fill();
        }

        // Neon border
        ctx.strokeStyle = '#ff9900';
        ctx.lineWidth = 3;
        ctx.stroke();
        }
    }

const Boost = BoostPad;
const boosts = BoostPad;

//Entities

const roadSegments = [
    new RoadSegment(5, 0, 7, 10),
    new RoadSegment(5, 10, 7, 10),

    // Gap of 4 world units
    new RoadSegment(5, 24, 7, 10),
    new RoadSegment(5, 34, 7, 10)
];

for (const road of roadSegments) {
    EM.add(road);
}

const playerVehicle = new Vehicle('player', 6.5, 4);
EM.add(playerVehicle);


const enemies = [
    new Enemy(7.0, 16),
    new Enemy(9.5, 23)
];

for (const enemy of enemies) {
    EM.add(enemy);
}

// Boost pads on the road
const boostPads = [
    new BoostPad(6.0, 14, 10.0, 3.0),
    new BoostPad(6.8, 38, 10.0, 3.0)
];

for (const pad of boostPads) {
    EM.add(pad);
}

let score = 0;


// Game loop
function gameLoop() {
    drawStarField(ctx);

    // Dynamic scroll speed: faster when on boost pad
    const baseScrollSpeed = 0.08;
    const scrollSpeed = playerVehicle.isOnBoostPad ? baseScrollSpeed * 2.2 : baseScrollSpeed;

    for (const entity of EM.entities) {
        if (entity instanceof RoadSegment) {
            entity.update(scrollSpeed);

            if (entity.y + entity.length < 0) {
                entity.y += 44;
            }
        }
    }

    for (const enemy of enemies) {
        enemy.update(scrollSpeed);
    }

    for (const pad of boostPads) {
        pad.update(scrollSpeed);
    }

    playerVehicle.update();

    const collisions = EM.getCollisions();

    // Bullet-to-Enemy Collision Check
    for (let bIndex = playerVehicle.bullets.length - 1; bIndex >= 0; bIndex--) {
        const bullet = playerVehicle.bullets[bIndex];

        for (const enemy of enemies) {
            if (enemy.isDestroyed) continue;

            // AABB hit distance check in world coordinates
            const dx = Math.abs(bullet.x - (enemy.x + enemy.width / 2));
            const dy = Math.abs(bullet.y - (enemy.y + enemy.length / 2));

            if (dx < 1.0 && dy < 1.2) {
                // HIT! Remove the bullet
                playerVehicle.bullets.splice(bIndex, 1);

                // Destroy the enemy (plays destruction animation for specified frames before respawning)
                enemy.destroy();

                // Award points
                score += 100;
                break;
            }
        }
    }

    // Enemy to player collision check
    for (const enemy of collisions.playerWithEnemy){
        if (!enemy.isDestroyed && !playerVehicle.isDestroyed) {
            enemy.destroy();
            playerVehicle.destroy();
        }
    }

    // Player and boost pad collision check: active only while colliding
    playerVehicle.isOnBoostPad = collisions.playerWithBoosts.length > 0;

    RD.render(EM.entities);
    IM.update();

    // Draw Retro Arcade Score HUD
    ctx.fillStyle = '#ffff00';
    ctx.font = 'bold 22px "Courier New", monospace';
    ctx.fillText(`SCORE: ${score}`, 30, 45);

    requestAnimationFrame(gameLoop);
}

gameLoop();