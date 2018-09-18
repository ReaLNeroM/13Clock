 var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var radius = Math.min(window.innerWidth, window.innerHeight);
canvas.width = canvas.height = radius;
var fullRotation = 2 * Math.PI;
<<<<<<< HEAD

var circleSize = canvas.width / 20;
console.log(canvas.width);
=======
ctx.translate(radius, radius);

var minutesPerTurn = 43200000 / 13.0; // 12 + 1
var secondsPerTurn = 43200000 / 733.0; // 12 * (60 + 1) + 1

var FPS = 60;
setInterval(draw, 1000.0 / FPS);

// var start = new Date();
// function getMsSinceProgramStart(d) {
// 	return d - start;
// }

function draw(){
	ctx.fillStyle = '#fff';
	ctx.fillRect(-radius, -radius, canvas.width, canvas.height);

	currTime = new Date();
	var milliseconds = currTime % 43200000; // 12 hour clock
>>>>>>> parent of a19ca03... Corrected clock. DST may not be handled correctly.

function getNthCircleX(circleNumber){
	return circleNumber / 10 * (canvas.width + (canvas.width - 2 * circleSize) / 9 * 10 - canvas.width) + circleSize;
}

function drawCircles(rBitset, gBitset, bBitset){
	ctx.fillStyle = "#FFF";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.strokeStyle = "#000";
	for(var i = 0, pow2 = 1; i < 10; i++, pow2 *= 2){
		color = "#";
		if(pow2 & rBitset){
			color += "F";
		} else {
			color += "0";
		}
		if(pow2 & gBitset){
			color += "F";
		} else {
			color += "0";
		}
		if(pow2 & bBitset){
			color += "F";
		} else {
			color += "0";
		}
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(getNthCircleX(i), canvas.height / 2, circleSize, 0, fullRotation);
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
	}
}

function drawCurve(start, end, extent, color){
	ctx.beginPath();
	ctx.strokeStyle = color;

	var startX = getNthCircleX(start);
	var endX = getNthCircleX(end);

	ctx.moveTo(startX, canvas.height / 2);
	ctx.bezierCurveTo(startX, canvas.height / 2 + extent, endX, canvas.height / 2 + extent, endX, canvas.height / 2);
	ctx.stroke();
	ctx.closePath();
	ctx.strokeStyle = "#FFF";
}

function drawTime(){
	var start = new Date();
	var hour, minute, second;
	hour = start.getHours();
	minute = start.getMinutes();
	second = start.getSeconds();

	drawCircles((1 << Math.floor(hour / 10  )) | (1 << Math.floor(hour % 10  )),
				(1 << Math.floor(minute / 10)) | (1 << Math.floor(minute % 10)),
				(1 << Math.floor(second / 10)) | (1 << Math.floor(second % 10)));
	drawCurve(Math.floor(hour / 10), Math.floor(hour % 10), 100.0, "#F00");
	drawCurve(Math.floor(minute / 10), Math.floor(minute % 10), 300.0, "#0F0");
	drawCurve(Math.floor(second / 10), Math.floor(second % 10), 320.0, "#00F");
}

setInterval(drawTime, 500);