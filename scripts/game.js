import { InputManager, Renderer, EntityManager} from './engine.js';


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

const urlParams = new URLSearchParams(window.location.search);
const playerName = urlParams.get('player-name') || localStorage.getItem('currentPlayer') || 'Player';
localStorage.setItem('currentPlayer', playerName);


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
    sCtx.ellipse(32, 54, 15, 8, -Math.PI / 6, 0, Math.PI * 2);
    sCtx.ellipse(78, 30, 15, 8, -Math.PI / 6, 0, Math.PI * 2);
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

    sCtx.fillStyle = 'rgba(255, 60, 0, 0.4)';
    sCtx.beginPath();
    sCtx.ellipse(55, 52, 40, 14, 0, 0, Math.PI * 2);
    sCtx.fill();

    sCtx.fillStyle = '#ff3d00';
    sCtx.beginPath();
    sCtx.arc(55, 42, 24, 0, Math.PI * 2);
    sCtx.arc(40, 36, 17, 0, Math.PI * 2);
    sCtx.arc(70, 38, 16, 0, Math.PI * 2);
    sCtx.fill();

    sCtx.fillStyle = '#ffea00';
    sCtx.beginPath();
    sCtx.arc(55, 42, 15, 0, Math.PI * 2);
    sCtx.arc(46, 38, 9, 0, Math.PI * 2);
    sCtx.arc(64, 40, 9, 0, Math.PI * 2);
    sCtx.fill();

    sCtx.fillStyle = '#ffffff';
    sCtx.beginPath();
    sCtx.arc(55, 42, 7, 0, Math.PI * 2);
    sCtx.fill();

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

    sCtx.fillStyle = 'rgba(0, 230, 118, 0.3)';
    sCtx.beginPath();
    sCtx.ellipse(55, 50, 40, 14, 0, 0, Math.PI * 2);
    sCtx.fill();

    sCtx.fillStyle = '#ff1744';
    sCtx.beginPath();
    sCtx.arc(55, 42, 24, 0, Math.PI * 2);
    sCtx.arc(38, 38, 16, 0, Math.PI * 2);
    sCtx.arc(72, 36, 16, 0, Math.PI * 2);
    sCtx.fill();

    sCtx.fillStyle = '#00e676';
    sCtx.beginPath();
    sCtx.arc(55, 42, 14, 0, Math.PI * 2);
    sCtx.arc(46, 40, 8, 0, Math.PI * 2);
    sCtx.arc(64, 38, 8, 0, Math.PI * 2);
    sCtx.fill();

    sCtx.fillStyle = '#ffffff';
    sCtx.beginPath();
    sCtx.arc(55, 42, 6, 0, Math.PI * 2);
    sCtx.fill();

    sCtx.fillStyle = '#ffff00';
    sCtx.fillRect(30, 28, 5, 5);
    sCtx.fillRect(75, 26, 6, 5);
    sCtx.fillStyle = '#4a148c';
    sCtx.fillRect(40, 56, 6, 4);

    return sCanvas;
}
const destroyedEnemySprite = createDestroyedEnemySprite();

class ParallaxBackground {
    constructor(imageSrc = 'assets/background.png') {
        this.type = 'background';
        this.z = -999999;
        this.x = 0;
        this.y = 0;

        this.image = new Image();
        this.isLoaded = false;
        this.image.onload = () => {
            this.isLoaded = true;
        };
        this.image.onerror = () => {
            if (!this.image.src.includes('backround.png')) {
                this.image.src = 'assets/backround.png';
            }
        };
        this.image.src = imageSrc;

        if (this.image.complete && this.image.naturalWidth > 0) {
            this.isLoaded = true;
        }

        this.scrollX = 0;
        this.scrollY = 0;
        this.steerOffset = 0;
        this.parallaxSpeed = 0.2;
    }

    update(scrollSpeed, player) {
        this.scrollX -= scrollSpeed * 60 * this.parallaxSpeed;
        this.scrollY += scrollSpeed * 30 * this.parallaxSpeed;

        if (player) {
            const centerTrackX = 8.2;
            const targetSteerOffset = (player.x - centerTrackX) * 8;
            this.steerOffset += (targetSteerOffset - this.steerOffset) * 0.1;
        }
    }

    draw(ctx) {
        const canvas = ctx.canvas;

        ctx.fillStyle = '#08082a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (!this.image.complete || !this.image.naturalWidth) {
            return;
        }

        const aspect = this.image.naturalWidth / this.image.naturalHeight;
        const tileHeight = Math.max(canvas.height, 600);
        const tileWidth = tileHeight * aspect;

