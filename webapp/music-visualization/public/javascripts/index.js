function $(s){
    return document.querySelectorAll(s);
}

//��ѡ�и���ʱ����������
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

//gainNode����������С��analyser������ƵΪƵ�����顣 ����������ӵ�Ŀ��destination.
analyser.connect(gainNode);
gainNode.connect(ac.destination);

//��ֹ�����Ƶͬʱ����
var source=null;
var count=0;

//����canvas����
var box=$("#box")[0];
var height,width;
var canvas=document.createElement("canvas");
var ctx=canvas.getContext("2d");
box.appendChild(canvas);

//����canvas������������Ӧ��С
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


//�첽��ȡ��Ƶ������
// ��һ�ε���������ʱ��source�������첽�ӳ�û�л�ȡ��Ӧ��Ƶ���޷���ǰֹͣ��Ƶ����count���������������⡣
function load(url){
    source && source[source.stop?"stop":"noteOff"](); //������
    var n =++count; //��ε���󣬽����һ�ε�� n==count
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



//����Ƶ���ݽ���ΪƵ�����ݣ�������Ӧ�����顣���ɴ����黭������������
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





//�ı�������С
function changeVolume(percent){
gainNode.gain.value=percent*percent;
}

$("#volume")[0].onchange=function(){
    changeVolume(this.value/this.max);
};

$("#volume")[0].onchange();