/**
 * Created by sony on 2015/10/19.
 */
var board=new Array();
var score=0;
var hasConflicted=new Array();
var startx=0;
var starty=0;
var endx=0;
var endy=0;

$(document).ready(function(){
    prepareForMobile();
    prepareMobileControl();
    newgame();
});

//对静态元素的css设置
function prepareForMobile(){
    if(documentWidth>500){
        gridContainerWidth=500;
        cellSpace=20;
        cellSideLength=100;
    }
$('#grid-container').css('width',gridContainerWidth-2*cellSpace);
    $('#grid-container').css('height',gridContainerWidth-2*cellSpace);
    $('#grid-container').css('padding',cellSpace);
    $('#grid-container').css('border-radius',0.02*gridContainerWidth);

    $('.grid-cell').css('width',cellSideLength);
    $('.grid-cell').css('height',cellSideLength);
    $('.grid-cell').css('boder-radius',0.02*cellSideLength);

}

function newgame(){
    //初始化棋盘格
    init();
    //在随机两个格子生成数字
    generateOneNumber();
    generateOneNumber();
}

//动态生成每个grid-cell的位置后，初始化score和棋盘格内数字。
function init(){
    for(var i=0;i<4;i++)
    for(var j=0;j<4;j++){
        var gridCell=$("#grid-cell"+"-"+i+"-"+j);
        gridCell.css('top',getPosTop(i,j));
        gridCell.css('left',getPosLeft(i,j));
    }
    for(var i=0;i<4;i++){
        board[i]=new Array();
        hasConflicted[i]=new Array();
        for(j=0;j<4;j++){
            board[i][j]=0;
            hasConflicted[i][j]=false;
        }
    }
    score = 0;
updateBoardView();
    updateScore(score);
    $('#gameover').text(" ")
}

//根据board[i][j]的值重新生成视图，玩家每次操作都应调用此函数。
function updateBoardView(){
    $(".number-cell").remove();

    //创建16个代表number-cell的div
    for(var i=0;i<4;i++)
        for(var j=0;j<4;j++){
            $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            var theNumberCell=$('#number-cell-'+i+'-'+j);

            //如果这个某个位置上的值为0，则不显示。
            if(board[i][j]==0){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getPosTop(i,j) + cellSideLength*0.5 );
                theNumberCell.css('left',getPosLeft(i,j) + cellSideLength*0.5 );

            }else{
                theNumberCell.css('width',cellSideLength);
                theNumberCell.css('height',cellSideLength);
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color',getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }

            //玩家每次操作后都初始化board上的每个位置为没有合并数据的记录。
            hasConflicted[i][j]=false;
        }
    $('.number-cell').css('line-height',cellSideLength+'px');
    $('.number-cell').css('font-size',0.6*cellSideLength+'px');

}


function generateOneNumber(){
    if(nospace(board)) return false;

//随机一个位置,并且这个位置上的数为0.
    var randx=Math.floor(Math.random() *4);
    var randy=Math.floor(Math.random() *4);
    var times=0;
  while(times<50){
      if(board[randx][randy]==0) break;
      var randx=Math.floor(Math.random() *4);
      var randy=Math.floor(Math.random() *4);
      times ++;
  }
    if(times==50){
        for(var i=0;i<4;i++)
            for(var j=0;j<4;j++){
                if(board[i][j]==0){
                    randx=i;
                    randy=j;
                }
            }
    }

//随机一个数字
   var randNumber=Math.random()<0.5?2:4;

//在随机位置显示随机数字
board[randx][randy]=randNumber;
    showNumberWithAnimation(randx,randy,randNumber);
    return true;
}

