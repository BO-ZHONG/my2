//获取可视区的宽高
function view(){
	
	return {
		w:document.documentElement.clientWidth,
		h:document.documentElement.clientHeight
	}
}
//获取元素id
function id(obj){
	return document.getElementById(obj);
}
//绑定函数
function bind(obj,ev,fn){
	if(obj.addEventListener){
		obj.addEventListener(ev,fn,false);
	}else{
		obj.attachEvent(ev,fn);
	}
}
function addClass(obj, sClass) { 
    var aClass = obj.className.split(' ');
    if (!obj.className) {
        obj.className = sClass;
        return;
    }
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) return;
    }
    obj.className += ' ' + sClass;
}

function removeClass(obj, sClass) { 
    var aClass = obj.className.split(' ');
    if (!obj.className) return;
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) {
            aClass.splice(i, 1);
            obj.className = aClass.join(' ');
            break;
        }
    }
}
//bind(document,'touchmove',function(ev){
//	ev.preventDefault();
//})
//自动播放

function fnLoad()
{
	var iTime=new Date().getTime();
	var oW=id("welcome");
	var arr=[""];
	var bImgLoad=true;
	var bTime=false;
	var oTimer=0;
	bind(oW,"webkitTransitionEnd",end);
	bind(oW,"transitionend",end);
	oTimer=setInterval(function(){
		if(new Date().getTime()-iTime>=5000)
		{
			bTime=true;
		}	
		if(bTime)
		{
			clearInterval(oTimer);
			oW.style.opacity=0;
			end();
		}
	},1000);
	function end()
	{
		removeClass(oW,"pageShow");
		autoPlay();
		fnIndex();
	}

}
function autoPlay(){
	var oUl=id('picList');
	var oLi=oUl.getElementsByTagName('li');
	var oNav=id('nav');
	var oA=oNav.getElementsByTagName('a');
	var oTimer=null;
	var h=view().w;
	var iNow=0;
	var iX=0;
	var TouchesX=0;
	var allTouchesX=0;
	auto();
	function auto(){
		oTimer=setInterval(function(){
			iNow++;
			iNow=iNow%oLi.length;
			L();
	    },2000);
	}
	
	bind(oUl,'touchstart',fnStart);
	bind(oUl,'touchmove',fnMove);
	bind(oUl,'touchend',fnEnd);
	function fnStart(ev){
		oUl.style.transition="none";
		clearInterval(oTimer);
		ev=ev.changedTouches[0];
		TouchesX=ev.pageX;
		allTouchesX=iX;
		
	}
	function fnMove(ev){
		ev=ev.changedTouches[0];
		var iDis=ev.pageX-TouchesX;
		    iX=allTouchesX+iDis;
		    oUl.style.WebkitTransform="translateX("+iX+"px)";
	}
	function fnEnd(ev){
//		iNow=Math.round(Math.abs(iX/h));
        iNow=-Math.round(iX/h);
        if(iNow<0){
        	iNow=0;
        }else if(iNow>oLi.length-1){
        	iNow=oLi.length-1;
        }
		oUl.style.transition="0.3s";
		L();
		auto();
	}
	function L(){
		iX=h*-iNow;
		for(var i=0;i<oA.length;i++){
			removeClass(oA[i],'active');
		}
		
		addClass(oA[iNow],'active');
		
		oUl.style.WebkitTransform="translateX("+iX+"px)";
	}
	
	
}

function fnScore(){
	var oScore=id('score');
	var oLi=oScore.getElementsByTagName('li');
	var arr=['无语','好失望','很一般','良好','赞good']
	for(var i=0;i<oLi.length;i++){
		 oAclick(oLi[i]);
	}
	function oAclick(oLi){
		var oA=oLi.getElementsByTagName('a');
		var oInput=oLi.getElementsByTagName('input')[0];
		for(var i=0;i<oA.length;i++){
			oA[i].index=i;
			bind(oA[i],"touchstart",function(){
				for (var i=0;i<oA.length;i++) {
					if(i<=this.index){
						addClass(oA[i],'active');
					}else{
						removeClass(oA[i],'active');
					}
				}
				oInput.value=arr[this.index];
			})
		}
	};
	
	
};
function info(oInfo,infoHtml){
	oInfo.innerHTML=infoHtml;
	oInfo.style.WebkitTransform='scale(1)'
	oInfo.style.opacity=1;
	setTimeout(function(){
		oInfo.style.WebkitTransform='scale(0)'
	    oInfo.style.opacity=0;
	},1000)
}
function fnIndex(){
	autoPlay();
	fnScore();
	var oIndex=id('index');
    var oInfo=oIndex.getElementsByClassName('info')[0];
    var oBtn=oIndex.getElementsByClassName('btn')[0];
    var bS=false;
	bind(oBtn,'touchend',fnEnd);
	function fnEnd(){
		bS=fnScoreChecked();
		console.log(bS)
		if(bS){
			if(bTag()){
				fnIndexOut();
			}else{
				info(oInfo,'给景区添加标签')	
			}
			
		}else{
		  info(oInfo,'给景区评分')	
		}
	}
	function bTag(){
		var oTag=id('indexTage');
		var aInput=oTag.getElementsByTagName('input');
		for (let i = 0; i < aInput.length; i++) {
			if(aInput[i].checked){
				return true;
			}
		}
		return false;
	}
	function fnScoreChecked(){
		var oScore=id('score');
		var oInput=oScore.getElementsByTagName('input');
		for(var i=0;i<oInput.length;i++){
			if(oInput[i].value==0){
				return false;
			}
		}
		return true;
	}
}
function fnIndexOut(){
	var oMask=id('mask');
	var oIndex=id('index');
	var oNew=id('news');
	//oMask.className+=" pageShow"
	addClass(oMask," pageShow");
	addClass(oNew," pageShow");
	fnNews();
	setTimeout(function(){
		oMask.style.opacity=1;
		oIndex.style.webkitFilter=oIndex.style.filter='blur(10px)';
	},14);
	setTimeout(function(){
		oMask.style.opacity=0;
		oIndex.style.webkitFilter=oIndex.style.filter='blur(0)';
		oNew.style.opacity=1;
		removeClass(oMask,"pageShow");
	},3000);
}
function fnNews(){
	var oNews=id('news');
	var aInput=oNews.getElementsByTagName('input');
	var oInfo=oNews.getElementsByClassName('info')[0];
	aInput[0].onchange=function(){
		if(this.files[0].type.split('/')[0]=='video'){
			formIn();
		}else{
			info(oInfo,'请上传视频')
		}
	}
	aInput[1].onchange=function(){
		if(this.files[0].type.split('/')[0]=='image'){
			 formIn();
		}else{
			
			info(oInfo,'请上传照片')
		}
	}
}
function formIn(){
	var oFrom=id('form');
	var oOver=id('over');
	var oBtn=oFrom.getElementsByClassName('btn')[0];
	addClass(oFrom,' pageShow')
	bind(oBtn,'touchend',function(){
		addClass(oOver,' pageShow');
		removeClass(oFrom,'pageShow');
		over();
	})
};
function over(){
	var oNews=id('news');
	var oOver=id('over');
	var oBtn=oOver.getElementsByClassName('btn')[0];
	removeClass(oNews,"pageShow")
	bind(oBtn,'touchend',function(){
		removeClass(oOver,'pageShow')
	})
}
	
