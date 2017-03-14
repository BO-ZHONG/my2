// JavaScript Document
(function(){
	 var datas=data;
	 var Firing=function(){
	     var tools={
		     init:function(){
				 tools.setViewH();//初始化视图区的高度
				 tools.changeMenu(data)
				 //渲染树形菜单
			     tools.drawTreeMenu(datas,-1);
			     //初始化工具方法
			     tools.WayFn();
				 //全部选择按钮
				 tools.selectFloader()
				 //浏览器大小变化而变化
			     $(window).resize(function(){
					   tools.setViewH();
				 });
			 },
			 //工具方法
			 WayFn:function(){
				 var _this=this;
				   	//下载
				   $("#download").on("click",function(){
							$.tips({
								content:'暂无下载资源，请联系管理员',
								//controls : "tm_warning",
								timer:2
								})
					});
					//分享
					$("#share").on("click",function(){
							$('#hiden').fadeIn();
							$('#share_1').Drag({
								 iDrag:true,//能否拖拽，默认可以
								 obj1:$(".close"),
								 obj2:$("#shareEnd"),
								 closeFn:function(){//回调
									 $('#hiden').fadeOut();
								 }
								});
							
					});
					//刷新
					$("#refresh").on("click",function(){
									 location.reload();
								});
				  //切换视图或列表
				  $('#changeView').on('click',function(){
					  var meods=$(this).data('view');//当前是列表还是视图
					  var ishtml=$('#V-content').find('.details').html();
					  
					  if(ishtml!==''){
						  if(meods=='view'){//如果是meods等于view,证明是列表，点击事切换视图
							  $(this).data('view','list')
							  $('#filesLists').hide();
							  $('#filesView').show();
							  
						  }else{
							  $(this).data('view','view')
							  $('#filesLists').show();
							  $('#filesView').hide();
						  
						  }	
					 }else{
						 
						 $.tips({content:"页面无内容，可移步别处",
								
								timer:1.5 })
					 }
				});
				  //新建文件夹按钮
				  $('#newfolder').on('click',function(){
				   var viewMode = $("#changeView").data("view");
				   
						if(viewMode == "view"){
							creatFile("filesLists");
							
						}else{
							creatFile("filesView");
						}  
						
				   
					function creatFile(filesLists){
						var newFile1=$("#"+filesLists).find('.newFile');
						
					 if(!newFile1.length){
						var datas={
						   title:'新建文件夹',
						   id:new Date().getTime(),
						   timer:dataContral.getTimer()
						 } ; 
						
						
						$('#filesLists').prepend(template.L_newFile(datas));
						$('#filesView').prepend(template.V_newFile(datas));
						var newFile=$("#"+filesLists).find('.newFile')
						
						var Text=newFile.find('.txt');
							Text.addClass('showing');
							Text.select();
						
						Text.on("blur",function(){
							 var val=$(this).val();
							 
							 if(val.trim()==""){
								  newFile.remove();
								  $.tips({ 
										content:"新建文件夹失败！",
										controls : "tm_warning"
										});
							 }else{
								 
								 var parentId = $("#getPidInput").val();
								 var fileid = newFile.data("file-id");
								 var isExist =dataContral.isNameExsit(data,parentId,val,datas.id);        
								 
								//判断有无重名 
								if(isExist) {
									 $.tips({ 
										content:"有相同的名字啦！",
										controls : "tm_warning",
										timer:2
										});
									  Text.select();							
								}else{
									//开始创建
									var newData={
									   title:val,
									   pid:parentId,
									   id:datas.id,
									   timer:datas.timer
									 }
								  newFile.find('.filename').html(val)
								  
								  //移除相关的样式【表示创建成功，要在当前显示】
								  newFile.removeClass('newFile')
								  $("#filesView").find(".files[data-file-id='"+datas.id+"'] .filename").html(val);
								 $("#filesLists").find(".files[data-file-id='"+datas.id+"'] .filename").html(val);
								  $("#filesView").find(".files").removeClass("newFile");
								 $("#filesLists").find(".files").removeClass("newFile");
								  Text.removeClass('showing');
								 //实时更新数据库
								  data.push(newData)
								  
								 //获取在当前父级树形菜单的id
								 var treeMeun=$('#treeMenu').find("div[data-file-id='"+parentId+"']")       
								 //获取兄弟节点
								 var oUl=treeMeun.siblings('ul');
								 //获取当前元素所有父级长度，即当前元素在第几层
								 var level=dataContral.level(data,fileid)
								 //真正更新树形菜单
								 oUl.append(template.createTreeMenu({
										 title:val,
										 id:fileid,
										 level:level
									 }));
								 $.tips({
									 content:'文件创建成功',
									 timer:1.5
									 })	 
															
								}
								Text.off("blur");
								
								
								
							 }
						});
						}else{
								 var inputTxt = newFile1.find(".txt");
									 inputTxt.focus();
						}
					 }  
						
				   
				});
				  //重命名按钮
				  $('#rename').on('click',function(){
						   //获取当前页面有无被选中的文件
							var renameFile = "";
							var viewMode = $("#changeView").data("view");
							if(viewMode == "view"){
								renameFile =  $("#filesLists").find(".active");
								reNameOfFile(renameFile);
							}else{
								renameFile =  $("#filesView").find(".active");
								reNameOfFile(renameFile);
							}
						   
						  function reNameOfFile(renameFile){
						   
							   if(!renameFile.length){
								   $.tips({
									   content:'您没选中文件，请选择', 
									   timer:2  
								   })
							   }else if(renameFile.length>=2){
								   $.tips({
									   content:'所选文件不能大于两个', 
									   timer:2  
								   }) 
							   }else{
								   //被选中的文件
								   var newFlie=$('#V-content').find('.active');
								   //焦点的放置
								   var txt=newFlie.find('.txt');
									   txt.addClass('showing');
									   txt.select()
								   //获取当前元素id
								   var flieId=newFlie.data('file-id');
								   //获取树形菜单中id与当前id一样的元素
								   var treeId=$('#treeMenu').find(".title[data-file-id='"+flieId+"']")       
								   //所有有关的文件
								   var allF=$('#V-content .details').find('.files[data-file-id="'+flieId+'"]');
								   //导航条的变更
								   //var navId=$('#nav').find("span[data-file-id='"+flieId+"']")          
								   
								   //当前元素下的name标签
								   var oSpan= newFlie.find('.filename') ;
								   var allFname=allF.find('.filename') ;
								   txt.on('blur',function(){
									   var  val=$(this).val();
										if(val.trim()==""){
											$.tips({
												content:'请输入文字',
												timer:2
												})
											txt.focus()	
										}else{
											var parenId=$('#getPidInput').val()
											var isExit=dataContral.isNameExsit(data,parenId,val,flieId)         
											if(isExit){
												$.tips(
													{content:'重名了',timer:2} 
												);
												txt.select()
											}else{
												oSpan.html(val);
												allFname.html(val);
												treeId.find('span').html(val);
												txt.removeClass('showing');
												
												//更新数据库
												var isChangeSucc =dataContral.changeNameById(data,val,flieId);
												if(isChangeSucc){
													$.tips({
													  content:'重命名成功',
													  timer:1	
													});
													txt.off('blur')
												}else{
													$.tips({
													  content:'重命名失败',
													  timer:1	
													});
												}
											}
											
										}
										
										//navId.html(newVal)
									   })    
									   
							   }
						}
						
					});	
				  //删除按钮
				   $('#cancle').on('click',function(){
						var isActive=$('#filesLists').find('.active');
						if(isActive.length){
						  $.toolTip({
								 title:"友情提示",
								 content:"你确定要删除么？",
								 iDrag:true,//能否拖拽，默认可以
								 /*closeBtn:$(".tm_close"),
								 cancleBtn:$(".tm_cancle"),
								 sureBtn:$(".tm_sure"),*/
								 closeFn:function(){//回调
									 $('#hiden').hide();
								 },
								 success:function(){
									 
									 isActive.remove();
				
									 for(var i=0;i<isActive.length;i++){
										 var id=$(isActive[i]).data('file-id');
										 //获取对应的树形菜单
										 var trees=$('#treeMenu').find(".title[data-file-id='"+id+"']")
										 $("#filesView").find(".files[data-file-id="+id+"]").remove();
										//删除对应的树形菜单
										
										trees.parent().remove();
										 
										//要删除的数据
										var newArry=[];
										function delectData(data,pid){
											for(var i=0;i<data.length;i++){
												  if(data[i].pid==pid){
													   newArry.push(data[i]);
													   delectData(data,data[i].id) //递归  
												  }
											}	
										}
										delectData(data,id)
										dataContral.delDataByArr(data,newArry,id); //删除数据                      
										$("#selectAll").removeClass('sel')
										//提示文件删除成功
												$.tips({
													content:"文件删除成功！",
													timer:1
												});
									 }
									 
								 }
						  })
						}else{
						  $.tips({
							   content:'请选择要删除的文件',
							   timer:1  
						  })
						}
					});				
				  //移动
	              $('#move').on('click',function(){
					  var isActive=$('#filesLists').find('.active');
					  if(!isActive.length){
						   $.tips({
							   content:'请选择文件',
							   timer:2
						   })
					  }else if(isActive.length>=2){
						   $.tips({
							   content:'只能移动一个文件',
							   timer:2
						   })
						   
					  }else{
						  $("#hiden").show();
						 /* $("#moveLocation").show().removeClass('bounceInOut').addClass('bounceInUp');*/
						  var treeMeun=$('#treeMenuPanel');
						  var treeMeunHtml=template.S_template(data,-1);
							  treeMeun.html(treeMeunHtml);
							  _this.selctCurrTreeMenu(treeMeun,0);
							  
							  //为当前的目录绑定选中事件
							  $("#treeMenuPanel").off("click").on("click",".title",function(){
								   $("#treeMenuPanel").find(".title").removeClass("active");
								   $(this).addClass("active");
							 });
							 
							 //显示 文件移动位置选择 窗口
							 $("#moveLocation").tmDrags({ 
									isDrag : true, 
									closeBtn : $(".close"),
									suerBtn : $(".sure"),
									cancleBtn : $(".cancel"),
									closeFn : function(){
										$('#hiden').hide();	
									},
									callback : function(){
										var currentId = isActive.data("file-id"); //要移动的文件的 id
											
										var moveArea = $("#treeMenuPanel").find(".active"); //要移动到的目标位置
											
										var targetId = moveArea.data("file-id"); // 获取目标位置的file-id
										if(currentId === targetId){//如果：要移动得文件与目标位置相同
												
												$.tips({
													content:"文件移动失败，重新选择目标位置！",
													timer:2
												});	
										
										}else{
											//不能移动的条件：
											//1 父级不能移动到子级
											//2 自身不能移动到自身
											//3 自身不能移动到自身的父元素下（没什么改变）
											  
											//获取要移动到的目标元素所有父级
											var parents=dataContral.getParents(data,targetId)                     
											//去除本身元素
											for(var i=0;i<parents.length;i++){
												if(parents[i].id==targetId){
														 parents.splice(i,1)
												}	
											}
											
											//判断要目标元素是不是移动元素的子文件
											var isExit=dataContral.isChildren(parents,currentId)
											
											if(!isExit){
											   
											   if(targetId==$('#getPidInput').val()){//如果目标元素与当前元素相同
													$.tips({
													   content:'你这样做没什么改变',
													   timer:2
													})
													return false;   
											   }else if('1'=='1'){ // 不在同一级 或者 在同一级，单父级不同，表示可以移动
											   //要移动的元素的子元素
											   var nowAllChilds=[];
											  //本身的数据
											  for(var i=0;i<data.length;i++){
												  if(data[i].id==currentId){
													  data[i].pid=targetId
													  nowAllChilds.push(data[i])
												  }  
											   
											  }
											  //获取被选中元素的子元素
											  
											  function selectChilds(data,currentId){
												 for(var i=0;i<data.length;i++){
													  if(data[i].pid==currentId){
														nowAllChilds.push(data[i])
														selectChilds(data,data[i].id)//递归
													  } ; 
												  };
											   }; 
											  
											  
											   selectChilds(data,currentId);
											   console.log(nowAllChilds)
											   //删除要移动的文件
												   
												isActive.remove();
												
												//删除试图中的对应file
												$("#filesView").find(".files[data-file-id='"+currentId+"']").remove();
												
												//循环更新移动的文件id,并创建新的树形目录结构【方法：类似新建文件一样，添加树形目录】
												var targetLevel=dataContral.level(data,targetId)
												nowAllChilds.forEach(function(ele){
														var newF = {
																id : new Date().getTime() + Math.floor(Math.random()*100), //避免id 重复
																title : ele.title, //文件名
																level :targetLevel++  //层级（要在第几层显示）
															}
															for(var i=0;i<data.length;i++){
																if(data[i].id == ele.id){
																	data[i].id =  newF.id; //更新原始数据的id
																	ele.id = newF.id; //更新当前要移动的(所有)文件id
																}
																//console.log(datas[i]);
															}
														});
														
														//修改 每个元素的pid 【目的：根据这个pid来更新原始数据的pid】
														for(var i=1;i<nowAllChilds.length;i++){
															nowAllChilds[i].pid = nowAllChilds[i-1].id;
														}
														
														// 更新原始数据：
														for(var i=0;i<data.length;i++){
															for(var j = 0;j<nowAllChilds.length;j++){
																if(data[i].id == nowAllChilds[j].id){
																	data[i].pid = nowAllChilds[j].pid;
																}
															}
														}
														
														// 更改树形目录的各级状态
														
														var treeMenu = $("#treeMenu");
														var TreeMenuHtml = template.S_template(data,-1);
														treeMenu.html(TreeMenuHtml);
														_this.selctCurrTreeMenu(treeMenu,$("#getPidInput").val()); //默认选上一次选中过的
												
											   
												
											   }else{
												  $.tips({
													   content:'移动失败，请重新选择',
													   timer:2
												 })
											   }
											}else{
												 $.tips({
													   content:'上级文件不能放在本身的下级文件中',
													   timer:3
												 })
											};
										}
									}
							 })
								   
							  
							  
					  }	
					  
				});	
					
		 },
		  //点击树形菜单改变面包屑
		  changeMenu: function (data){
			  var _this=this;
		  $("#treeMenu").on("click",".title",function(){
					changeMenus($(this));
				});
		  $("#breadNav").on("click","li>a",function(){
					changeMenus($(this));
				});		
	      
		    function changeMenus(currentMenu){
		            var obj = $("#treeMenu");
					var currId = currentMenu.data("file-id"); //获取当前id
					
					_this.selctCurrTreeMenu(obj,currId)//选中当前点击的menu
					_this.drawBreadNav(data,currId); //重新渲染面包屑导航
					$("#getPidInput").val(currId); //缓存当前 id ,为后续删除做准备            
					$("#selectAll").removeClass("sel"); //切换菜单时取消全选按钮的状态
		    }
	     },
		          
			 //渲染树形菜单
	       drawTreeMenu:function(data,currid){ 
				var treeMenu = $("#treeMenu");
				var htmls=template.S_template(data,-1)
	            treeMenu.html(htmls);
				this.selctCurrTreeMenu(treeMenu,0); //默认选中第一个
				this.drawBreadNav(data,0);
			},
			//渲染面包屑导航
	        drawBreadNav :function (data,currid){
					//获取currid的父元素
					var parents = dataContral.getParents(data,currid).reverse();
					template.Nav(parents);//初始化面包屑导航
					this.drawFiles(data,currid);
			},
			//渲染右侧导航页面				
			drawFiles:function(data,currid){
					var childs=dataContral.getID(data,currid);
					var html_V=''
					var listsHtml='';
					childs.forEach(function(ele){
						 html_V+=template.View(ele);
						 listsHtml+=template.forlderLists(ele);	
					})
					$("#filesLists").html(listsHtml);
					$("#filesView").html( html_V);
			},
			
			//为左侧导航添加点击背景		
			selctCurrTreeMenu:function(obj,currid){
						currid = currid || 0;
						var ele = obj.find(".title[data-file-id='"+currid+"']");
						obj.find(".title").removeClass("active"); //取消其他选中状态
						ele.addClass("active"); //为当前的menu添加选中状态
			},
			//点击全选按钮选中所有文件
		    selectFloader:function (){
		         var _this=this;
				$('#selectAll').on('click',function(){
					   $(this).toggleClass("sel");
						var isSel = $(this).hasClass("sel"); //当前全选按钮是否选中
						if(isSel){
							$("#filesLists").find(".files").addClass("active");
							$("#filesView").find(".files").addClass("active");
						}else{
							$("#filesLists").find(".files").removeClass("active");
							$("#filesView").find(".files").removeClass("active");
						}
				});
					$('#V-content').find('.filesLists').on('mousedown','.files .selectBox',function(){
							  $(this).parents('.files').toggleClass('active');
							  _this.selectAll();
						});
					$('#V-content').find('.filesView').on('mousedown','.files .selectBox',function(){             
							 
							  $(this).parents('.files').toggleClass('active');
							  _this. selectAll();
						});	
					
			},
			//渲染全部按钮
	        selectAll:function() {
					var sel=$('#filesLists').find('.files').length=$('#filesView').find('.files').length;
				
				var foler=$('#filesLists').find('.active').length=$('#filesView').find('.active').length;
				
				//当选中的  与  总共的文件 一样时，表示选中全部
				(sel === foler && sel)  ? $("#selectAll").addClass("sel") : $("#selectAll").removeClass("sel");
			},
		
			//设置随浏览器高度的变化而变化
			setViewH :function(){
				var _this = this;
				var height = $("body").height() - 130;
				var width = $("body").width() - $(".leftView").outerWidth();              
				$("#mainView").css("height",height);
				$("#panelArea").css("width",width);
	        },
			 	 
		 }
		 return tools.init();
	}
	window.Firing=Firing;
})()
/*window.onload=function(){
	 var head_list=document.getElementById('head-list');	
     var user_head=document.getElementById('user-head');
	 var user_list=document.getElementById('user-list');
	 var list_menu=document.getElementsByClassName('list-menu')[0];
	 var menu_li=list_menu.getElementsByTagName('li');
	
	 head_list.onmouseover=function(){
		   if(hasClass(user_head,'active')){return}else{
		    user_head.className+=' active';
		   };
		   user_list.style.display='block';
	 };
	head_list.onmouseout=function(){
		   if(hasClass(user_head,'active')){
		      removeClass(user_head,'active')
		   };
		   user_list.style.display='none';
	 };
	list_menu.onmouseover=function(ev){
		 var ev=ev||event;
		 var target=ev.target||ev.srcElement;
		 if(target.nodeName=='LI'){
		     target.style.background='#EFF';
		 }else if(target.nodeName=='A'){
			 
		     target.parentNode.style.background='#EFF'; 
		 }
		
    }; 
    list_menu.onmouseout=function(ev){
		 var ev=ev||event;
		 var target=ev.target||ev.srcElement;
		 if(target.nodeName=='LI'){
		     target.style.background='';
		 }else if(target.nodeName=='A'){
		     target.parentNode.style.background=''; 
		 }
		
    }; 	
	 //删除Class 
    function removeClass(obj, cls) {  
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');  
        obj.className = obj.className.replace(reg, ' ');  
	};
	//判断有无Class 
	function hasClass(obj, cls) {  
       return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));    } 
};*/