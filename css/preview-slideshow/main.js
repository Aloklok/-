/**
 * Created by sony on 2015/10/29.
 */


var data=[
    {img:1,h1:'Creative',h2:'DUET'},
    {img:2,h1:'Friendly',h2:'DEVIL'},
    {img:3,h1:'Tranquilent',h2:'COMPATRIOT'},
    {img:4,h1:'Insecure',h2:'HUSSLER'},
    {img:5,h1:'Loving',h2:'REBEL'},
    {img:6,h1:'Passionate',h2:'SEEKER'},
    {img:7,h1:'Crazy',h2:'FRIEND'}
];

var g=function(id){
    if(id.substr(0,1)=='.'){
        return document.getElementsByClassName(id.substr(1));
    }
    return document.getElementById(id);
};

//不断替换模板关键字后连续添加来动态生成html
function addSliders(){
    var tpl_main=g('template_main').innerHTML
        .replace(/^\s*/,'')
        .replace(/\s*$/,'');
    var tpl_ctrl=g('template_ctrl').innerHTML
        .replace(/^\s*/,'')
        .replace(/\s*$/,'');

    var out_main=[];
    var out_ctrl=[];

    for(i in data){

        var _html_main=tpl_main
            .replace(/{{index}}/g,data[i].img)
            .replace(/{{h1}}/g,data[i].h1)
            .replace(/{{h2}}/g,data[i].h2)
            .replace(/{{css}}/g,['','main-i_right'][i%2]);

        var _html_ctrl=tpl_ctrl
            .replace(/{{index}}/g,data[i].img);

        out_main.push(_html_main);
        out_ctrl.push(_html_ctrl);
    }

    //增加背景图片，初始为1.jpg。
    g('template_main').innerHTML=out_main.join('');
    g('template_ctrl').innerHTML=out_ctrl.join('');

    g('template_main').innerHTML+=tpl_main
        .replace(/{{index}}/,'background')
        .replace(/{{index}}/g,'1');
}



//根据点击不同图片，动态的切换class属性。
function switchSlider(n){
    var main=g('main_'+n);
    var ctrl=g('ctrl_'+n);

    var clear_main=g('.main-i');
    var clear_ctrl=g('.ctrl-i');

    //将已有的active属性清除后再进行添加
    for(var i=0;i<clear_ctrl.length;i++){
        clear_ctrl[i].className=clear_ctrl[i].className
            .replace('ctrl-i_active','');
    }
    for(var j=0;j<clear_main.length;j++){
        clear_main[j].className=clear_main[j].className
            .replace('main-i_active','');
    }
    main.className+=' main-i_active';
    ctrl.className+=' ctrl-i_active';

    //将背景图修改为当前点击的图片
    setTimeout(function(){g('main_background').innerHTML=main.innerHTML;},1000);
}


function movePictures(){
    var pictures=g('.picture');
    for(i=0;i<pictures.length;i++){
        pictures[i].style.marginTop=-1* (pictures[i].clientHeight/2)+'px';
}
}




window.onload=function(){
    addSliders();
    switchSlider(1);
    
    setTimeout(function(){movePictures();},500);
};