        const startX = (((this.scrollX + this.steerOffset) % tileWidth) + tileWidth) % tileWidth - tileWidth;
        const startY = ((this.scrollY % tileHeight) + tileHeight) % tileHeight - tileHeight;

        for (let x = startX; x < canvas.width; x += tileWidth) {
            for (let y = startY; y < canvas.height; y += tileHeight) {
                ctx.drawImage(this.image, Math.floor(x), Math.floor(y), Math.ceil(tileWidth), Math.ceil(tileHeight));
            }
        }
    }
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
        this.maxSpeed = 0.28;
        this.accelerationRate = 0.007;
        this.decelerationRate = 0.003;
        this.speed = this.baseSpeed;
        this.width = 1;
        this.length = 1.5;
        this.height = 1;

        this.groundZ= 5;
        this.vz= 0;
        this.isJumping = false;

        this.bullets = [];
        this.shootCoolDown = 0;

        this.isDestroyed = false;
        this.destroyFrames = 30;
        this.destroyTimer = 0;

        this.lives = 3;

        this.isOnBoostPad = false;
    }

    destroy() {
        if (this.isDestroyed) return;
        this.isDestroyed = true;
        this.destroyTimer = this.destroyFrames;
        this.lives--;
        const crashSound = document.getElementById('crashSound');
        if (crashSound) {
            crashSound.currentTime = 0;
            crashSound.play().catch(() => {});
        }
    }

    update() {
        if (this.isDestroyed) {
            if (this.destroyTimer === 0) this.destroyTimer = this.destroyFrames;
            this.destroyTimer--;
            if (this.destroyTimer <= 0) {
                this.destroyTimer = 0;
                if (this.lives <= 0) {
                    triggerGameOver();
                    return;
                }
                this.isDestroyed = false;
                this.x = 6.5;
                this.y = 4;
                this.z = this.groundZ;
                this.vz = 0;
                this.isJumping = false;
                this.isOnBoostPad = false;
                this.speed = this.baseSpeed;
            }
            return;
        }

        if (this.isOnBoostPad) {
            this.speed = Math.min(this.maxSpeed, this.speed + this.accelerationRate);
        } else if (this.speed > this.baseSpeed) {
            this.speed = Math.max(this.baseSpeed, this.speed - this.decelerationRate);
        }

        if (this.type === 'player') {
            if (IM.isDown('KeyA') || IM.isDown('ArrowLeft')) {
                this.x += this.speed;
            }
            if (IM.isDown('KeyD') || IM.isDown('ArrowRight')) {
                this.x -= this.speed;
            }
            if(IM.isDown('Space') && !this.isJumping){
                this.isJumping = true;
                this.vz=4;
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

        const boostAmount = this.speed - this.baseSpeed;
        if (boostAmount > 0.005) {
            const boostRatio = Math.min(1.0, boostAmount / (this.maxSpeed - this.baseSpeed));
            ctx.save();
            const flameLen = 12 + 26 * boostRatio;
            ctx.strokeStyle = boostRatio > 0.6 ? '#ff3300' : '#ff9900';
            ctx.lineWidth = 2 + 3 * boostRatio;
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
        this.destroyFrames = 30;
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
        this.z = 0.05;
        this.length = length;
        this.width = width;
        this.height = 6.0;

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
        this.x = 6.5 + Math.random() * 2.0;
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

        ctx.strokeStyle = '#ff9900';
        ctx.lineWidth = 3;
        ctx.stroke();
        }
    }

const Boost = BoostPad;
const boosts = BoostPad;

const parallaxBg = new ParallaxBackground('assets/background.png');
EM.add(parallaxBg);

const roadSegments = [
    new RoadSegment(5, 0, 7, 10),
    new RoadSegment(5, 10, 7, 10),

    new RoadSegment(5, 24, 7, 10),
    new RoadSegment(5, 34, 7, 10)
];

for (const road of roadSegments) {
    EM.add(road);
}

const playerVehicle = new Vehicle('player', 6.5, 4);
EM.add(playerVehicle);

window.__MAD_CRASHER__ = {
    background: parallaxBg,
    player: playerVehicle,
    getScore: () => score,
    getLives: () => playerVehicle.lives,
    getBaseScrollSpeed: () => baseScrollSpeed,
    triggerGameOver
};


const enemies = [
    new Enemy(7.0, 16),
    new Enemy(9.5, 23)
];

for (const enemy of enemies) {
    EM.add(enemy);
}

const boostPads = [
    new BoostPad(6.0, 14, 10.0, 3.0),
    new BoostPad(6.8, 38, 10.0, 3.0)
];

for (const pad of boostPads) {
    EM.add(pad);
}

let score = 0;
let lastScoreTime = Date.now();
let isGameOver = false;

let baseScrollSpeed = 0.08;
const scrollSpeedIncrement = 0.012;
const maxBaseScrollSpeed = 0.22;
let lastSpeedIncreaseTime = Date.now();

function triggerGameOver() {
    if (isGameOver) return;
    isGameOver = true;

    localStorage.setItem('lastScore', score.toString());

    try {
        let players = JSON.parse(localStorage.getItem('players')) || [];
        let player = players.find(p => p.name.toLowerCase() === playerName.toLowerCase());
        if (player) {
            if (score > player.highscore) {
                player.highscore = score;
            }
        } else {
            players.push({ name: playerName, highscore: score });
        }
        localStorage.setItem('players', JSON.stringify(players));
    } catch (err) {
        console.error('Failed to update players highscore:', err);
    }

    window.location.href = `gameover.html?score=${score}&player-name=${encodeURIComponent(playerName)}`;
}

function gameLoop() {
    if (isGameOver) return;

    const now = Date.now();

    if (!playerVehicle.isDestroyed && playerVehicle.lives > 0) {
        if (now - lastScoreTime >= 1000) {
            const elapsedSeconds = Math.floor((now - lastScoreTime) / 1000);
            score += elapsedSeconds * 10;
            lastScoreTime += elapsedSeconds * 1000;
        }

        if (now - lastSpeedIncreaseTime >= 10000) {
            const intervals = Math.floor((now - lastSpeedIncreaseTime) / 10000);
            baseScrollSpeed = Math.min(maxBaseScrollSpeed, baseScrollSpeed + intervals * scrollSpeedIncrement);
            lastSpeedIncreaseTime += intervals * 10000;
        }
    } else {
        lastScoreTime = now;
        lastSpeedIncreaseTime = now;
    }

    const speedRatio = playerVehicle.speed / playerVehicle.baseSpeed;
    const scrollSpeed = baseScrollSpeed * speedRatio;

    parallaxBg.update(scrollSpeed, playerVehicle);

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

    const px = playerVehicle.x + playerVehicle.width / 2;
    const py = playerVehicle.y + playerVehicle.length / 2;
    let isOnRoad = false;

    for (const entity of EM.entities) {
        if (entity instanceof RoadSegment) {
            if (px >= entity.x && px <= entity.x + entity.width &&
                py >= entity.y && py <= entity.y + entity.length) {
                isOnRoad = true;
                break;
            }
        }
    }

    if (!isOnRoad && !playerVehicle.isJumping && !playerVehicle.isDestroyed) {
        playerVehicle.destroy();
    }

    const collisions = EM.getCollisions();

    for (let bIndex = playerVehicle.bullets.length - 1; bIndex >= 0; bIndex--) {
        const bullet = playerVehicle.bullets[bIndex];

        for (const enemy of enemies) {
            if (enemy.isDestroyed) continue;

            const dx = Math.abs(bullet.x - (enemy.x + enemy.width / 2));
            const dy = Math.abs(bullet.y - (enemy.y + enemy.length / 2));

            if (dx < 1.0 && dy < 1.2) {
                playerVehicle.bullets.splice(bIndex, 1);

                enemy.destroy();

                score += 150;
                break;
            }
        }
    }

    for (const enemy of collisions.playerWithEnemy){
        if (!enemy.isDestroyed && !playerVehicle.isDestroyed) {
            enemy.destroy();
            playerVehicle.destroy();
        }
    }

    playerVehicle.isOnBoostPad = collisions.playerWithBoosts.length > 0;

    RD.render(EM.entities);
    IM.update();

    ctx.save();
    ctx.shadowColor = '#000000';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    ctx.fillStyle = '#f8cf17';
    ctx.font = 'bold 16px "Press Start 2P", "Courier New", monospace';
    ctx.fillText(`SCORE: ${score}`, 25, 40);

    ctx.fillStyle = '#f8cf17';
    ctx.fillText('LIVES:', 25, 72);
    for (let i = 0; i < 3; i++) {
        ctx.fillStyle = (i < playerVehicle.lives) ? '#e61c38' : '#444444';
        ctx.fillText('♥', 125 + i * 26, 72);
    }

    ctx.fillStyle = '#00f0ff';
    ctx.font = '12px "Press Start 2P", "Courier New", monospace';
    ctx.fillText(`PILOT: ${playerName}`, 25, 102);

    const speedMultiplier = (baseScrollSpeed / 0.08).toFixed(1);
    ctx.fillStyle = '#ffaa00';
    ctx.font = '11px "Press Start 2P", "Courier New", monospace';
    ctx.fillText(`SPEED: ${speedMultiplier}x`, 25, 126);

    ctx.restore();

    requestAnimationFrame(gameLoop);
}

gameLoop();