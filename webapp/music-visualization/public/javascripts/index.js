function $(s){
    return document.querySelectorAll(s);
}

//当选中歌名时，歌名变绿
var lis=$("#list li");
for(var i=0;i<lis.length;i++){
    lis[i].onclick=function(){
        for(var j=0;j<lis.length;j++){
            lis[j].className="";
        }
        this.className="selected";
        load("/media/"+this.title)
    }
}


var xhr=new XMLHttpRequest();
var ac=new (window.AudioContext||window.webkitAudioContext)();

var gainNode=ac[ac.createGain?"createGain":"createGainNode"]();

var analyser=ac.createAnalyser();
var size=128;

analyser.fftsize=size*2;

//gainNode控制音量大小，analyser解析音频为频谱数组。 最后两者连接到目的destination.
analyser.connect(gainNode);
gainNode.connect(ac.destination);

//防止多个音频同时播放
var source=null;
var count=0;

//建立canvas画布
var box=$("#box")[0];
var height,width;
var canvas=document.createElement("canvas");
var ctx=canvas.getContext("2d");
box.appendChild(canvas);

//建立canvas画布并可自适应大小
function resize(){
    height=box.clientHeight;
    width=box.clientWidth;
    canvas.height=height;
    canvas.width=width;
    var line=ctx.createLinearGradient(0,0,0,height);
    line.addColorStop(0,"red");
    line.addColorStop(0.5,"yellow");
    line.addColorStop(1,"green");
    ctx.fillStyle=line;
}
resize();
window.onresize=resize;


//异步获取音频并播放
// 当一次点击多个歌名时，source会由于异步延迟没有获取相应音频，无法提前停止音频。用count计数来解决这个问题。
function load(url){
    source && source[source.stop?"stop":"noteOff"](); //兼容性
    var n =++count; //多次点击后，仅最后一次点击 n==count
    xhr.abort();

    xhr.open("GET",url);
    xhr.responseType="arraybuffer";
    xhr.onload = function(){
        if(n!=count) return;
        ac.decodeAudioData(xhr.response,function(buffer){
            if(n!=count) return;
            var bufferSource=ac.createBufferSource();
            bufferSource.buffer=buffer;
            bufferSource.connect(analyser);
            bufferSource[bufferSource.start?"start":"noteOn"](0);
            source=bufferSource;
        },function(err){
            console.log(err)
        })

    };
    xhr.send();
}



//由音频数据解析为频谱数据，生成相应的数组。并由此数组画出矩形音柱。
function visulizer(){
    var arr=new Uint8Array(analyser.frequencyBinCount);
    requestAnimationFrame = window.requestAnimationFrame||
        window.webkitRequestAnimationFrame||
        window.mozRequestAnimationFrame;
    function v(){
        analyser.getByteFrequencyData(arr);
        draw(arr);
        requestAnimationFrame(v);
    }
    requestAnimationFrame(v);
}

visulizer();

function draw(arr){
    ctx.clearRect(0,0,width,height);
    var w=width/size;
    for (var i=0;i<size;i++){
        var h=arr[i]/256 * height;
        ctx.fillRect(w*i,height-h,w*0.6,h);
    }
}





//改变音量大小
function changeVolume(percent){
gainNode.gain.value=percent*percent;
}

$("#volume")[0].onchange=function(){
    changeVolume(this.value/this.max);
};

$("#volume")[0].onchange();