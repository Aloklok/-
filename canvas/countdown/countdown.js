/**
 * Created by sony on 2015/10/31.
 */

//参数设置，自适应。
var WINDOW_WIDTH=document.body.clientWidth;
var WINDOW_HEIGHT=document.body.clientHeight;
var MARGIN_LEFT=Math.round(WINDOW_WIDTH/10);
var MARGIN_TOP=Math.round(WINDOW_HEIGHT/5);
var RADIUS=Math.round(WINDOW_WIDTH*4/5/108)-1;

//设置endTime为初化始页面后一小时的时间
var endTime=new Date();
endTime.setTime(endTime.getTime()+3600*1000);
var curShowTimeSeconds=0;

var balls=[];
const colors=["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];



window.onload=function(){


    var canvas=document.getElementById('canvas');
    var context=canvas.getContext('2d');

    canvas.width=WINDOW_WIDTH;
    canvas.height=WINDOW_HEIGHT;

    curShowTimeSeconds=getCurrentShowTimeSeconds();


//用requestAnimFrame替换setInterval()
    window.requestAnimFrame =(function(){
        return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
                window.setTimeout(callback, 1000 / 40);
            };
    })();

    //重复调用
    (function update_render(){
        update();
        render(context);
        requestAnimFrame(update_render);
    })();

//初始背景颜色
    document.body.style.backgroundColor = '#CCD4D9';
};

//计算并返回倒计时一小时的秒数
function getCurrentShowTimeSeconds(){
    var curTime=new Date();
    var ret =endTime.getTime()-curTime.getTime();
    ret=Math.round(ret/1000);
    return ret>=0?ret:0;
}

//当本次调用update的时间与上次调用update的时间变量不相等，则添加小球。
function update(){
    var nextShowTimeSeconds=getCurrentShowTimeSeconds();

    var nextHours=parseInt(nextShowTimeSeconds/3600);
    var nextMinutes=parseInt(nextShowTimeSeconds-nextHours*3600)/60;
    var nextSeconds=nextShowTimeSeconds%60;

    var curHours=parseInt(curShowTimeSeconds/3600);
    var curMinutes=parseInt(curShowTimeSeconds-curHours*3600)/60;
    var curSeconds=curShowTimeSeconds%60;

    if(nextSeconds!=curSeconds){
        if(parseInt(curHours/10) != parseInt(nextHours/10)){
            addBalls(MARGIN_LEFT,MARGIN_TOP,parseInt(curHours/10));
        }
        if(parseInt(curHours%10) != parseInt(nextHours%10)){
            addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(curHours%10));
        }
        if(parseInt(curMinutes/10) != parseInt(nextMinutes/10)){
            addBalls(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes/10));
            if(parseInt(nextMinutes/10)==4)  document.body.style.backgroundColor = '#F2E0B2';
            if(parseInt(nextMinutes/10)==3)  document.body.style.backgroundColor = '#DBCD8F';
            if(parseInt(nextMinutes/10)==2)  document.body.style.backgroundColor = '#D9886A';
            if(parseInt(nextMinutes/10)==1)  document.body.style.backgroundColor = '#D97059';
            if(parseInt(nextMinutes/10)==0)  document.body.style.backgroundColor = '#D93576';
        }

        if(parseInt(curMinutes%10) != parseInt(nextMinutes%10)){
            addBalls(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes%10));
        }
        if(parseInt(curSeconds/10) != parseInt(nextSeconds/10)){
            addBalls(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds/10));
        }

        if(parseInt(curSeconds%10) != parseInt(nextSeconds%10)){
            addBalls(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds%10));
        }

    curShowTimeSeconds=nextShowTimeSeconds;

    }
    updateBalls();
}

//遍历某个数字digit[num]中的二维数组,修改x,y值为其圆心位置。
function addBalls(x,y,num){
    for(var i=0;i<digit[num].length;i++)
        for(var j=0;j<digit[num][i].length;j++){
            if(digit[num][i][j]==1){
                var aBall={
                    x:x+(RADIUS+1)+j*2*(RADIUS+1),
                    y:y+(RADIUS+1)+i*2*(RADIUS+1),
                    g:1+Math.random(),
                    vx:Math.pow(-1,Math.ceil(Math.random()*1000))*7+Math.pow(-1,Math.ceil(Math.random()*1000)),
                    vy:-5,
                    color:colors[Math.floor(Math.random()*colors.length)]
                };
                balls.push(aBall)
            }
        }
}


//对小球的位置进行更新
function updateBalls(){
    for(var i=0; i<balls.length;i++){
        balls[i].x+=balls[i].vx;
        balls[i].y+=balls[i].vy;
        balls[i].vy+=balls[i].g;

        if(balls[i].y>=WINDOW_HEIGHT-RADIUS){
            balls[i].y=WINDOW_HEIGHT-RADIUS;
            balls[i].vy=-balls[i].vy*0.75;
        }
    }

    //重新排序balls[].从balls[0]到balls[cnt]为处在屏幕中的球，其余为屏幕外的球。
    var cnt=0;
    for (var j=0;j<balls.length;j++)
        if(balls[j].x+RADIUS>0 && balls[j].x-RADIUS<WINDOW_WIDTH){
            balls[cnt++]=balls[j];
        }
        while(balls.length>cnt){
            balls.pop();
        }
    console.log(balls.length);
    }



//集合每个数字和小球的绘制操作，每次调用都重新绘制
function render(cxt){

    cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);

    var hours=parseInt(curShowTimeSeconds/3600);
    var minutes=parseInt(curShowTimeSeconds-hours*3600)/60;
    var seconds=curShowTimeSeconds%60;

    //小时
    renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt);
    renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),cxt);
    renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,cxt);

    //分钟
    renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),cxt);
    renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),cxt);
    renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,cxt);

    //秒
    renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),cxt);
    renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),cxt);

    //绘制小球
    for(var i=0;i<balls.length;i++){
        cxt.fillStyle=balls[i].color;
        cxt.beginPath();
        cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true); //画一个小圆
        cxt.closePath();
        cxt.fill();
    }

}


//绘制数字
function renderDigit(x,y,num,cxt){
    cxt.fillStyle="rgb(0,102,153)";

//i为数组的行，j为数组的列
    for(var i=0;i<digit[num].length;i++)
        for(var j=0;j<digit[num][i].length;j++){
            if(digit[num][i][j]==1){
                cxt.beginPath();
                cxt.arc(x+(RADIUS+1)+j*2*(RADIUS+1),
                    y+(RADIUS+1)+i*2*(RADIUS+1),
                    RADIUS,
                    0,
                    2*Math.PI);
                cxt.closePath();
                cxt.fill();
            }
        }

}