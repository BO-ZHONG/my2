// JavaScript Document
(function($){
	 //对象接口
      $.fn.Drag=function(opts){
	        var This=this;
			var opts=$.extend({},$.fn.Drag.methods,opts);
			opts.inits(This,opts);
	  };
	  //设置方法
	  $.fn.Drag.methods={
		   inits:function(obj,opts){
		        this.getCenter(obj);
				this.resize(obj);
				obj.show().removeClass("bounceInOut").addClass(" bounceInUp");
				this.dragsMove(obj,opts);//拖拽
		   },  
	       dragsMove:function(obj,opts){//鼠标按下
			   var _this=this;
			   var $DragHead=obj.children('div').eq(0);
			   var $closeBtnUp=obj.find(opts.obj1);
		       var $closeBtnBottom=obj.find(opts.obj2);
			   $closeBtnUp.off('mousedown').on('mousedown',_this.cancleEvent(obj,opts));
		       $closeBtnBottom.off('click').on('click',_this.cancleEvent(obj,opts));
			   if(opts.iDrag){
				   
				   $DragHead.on("mousedown",function(ev){
					   var ev=ev||window.event;
					   var oldX=ev.clientX;
					   var oldY=ev.clientY;
					   var oLeft=obj.offset().left;
					   var oTop=obj.offset().top;
					   var width=obj.width();
					   var height=obj.height();
					   var scrollLeft = $(window).scrollLeft();
					   var scrollTop = $(window).scrollTop();
					   var dottedPanel = $("<div></div>");
					   
						dottedPanel.css({
							"width":width,
							"height":height,
							"position":"fixed",
							"overflow":"hidden",
							"border-radius":"3px",
							"left":oLeft-scrollLeft-2,
							"top":oTop-scrollTop-2,
							"cursor":"move",
							"zIndex":"12",
							"border":"2px dashed #ccc"
						});
					  $("body").append(dottedPanel);
					  var maxLeft = $(window).width()-width;
					  var maxTop = $(window).height()-height;
					   
					  $(document).on("mousemove",dragMove);
				      $(document).on("mouseup",dragUp) ;
					  function dragMove(ev){//移动
							  var ev=ev||window.event;
							  var newX = ev.clientX;
							  var newY = ev.clientY;
							  var newLeft=newX-oldX+oLeft;
							  var newTop=newY-oldY+oTop;
							  if(newTop<=0)newTop=0;
							  if(newLeft<=0)newLeft=0;
							  if(newLeft>=maxLeft)newLeft=maxLeft;
							  if(newTop>=maxTop)newTop=maxTop;
							  
							  dottedPanel.css({"left":newLeft,"top":newTop})
						 
					  }
					  function dragUp(ev){//放开
						  var l=dottedPanel.offset().left;
						  var t=dottedPanel.offset().top;
						  dottedPanel.remove();
						  obj.animate({"left":l,"top":t},300);
						  $(document).off("mousedown");
						  $(document).off("mouseup");
						  
					  }
					  return false;
				   });
				   
			   };
			   
			   
		   },
		  
		  //设置样式居中
		  getCenter:function(obj,states){
			  var objW=obj.width();
			  var objH=obj.height();
			  var Ww=$(window).width();
			  var Wh=$(window).height();
			  var oLeft=(Ww-objW)/2;
			  var oTop=(Wh-objH)/2;
			  if(!states){
			     obj.css({left:oLeft,top:oTop});
			  }else{
			     obj.stop(true,true).animate({"left":oLeft,"top":oTop}); 
			  }
			  
		  },
		  //窗口改变，位置剧中
		  resize:function(obj){
			  var _this=this;
			  $(window).on('resize',function(){
					_this.getCenter(obj,true)
			  });
		  },
		  //取消事件
		  cancleEvent : function(obj,opts){
			return function(){
				obj.removeClass(" bounceInUp").addClass(" bounceInOut");
				setTimeout(function(){
					obj.hide();
				},400);
				opts.closeFn&&opts.closeFn();
				return false;
			}
		},
	}
	  
})(jQuery)