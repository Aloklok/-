/**
 * Created by sony on 2015/10/31.
 */

//参数设置，自适应。
var WINDOW_WIDTH=document.body.clientWidth;
var WINDOW_HEIGHT=document.body.clientHeight;
var MARGIN_LEFT=Math.round(WINDOW_WIDTH/10);
var MARGIN_TOP=Math.round(WINDOW_HEIGHT/5);
var RADIUS=Math.round(WINDOW_WIDTH*4/5/108)-1;


var endTime=new Date();
endTime.setTime(endTime.getTime()+3600*1000)
var curShowTimeSeconds=0;

var balls=[];
const colors=["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];



window.onload=function(){


    var canvas=document.getElementById('canvas');
    var context=canvas.getContext('2d');

    canvas.width=WINDOW_WIDTH;
    canvas.height=WINDOW_HEIGHT;

    curShowTimeSeconds=getCurrentShowTimeSeconds();

    setInterval(function() {
            update();
            render(context);
    },
        50);
    document.body.style.backgroundColor = '#CCD4D9';
};

//计算并返回倒计时的秒数
function getCurrentShowTimeSeconds(){
    var curTime=new Date();
    var ret =endTime.getTime()-curTime.getTime();
    ret=Math.round(ret/1000);
    return ret>=0?ret:0;
}


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
            if(parseInt(nextMinutes/10==4))  document.body.style.backgroundColor = '#F2E0B2';
            if(parseInt(nextMinutes/10==3))  document.body.style.backgroundColor = '#DBCD8F';
            if(parseInt(nextMinutes/10==2))  document.body.style.backgroundColor = '#D9886A';
            if(parseInt(nextMinutes/10==1))  document.body.style.backgroundColor = '#D97059';
            if(parseInt(nextMinutes/10==0))  document.body.style.backgroundColor = '#D93576';
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


function addBalls(x,y,num){
    for(var i=0;i<digit[num].length;i++)
        for(var j=0;j<digit[num][i].length;j++){
            if(digit[num][i][j]==1){
                var aBall={
                    x:x+(RADIUS+1)+j*2*(RADIUS+1),
                    y:y+(RADIUS+1)+i*2*(RADIUS+1),
                    g:2+Math.random(),
                    vx:Math.pow(-1,Math.ceil(Math.random()*1000))*8,
                    vy:-5 ,
                    color:colors[Math.floor(Math.random()*colors.length)]
                };
                balls.push(aBall)
            }
        }
}



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

    for(var i=0;i<balls.length;i++){
        cxt.fillStyle=balls[i].color;
        cxt.beginPath();
        cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
        cxt.closePath();
        cxt.fill();
    }

}


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