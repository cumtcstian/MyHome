﻿var aneObj = function() 
{
	this.x = [];
	this.len = [];
}
aneObj.prototype.num = 50;
aneObj.prototype.init = function()
{
	for(var i=0;i<this.num;i++)
	{
		this.x[i]=i*16+Math.random()*20;//[0,1)
		this.len[i]=200+Math.random()*50;
	}

}
aneObj.prototype.draw = function()
{
	ctx2.save();
	ctx2.globalAlpha=0.6;//画布告诉场景，样式只在save和restore这两个API之间起作用
	for(var i=0;i<this.num;i++)
	{
		//beginPath,moveTo(begin),Lineto(end),stoke(绘制),strokeStyle,LineWidth,LineCap,globalAlpha（给透明度）
		ctx2.beginPath();
		ctx2.moveTo(this.x[i],canHeight);
		ctx2.lineTo(this.x[i],canHeight-this.len[i]);
		ctx2.lineWidth = 20;
		ctx2.lineCap="round";
		ctx2.strokeStyle = "purple";
		ctx2.stroke();
	}
	ctx2.restore();
}