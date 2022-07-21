//Canvas Construction
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height)



const gravity = 0.9;

//Creating class for sprites - como crear objetos!

const background = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './img/Background.png',
})

const shop = new Sprite({
  position: {
    x: 612,
    y: 128
  },
  imageSrc: './img/shop.png',
  scale: 2.75,
  framesMax: 6
})

//creando objetos Fighter
const player = new Fighter({
	position: {
	 x: 0,
	 y: 0,
    },
    velocity: {
     x: 0,
     y: 0,
    },
    offset: {
    	x: 0,
    	y: 0,
    },
imageSrc: './img/Sprites/Idle.png',
framesMax: 8,
scale: 2.5,
offset: {
    	x: 215,
    	y: 157,
    },
sprites: {
	idle: {
		imageSrc:'./img/Sprites/Idle.png',
		framesMax: 8,
	},
	run: {
		imageSrc: './img/Sprites/Run.png',
		framesMax: 8,
	},
	jump: {
		imageSrc: './img/Sprites/Jump.png',
		framesMax: 2,
	},
	fall: {
		imageSrc: './img/Sprites/Fall.png',
		framesMax: 2,
	},
	attack1: {
		imageSrc: './img/Sprites/Attack1.png',
		framesMax: 6,
	},
	takeHit: {
		imageSrc: './img/Sprites/Take Hit - white silhouette.png',
		framesMax: 4,
	},
	death: {
		imageSrc: './img/Sprites/Death.png',
		framesMax: 6,
	},
},
attackBox: {
 offset: {
 	x: 100,
 	y: 50
 },
 height: 40,
 width:  155,
  }
})


const enemy = new Fighter({
	position: {
	 x: 400,
	 y: 100,
    },
    velocity: {
     x: 0,
     y: 0,
    },
    color:'blue',
    offset: {
    	x: -50,
    	y: 0,
    },
imageSrc: './img/Sprites2/Idle.png',
framesMax: 4,
scale: 2.5,
offset: {
    	x: 215,
    	y: 170,
    },
sprites: {
	idle: {
		imageSrc:'./img/Sprites2/Idle.png',
		framesMax: 4,
	},
	run: {
		imageSrc: './img/Sprites2/Run.png',
		framesMax: 8,
	},
	jump: {
		imageSrc: './img/Sprites2/Jump.png',
		framesMax: 2,
	},
	fall: {
		imageSrc: './img/Sprites2/Fall.png',
		framesMax: 2,
	},
	attack1: {
		imageSrc: './img/Sprites2/Attack1.png',
		framesMax: 4,
	},
	takeHit: {
		imageSrc: './img/Sprites2/Take hit.png',
		framesMax: 3,
	},
	death: {
		imageSrc: './img/Sprites2/Death.png',
		framesMax: 7,
	},
},
attackBox: {
 offset: {
 	x: -180,
 	y: 50
 },
 height: 40,
 width:  140,
  },
})

//declarando constantes para verificar que tecla se presiono al final para el movimiento


const keys = {
	a: {
		pressed:false
	},
	d: {
		pressed:false
	},
	ArrowLeft: {
		pressed:false
	},
	ArrowRight: {
		pressed:false
	},

}
let lastKey;

//funcion detectar colision 



decreaseTimer()

function animate () {
	window.requestAnimationFrame(animate);
	c.fillStyle = 'black';
	c.fillRect(0,0, canvas.width, canvas.height);
	background.update();
	shop.update();
	c.fillStyle = 'rgba(255, 255, 255, 0.13)';
	c.fillRect(0,0, canvas.width, canvas.height)
	player.update();
	enemy.update();

    player.velocity.x = 0;
    

	if (keys.a.pressed && player.lastKey === 'a') {
		player.velocity.x = -5;
		player.switchSprite('run');
	} else if (keys.d.pressed && player.lastKey === 'd') {
		player.velocity.x = 5;
		player.switchSprite('run');
	} else {
		player.switchSprite('idle');
		player.velocity.x = 0;
	}

	if (player.velocity.y < 0) {
		player.switchSprite('jump');
	} else if (player.velocity.y > 0) {
		player.switchSprite('fall');
	}

	enemy.velocity.x = 0;

	if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
		enemy.velocity.x = -5;
		enemy.switchSprite('run');
	} else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
		enemy.velocity.x = 5;
		enemy.switchSprite('run');
	} else {
		enemy.switchSprite('idle');
		enemy.velocity.x = 0;
	}

		if (enemy.velocity.y < 0) {
		enemy.switchSprite('jump');
	} else if (enemy.velocity.y > 0) {
		enemy.switchSprite('fall');
	}

 //detect collision
    if (rectangularColission({
    	rectangle1: player,
    	rectangle2: enemy,
    }) &&player.isAttacking
    	&& player.framesCurrent === 4
    	) 
    {
    	enemy.takeHit();
    	player.isAttacking = false;
    	
      gsap.to('#enemyHealth', {
      	width: enemy.health + '%'
      })    
    }
    
    if (player.isAttacking && player.framesCurrent === 4) {
    	player.isAttacking = false;
    }

    if (rectangularColission({
    	rectangle1: enemy,
    	rectangle2: player,
    }) &&enemy.isAttacking
    	&& enemy.framesCurrent === 2) 
    {
    	player.takeHit();
    	enemy.isAttacking = false;
    	
    gsap.to('#playerHealth', {
      	width: player.health + '%'
      }) 
    }

if (enemy.isAttacking && enemy.framesCurrent === 2) {
    	enemy.isAttacking = false;
    }


    if((enemy.health <= 0 || player.health <= 0) && timer > 0) {
    	determineWinner({player, enemy, timerId});

    }

}

animate();

window.addEventListener('keydown', (event) => {
	
  if (!player.dead) {
	switch (event.key) {
		case 'd':
		keys.d.pressed = true;
		player.lastKey = 'd';
		break
		case 'a':
		keys.a.pressed = true;
		player.lastKey = 'a';
		break
        case 'w':
        if (player.position.y + player.height >= canvas.height -96) {
		player.velocity.y = -20;
	    }
		break
		case ' ':
		player.attack();
		break
	}
  }

  if (!enemy.dead) {
	switch (event.key) {
		case 'ArrowRight':
		keys.ArrowRight.pressed = true;
		enemy.lastKey = 'ArrowRight';
		break
		case 'ArrowLeft':
		keys.ArrowLeft.pressed = true;
		enemy.lastKey = 'ArrowLeft';
		break
        case 'ArrowUp':
        if (enemy.position.y + enemy.height >= canvas.height-96) {
		enemy.velocity.y = -20;
	    }
		break
		case 'ArrowDown':
		enemy.attack();
		break
	}
  }
	//console.log(event.key);
})

window.addEventListener('keyup', (event) => {
	switch (event.key) {
		case 'd':
		keys.d.pressed = false;
		break;
		case 'a':
		keys.a.pressed = false;
		break;
	}

	switch (event.key) {
		case 'ArrowLeft':
		keys.ArrowLeft.pressed = false;
		break;
		case 'ArrowRight':
		keys.ArrowRight.pressed = false;
		break;
	}
	
})