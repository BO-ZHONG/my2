// JavaScript Document
(function($){
      $.toolTip=function(opts){
		   var opts=$.extend({}, $.toolTip.methods, $.toolTip.defaults,opts) ;
		       opts.init(opts); 
	   }
	    $.toolTip.methods={
		   
		    init:function(opts){
			    this.template(opts)
			},
			template:function(opts){
		        var $obj=$('#h_tips');
				if($obj.html()==undefined){
				    var $obj=$('<div id="h_tips" class="h_tips"><div class="tm_title"><span>'+opts.title+'</span><a href="javascript:void(0)" class="icon tm_close"></a> </div><div class="t_txt"><p>'+opts.content+'</p></div><div class="t_close"><a href="javascript:void(0)"  class="tm_sure">确定</a><a href="javascript:void(0)" class="tm_cancle">取消</a></div></div>');
					$('body').append($obj);
			    }
				this.setStyle($obj);
				this.resize($obj);
				$('#hiden').show();
				$obj.show();
				$obj.removeClass("bounceInOut").addClass("bounceInUp")
				this.dragsMove($obj,opts)
			},
			//设置剧中
		    setStyle:function($obj){
					var w=$(window).width();
					var h=$(window).height();
					var lw= $obj.width();
					var lh=$obj.height();
					var left=(w-lw)/2;
					var top=(h-lh)/2
					$obj.css({left:left,top:top})
		    },
			 //窗口改变，位置剧中
		   resize:function($obj){
			  var _this=this;
			  $(window).on('resize',function(){
					_this.setStyle($obj)
			  });
		   },
		    dragsMove:function(obj,opts){//鼠标按下
			   var _this=this;
			   var $DragHead=obj.children('div').eq(0);
			   var $closeBtn=obj.find(".tm_close");
			       
		       var $cancleBtn=obj.find(".tm_cancle");
			   var $sureBtn=obj.find(".tm_sure");
			      
			   $closeBtn.off('mousedown').on('mousedown',_this.cancleEvent(obj,opts));    
			   $sureBtn.off('click').on('click',function(){
				       var timer = setTimeout(function(){
							opts.success && opts.success();
							clearTimeout(timer);
						},500);
						_this.cancleEvent(obj,opts)(); 
			   });
		       $cancleBtn.off('click').on('click',_this.cancleEvent(obj,opts));
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
		}
	   }	
	
})(jQuery)