// JavaScript Document
(function(){
	var dataContral={
	  //获取id下的数据
	  getID :function (data,pid){
			var arr=[];
			for(var i=0;i<data.length;i++){
			   if(data[i].pid==pid){
				     arr.push(data[i])   
			   }	
			}
			return arr;
	    },
	  //获取父元素
	  getParents:function(data,id){
	     var arrs=[];
		 for(var i=0;i<data.length;i++){
		       if(data[i].id==id){
				   arrs.push(data[i])
				   arrs=arrs.concat(dataContral.getParents(data,data[i].pid))
				   break;
			   }	 
		} 
		return arrs
	  },
	  //获取当前元素在第几层
	  level:function(data,id){
	     return this.getParents(data,id).length;
	  },
	  //年月日
	  getTimer:function(){
		  var _this=this;
		  var timer=new Date();
		  var year=timer.getFullYear();
		  var month=timer.getMonth();
		  var day=timer.getDay();
		  return _this.dataFromat(year)+'-'+_this.dataFromat(month)+'-'+_this.dataFromat(day)
	  },
	  //时分秒
	  getTimers:function(){
		 var _this=this;
		 var timer=new Date();
		 var hour=timer.getHours();
		 var miu=timer.getMinutes();
		 var sec=timer.getSeconds();
		 return   _this.dataFromat(hour)+'-'+_this.dataFromat(miu)+'-'+_this.dataFromat(sec)
	  },
	  //补零函数
	  dataFromat:function(n){
		  return n>=10? n:"0"+n; 
	  },
	  //判断名字是否存在
	  isNameExsit:function (data,id,names,currentId){
		  
			var childs = dataContral.getID(data,id); //所有子元素
			for( var i = 0; i < childs.length; i++ ){
				if( childs[i].title === names && childs[i].id != currentId ){
					return true;//存在
					break;
				}
			}
			return false;//不存在
		},
	 //更新数据	
	 changeNameById	:function(data,name,id){
	      for(var i=0;i<data.length;i++){
		       if(data[i].id==id){
				     data[i].title=name;
					 return true;  
			    }
		  }
		 return false;   	 
	 },
	 //删除数据
	 delDataByArr:function(data,arry,id){
	     for(var i=0;i<data.length;i++){
		   	 for(var j=0;j<arry.length;j++){
				 if(data[i].id===arry[j].id&&data[i].pid===arry[j].pid&&data[i].title===arry[j].title){
					    data.splice(i,1)
				 }else{
				      /*throw new Error( "网络异常，删除文件过程中出现错误！");*/
				 }
			 }
		 }
		 for(var i=0;i<data.length;i++){
				if(data[i].id == id){
					data.splice(i,1); //删除自己
				}
	    }
	 },
	 //判断要目标元素是不是移动元素的子文件
	 isChildren:function(parents,id){
		 for(var i=0;i<parents.length;i++){
		        if(parents[i].id==id){
				    return true;//是true就代表目标元素是移动元素的子元素，不能移动
				}
		 }
		 return false;
	     
	 }
	 
	}
 window.dataContral=dataContral;
})()