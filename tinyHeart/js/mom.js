var momObj = function()
{
	this.x;
	this.y;
	this.angle;
	this.bigEye = new Image();
	this.bigBody = new Image();
	this.bigTail = new Image();
}
momObj.prototype.init = function()
{
	this.x = canWidth*0.5;
	this.y = canHeight*0.5;
	this.angle = 0;
	this.bigEye.src="../img/bigEye0.png";
	this.bigBody.src="../img/bigSwim0.png";
	this.bigTail.src="../img/bigTail0.png";
}
momObj.prototype.draw = function()
{
	//lerp x,y o使得一个值，趋向于目标值，common.js
	this.x = lerpDistance(mx,this.x,0.98);//aim,cur,ratio
	this.y = lerpDistance(my,this.y,0.98);

	//delta angle ,每一帧计算
	//Math.atan2(y,x);
	var deltaY = my - this.y;//鼠标和大鱼的坐标距离
	var deltaX = mx - this.x;
	var beta = Math.atan2(deltaY,deltaX)+Math.PI;//大鱼的角度要趋向于beta
	//lerp angle
	this.angle = lerpAngle(beta,this.angle,0.6);

	ctx1.save();//save,restore ,表示下面的仅对这个大鱼有效s
	ctx1.translate(this.x,this.y);//定义canvas相对远点
	ctx1.rotate(this.angle);//旋转画布，只作用于大鱼，因为在save,restore之间
	ctx1.drawImage(this.bigEye,-this.bigEye.width*0.5,-this.bigEye.height*0.5);//中心位置移图片一般宽度
	ctx1.drawImage(this.bigBody,-this.bigBody.width*0.5,-this.bigBody.height*0.5);
	ctx1.drawImage(this.bigTail,-this.bigTail.width*0.5+30,-this.bigTail.height*0.5);
	ctx1.restore();
}