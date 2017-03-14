// JavaScript Document
(function($){
	//接口
	$.tips=function(opts){
	     var y=$.extend({},$.tips.methods,$.tips.defaults,opts);
		 y.init(y);
	}
	//方法
	$.tips.methods={
		//初始化
		init:function(opts){
		    this.template(opts);
		},
		//模板
		template:function(opts){
			 var $tips=$("#tips");
			 if($tips.html()==undefined){//保证页面只有一个
			     $tips=$("<div id='tips' class='tips "+opts.controls +"' style='top:-30px'><i class='icon'></i><span>"+opts.content+"</span></div>");
			 $('body').append($tips);
			      this.binding($tips,opts);
			 }else{
			      /*var newName=$tips.attr('class').split(" ");
				  for(var i=0;i<newName.length;i++){
					  if(newName[i]=='tm_success'||newName[i]=='tm_loading'||newName[i]=='tm_warning'||newName[i]=='tm_onnectionErr'){
						  
					  }
				 }*/
				 $tips.find('span').html(opts.content);
				 this.binding($tips,opts);//重新初始化事件
			 }
			 $($tips).animate({top:0},500);
			 
		},
		//设置剧中
		setStyle:function($tips){
		    var w=$(window).width();
			var lw= $tips.width();
			var left=(w-lw)/2;
			$tips.css({left:left})
		},
		//绑定事件
		binding:function($tips,opts){
			var _this=this;
			this.setStyle($tips);
			$(window).resize(function(){
			     _this.setStyle($tips)
			})
			
			$tips.timer=setTimeout(function(){
				clearTimeout($tips.timer);
				$tips.animate({top:-50},500)
			},opts.timer*800)
		}
		
    }
	//默认peizhi
	$.tips.defaults={
	    content:"请稍后，数据正在加载中...",//提示内容
		/*
		 	提示方式：
		 		tm_success ： 成功
		 		tm_loading ：加载中
		 		tm_warning ：警告
		 		tm_onnectionErr ： 网络连接错误
		 */
		controls : "tm_success",
		timer:1 //时间	
	}
})(jQuery)