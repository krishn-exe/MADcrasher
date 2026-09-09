const canvas = document.getElementById("game-canvas");
const c = canvas.getContext('2d');

const player = {
  x: 400,
  y: 450,
  width: 60,
  height: 30,
  color:'#ff2244'
}

const road = {
  x:150,
  width: 500,
  speed: 5,
  thickness: 20,
  surfaceColor: '#8a84a6',
  wallColor: '#453e66' 
};


let platforms = [
  {y: -200, height: 500},
  {y: 400, height: 500}
]

const keys = {};

window.addEventListener('keydown', (e)=>{
  keys[e.code] = true;
});

window.addEventListener('keyup', (e)=>{
  keys[e.code] = false;
});

function drawRoad(){
  for(let i = 0; i<platforms.length; i++){
    const plat = platform[i];
  }
}

function drawPlayer(){
  c.fillStyle = player.color;
  c.fillRect(player.x-player.width/2,
    player.y-player.height,
    player.width,
    player.height
  );
}


function updatePlayer() {
  const speed = 5;

  if (keys['ArrowLeft'] || keys['KeyA']){
    player.x = player.x-speed;
  }

  if(keys['ArrowRight'] || keys['KeyD']){
    player.x = player.x+speed;
  }

  const halfWidth = player.width/2;
  if(player.x < halfWidth){
    player.x = halfWidth;
  }

  if(player.x > canvas.width - halfWidth){
    player.x = canvas.width - halfWidth;
  }
}

function gameLoop(){
  c.clearRect(0, 0, canvas.width, canvas.height);

  updatePlayer();

  drawPlayer();

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);