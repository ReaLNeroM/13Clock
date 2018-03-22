var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

console.log(window.innerWidth);
var radius = Math.min(window.innerWidth, window.innerHeight) / 2;
canvas.width = canvas.height = 2 * radius;

var fullRotation = 2 * Math.PI;
ctx.translate(radius, radius);

var minutesPerTurn = 43200000 / 13.0; // 12 + 1
var secondsPerTurn = 43200000 / 733.0; // 12 * (60 + 1) + 1

var FPS = 60;
setInterval(draw, 1000.0 / FPS);

// var start = new Date();
// function getMsSinceMidnight(d) {
// 	return d - start;
// }

function draw(){
	ctx.fillStyle = '#fff';
	ctx.fillRect(-radius, -radius, canvas.width, canvas.height);

	currTime = new Date();
	var milliseconds = currTime % 43200000; // 12 hour clock

	drawCircle(radius);
	drawHand(6, radius / 5, milliseconds / 43200000);
	drawHand(4, radius / 1.4, milliseconds % minutesPerTurn / minutesPerTurn);
	ctx.strokeStyle = "#FF0000";
	drawHand(3, radius / 1.1, milliseconds % secondsPerTurn / secondsPerTurn);
	ctx.strokeStyle = "#000000";
}

function drawCircle(radius){
	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.arc(0, 0, radius, 0, 2 * Math.PI);
	ctx.stroke();
}

function drawHand(width, length, rotation){
	ctx.beginPath();
	ctx.lineWidth = width;
	ctx.rotate(rotation * fullRotation);
	ctx.lineCap = "round";
	ctx.moveTo(0, 0);
	ctx.lineTo(0, -length);
	ctx.rotate(-rotation * fullRotation);
	ctx.stroke();
}