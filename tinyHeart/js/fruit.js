var fruitObj = function()
{
	this.alive = [];//bool
	this.x =[];
	this.y =[];
	this.l =[];//图片长度
	this.spd =[];//速度
	this.fruitType=[];//果实类型
	this.orange = new Image();
	this.blue = new Image();

}
fruitObj.prototype.num = 30;
fruitObj.prototype.init = function()
{
	for(var i=0;i<this.num;i++)
	{
		this.alive[i] = true;
		this.x[i] = 0;//海葵的位置
		this.y[i] = 0;
		this.spd[i] = Math.random()*0.01 + 0.005;//[0.05,0.15)*
		this.born(i);
		this.fruitType[i]="";
	}
	this.orange.src = "../img/fruit.png";
	this.blue.src = "../img/blue.png";
	
}

fruitObj.prototype.draw = function()
{
	for(var i =0;i<this.num ; i++)
	{
		//draw
		//find an ane,grow,fly up
		if(this.alive[i])
		{
			if(this.fruitType[i]=="blue")
			{
				var pic =this.blue;
			}
			else
			{
				var pic = this.orange;
			}
			if(this.l[i]<=14)
			{
				this.l[i] += this.spd[i]*deltaTime;//随时间增长的图片长度
			}
			else//每个果实在成长到14以后慢慢的上升（y坐标变小）
			{
				this.y[i]-=this.spd[i]*6*deltaTime;
			}
			ctx2.drawImage(pic,this.x[i]-this.l[i] *0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);
			if(this.y[i]<10)
			{
				this.alive[i]=false;
			}
		}
		

	}
	
}
//海葵出现的位置
fruitObj.prototype.born = function(i)
{
	var aneId = Math.floor(Math.random()*ane.num);//floor整数值，TODO：可以增加判断，随机不重复，已经出现的位置不要再出现
	this.x[i] = ane.x[aneId];
	this.y[i] = canHeight -ane.len[aneId];
	this.l[i] = 0;
	this.alive[i]=true;
	var ran = Math.random();
	if(ran<0.2)
	{
		this.fruitType[i] ="blue";
	}
	else
	{
		this.fruitType[i] = "orange";
	}
}
fruitObj.prototype.dead = function(i)
{
	this.alive[i] = false;
}
fruitObj.prototype.update = function()
{
	var num=0;
	for(var i =0;i<this.num ; i++)
	{
		if(this.alive[i])
	    	num++;
	}
}
//function fruitMonitor() 这两种写法都可以，只不过调用的形式不一样
fruitObj.prototype.fruitMonitor = function()
{
	var num = 0;
	for(var i=0 ;i<fruit.num;i++)
	{
		if(fruit.alive[i])
		{
			num++;
		}

	}
			
	if(num<15)
	{
		//send fruit;;
		sendFruit();
		return;
	}
}
function sendFruit()
{
	for(var i=0 ;i<fruit.num;i++)
	{
		if(!fruit.alive[i])
		{
			fruit.born(i);
			return;
		}

	}
}