$(document).keydown(function(event){
    switch(event.keyCode){
        case 37://left
            event.preventDefault();
            if(moveLeft()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 38: //up
            event.preventDefault();
            if(moveUp()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 39://right
            event.preventDefault();
            if(moveRight()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 40://down
            event.preventDefault();
            if(moveDown()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        default: //default
            break;
    }
});
function prepareMobileControl(){
    var gridContainer = document.getElementById("grid-container");

    gridContainer.addEventListener('touchstart', function (event) {
        startx = event.touches[0].pageX;
        starty = event.touches[0].pageY;
    });

    //消除手机设备中手势的默认操作
    gridContainer.addEventListener('touchmove', function (event) {
    event.preventDefault();
    }
    );

    gridContainer.addEventListener('touchend', function (event) {
        endx = event.changedTouches[0].pageX;
        endy = event.changedTouches[0].pageY;

        var deltax = endx - startx;
        var deltay = endy - starty;

        //根据手势操作方向，调用相应的move函数。
        if (Math.abs(deltax) < 0.3 * documentWidth && Math.abs(deltay) < 0.3 * documentWidth) {
            return;
        }

        if (Math.abs(deltax) >= Math.abs(deltay)) {
            if (deltax > 0) {
                if (moveRight()) {
                    setTimeout("generateOneNumber()", 210);
                    setTimeout("isgameover()", 300);
                }
            }
            else {
                if (moveLeft()) {
                    setTimeout("generateOneNumber()", 210);
                    setTimeout("isgameover()", 300);
                }
            }
        }
        else {
            if (deltay > 0) {
                if (moveDown()) {
                    setTimeout("generateOneNumber()", 210);
                    setTimeout("isgameover()", 300);
                }
            }
            else {
                if (moveUp()) {
                    setTimeout("generateOneNumber()", 210);
                    setTimeout("isgameover()", 300);
                }
            }

        }

    });
}

function isgameover(){
    if(nospace(board)&&nomove(board)){
        gameover();
    }
}

function moveLeft(){
    if(!canMoveLeft(board)) {
        return false;
    }
    for(var i=0;i<4;i++)
        for(var j=1;j<4;j++){
            if(board[i][j]!=0){
                for(var k=0;k<j;k++){
                    if(board[i][k]==0 && noBlockHorizontal(i,k,j,board)){
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                    }
                    else if(board[i][k]==board[i][j] && noBlockHorizontal(i,k,j,board)&& hasConflicted[i][k]==false){
                        showMoveAnimation(i,j,i,k);
                        board[i][k]+=board[i][j];
                        board[i][j]=0;
                        score+=board[i][k];
                        updateScore(score);
                        hasConflicted[i][k]=true;
                    }

                }

            }
        }
setTimeout("updateBoardView()",200);
        return true;
}

function moveRight(){
    if(!canMoveRight(board)) {
        return false;
    }
    for(var i=0;i<4;i++)
        for(var j=2;j>=0;j--){
            if(board[i][j]!=0){
                for(var k=3;k>j;k--){
                    if(board[i][k]==0 && noBlockHorizontal(i,j,k,board)){
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                    }
                    else if(board[i][k]==board[i][j] && noBlockHorizontal(i,j,k,board)&& hasConflicted[i][k]==false){
                        showMoveAnimation(i,j,i,k);
                        board[i][k]+=board[i][j];
                        board[i][j]=0;
                        score+=board[i][k];
                        updateScore(score);
                        hasConflicted[i][k]=true;
                    }

                }

            }
        }
    setTimeout("updateBoardView()",200);
    return true;
}

function moveUp(){
    if(!canMoveUp(board)) {
        return false;
    }
    for(var j=0;j<4;j++)
        for(var i=1;i<4;i++){
            if(board[i][j]!=0){
                for(var k=0;k<i;k++){
                    if(board[k][j]==0 && noBlockVerticle(j,k,i,board)){
                        showMoveAnimation(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                    }
                    else if(board[k][j]==board[i][j] && noBlockVerticle(j,k,i,board)&& hasConflicted[k][j]==false){
                        showMoveAnimation(i,j,k,j);
                        board[k][j]+=board[i][j];
                        board[i][j]=0;
                        score+=board[k][j];
                        updateScore(score);
                        hasConflicted[k][j]=true;

                    }
                }
            }
        }
    setTimeout("updateBoardView()",200);
    return true;
}

function moveDown(){
    if(!canMoveDown(board)) {
        return false;
    }
    for(var j=0;j<4;j++)
        for(var i=2;i>=0;i--){
            if(board[i][j]!=0){
                for(var k=3;k>i;k--){
                    if(board[k][j]==0 && noBlockVerticle(j,i,k,board)){
                        showMoveAnimation(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                    }
                    else if(board[k][j]==board[i][j] && noBlockVerticle(j,i,k,board)&& hasConflicted[k][j]==false){
                        showMoveAnimation(i,j,k,j);
                        board[k][j]+=board[i][j];
                        board[i][j]=0;
                        score+=board[k][j];
                        updateScore(score);
                        hasConflicted[k][j]=true;
                    }
                }
            }
        }
    setTimeout("updateBoardView()",200);
    return true;
}