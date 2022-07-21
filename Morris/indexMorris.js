//Canvas Construction
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height)


//declarando constantes para verificar que tecla se presiono al final para el movimiento


let timer = 0;
let timerId;

function decreaseTimer() {
	if (timer < 101) {
		timerId = setTimeout(decreaseTimer, 1000)
		timer++;
		document.querySelector('#timer').innerHTML = timer;
		document.querySelector('#displayText').style.display = 'none';
		switch(true) {
			case timer%3 === 0 && timer%5 === 0:
			document.querySelector('#displayText').style.display = 'flex';
			document.querySelector('#displayText').innerHTML = 'Boom';
			break;
			case timer%3 === 0:
			document.querySelector('#displayText').style.display = 'flex';
			document.querySelector('#displayText').innerHTML = 'Zip';
			break;
			case timer%5 === 0:
			document.querySelector('#displayText').style.display = 'flex';
			document.querySelector('#displayText').innerHTML = 'Zap';
			break;
		}
             
	}

   if (timer === 101) {
   clearTimeout(timerId);
   document.querySelector('#timer').style.display = 'none';
   document.querySelector('#displayText').style.display = 'flex';
	document.querySelector('#displayText').innerHTML = 'Chupala Morris';
	}
}

decreaseTimer()

