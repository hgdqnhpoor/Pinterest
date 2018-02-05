//ajax请求
var data;
xhr=new XMLHttpRequest();
xhr.open('get','JSON/data.txt',false);
xhr.onreadystatechange=function () {
  if(xhr.readyState===4&&/^2\d{2}/.test(xhr.status)){
      data=utils.toJSON(xhr.responseText)
  }
};
xhr.send(null);
console.log(data);

//2.绑定数据
function bindData() {
    for (var i = 0; i <50; i++) {
       var oul=document.getElementsByTagName('ul');
       var li=document.createElement('li');
       var curImg=document.createElement('img');
       var p=document.createElement('p');
       var a=document.createElement('a');
        a.href='javascript:;';
        a.innerHTML='采集';
        /*var num=(Math.random()*(data.length-1)).toFixed(0);*/
        var num=Math.round(Math.random()*(7-0)+0);
        var curData=data[num];
        console.log(num);
        // img.src='img/timg.gif';
        curImg.setAttribute('data-real',curData.src);
        curImg.style.height=Math.round(Math.random()*(350-200)+200)+'px';
        p.innerHTML=data[num].title;
        li.style.height=curImg.style.height+20+'px';
        li.appendChild(a);
        li.appendChild(curImg);
        li.appendChild(p);

        var newUl=utils.toArray(oul);
        var sortUl=newUl.sort(function (a,b) {
            var ul1Height=utils.getCss(a,'height');
            var ul2Height=utils.getCss(b,'height');
            return ul1Height-ul2Height
        });
        sortUl[0].appendChild(li);
    }

}
bindData();
var winH=utils.win('clientHeight');
var imgs=document.getElementsByTagName('img');
window.onscroll=function () {
    delayImg();
    var curScrollTop=utils.win('scrollTop');
    var allH=utils.win('scrollHeight');
    if(curScrollTop+winH+300>allH){
        bindData();
    }
};
function delayImg() {
    for (var i = 0; i < imgs.length; i++) {
        var curImg=imgs[i];
        checkImg(i)
    }
}
delayImg();

function checkImg(i) {
    var curImg=imgs[i];
    var curT=utils.offset(curImg).top;
    var curH=curImg.offsetHeight;
    var scrollT=utils.win('scrollTop');
    if(winH+scrollT>curH+curT){
        var trueAdd=curImg.getAttribute('data-real');
        var img=document.createElement('img');
        img.src=trueAdd;
        img.onload=function () {
            curImg.src=trueAdd;
            fadeIn(curImg);
            img=null;
        }
    }
}
function fadeIn(curImg) {
    utils.css(curImg,'opacity',0.3);
    var timer=setInterval(function () {
        var curOpa=utils.css(curImg,'opacity');
        curOpa+=0.1;
        if(curOpa>=1){
            utils.css(curImg,'oapcity',1);
            clearInterval(timer);
            return;
        }
        utils.css(curImg,'opacity',curOpa);
    },100)
}
