var can1;
var can2;
var ctx1;
var ctx2;

var lastTime;
var deltaTime;

var bgPic = new Image();
var canWidth;
var canHeight;

var ane;
var friut;
var mom;

var mx;//鼠标位置
var my;

document.body.onload = game;
function game()
{
	//console.log("onload");
	init();
	lastTime = Date.now();
	deltaTime = 0;
	gameloop();
}
function init()
{
	can1 = document.getElementById("canvas1");//fishes ,dust ,UI ,circle
	ctx1 = can1.getContext('2d');
	can2 = document.getElementById("canvas2");//backgroud ,ane ,fruits
	ctx2 = can2.getContext('2d');

	can1.addEventListener('mousemove',onMouseMove,false);

	bgPic.src = "../img/background.jpg";
	canWidth = can1.width;
	canHeight = can1.height;

	ane = new aneObj();
	ane.init();
	fruit = new fruitObj();
	fruit.init();
	mom = new momObj();
	mom.init();

	mx = canWidth*0.5;
	my = canHeight*0.5;

}
function gameloop()
{
	requestAnimFrame(gameloop);//当前绘制完成后根据你配置决定下一帧的绘制时间  setInterval ,setTimeout, fps(frame per second)
	//console.log("loop");
	var now = Date.now();
	deltaTime = now -lastTime;
	lastTime = now;
	if(deltaTime>40) deltaTime=40;//防止切换页面时（帧停止执行），deltaTime（两帧之间的时间间隔）过大
	//console.log(deltaTime);
	drawBackground();
	ane.draw();
	fruit.fruitMonitor();
	fruit.draw();
	ctx1.clearRect(0,0,canWidth,canHeight);//画布1在2的上面，每次绘制要清除上一帧的图形？？？？，在干净的画布上绘制
	mom.draw();
	momFruitsCollision();//碰撞检测，吃果实
}
function onMouseMove(e)
{
	if(e.offSetX||e.layerX)//?
	{
		mx = e.offSetX ==undefined?e.layerX:e.offSetX;
		my = e.offSetY ==undefined?e.layerY:e.offSetY;
		//console.log(mx);
	}
}
