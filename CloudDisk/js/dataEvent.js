// JavaScript Document
var template={
	 //渲染树形模板
	 S_template:function(data,pid){
		var childs=dataContral.getID(data,pid)
		var html="<ul style='display:block'>";
		childs.forEach(function(ele){
			var level=dataContral.level(data,ele.id)
			html+=`
				  <li>
					 <div class="title active" style="padding-left:${level*14}px;" data-file-id="${ele.id}">
						  <i class="icon icon1"></i>
						  <i class="icon icon2"></i>
						  <span>${ele.title}</span>
					 </div>
					 ${template.S_template(data,ele.id)}
				  </li>
			`;
		})
	   html+="</ul>";
	   return html
	 },
	 //面包屑导航模板
	 Nav:function(parents){
		 var breadNavHtml='';
		 parents.forEach(function(ele,index){
			 if(index==parents.length-1)return false;
			 breadNavHtml+=`<li>
			        <a href="javascript:void(0)" data-file-id="${ele.id}">
		                 <span>${ele.title}</span>
				    </a>
						 <i class='icon'></i>
		       </li>         
		 `;
		 $('#breadNav').html(breadNavHtml)
			 
		 });
		 breadNavHtml+=`<li>
		                 <span class='currPath' data-file-id="${parents[parents.length-1].id}">${parents[parents.length-1].title}</span>
		       </li>         
		 `;
		 $('#breadNav').html(breadNavHtml)
	},
	View:function (childs){
				  var V_html=`
						   <div class="files" data-file-id= "${childs.id}">
							  <div class="titles" >
								   <a class="selectBox" href="javascript:void(0)"></a>
								   <span class="icon folderIcon"></span>
								   <p class="filename">${childs.title}</p>
								   <input type="text" class="txt">
							   </div>
							</div>`;
				return V_html;			
					
	},
	//文件列表模板
	forlderLists : function(childs){
		var listHtml = `
			<div class="files" data-file-id="${childs.id}">
				<div class="titles">
					<a href="javascript:void(0)" class="selectBox"></a>
					<span class="icon folderIcon"></span>
					<span class="filename">${childs.title}</span>
					<input type="text" class="txt">
				</div>
				<div class="tools">
					<a href="javascript:void(0)" class="icon download" title="下载"></a>
					<a href="javascript:void(0)" class="icon share" title="分享"></a>
					<a href="javascript:void(0)" class="icon move" title="移动"></a>
					<a href="javascript:void(0)" class="icon cancle" title="删除"></a>
				</div>
				<div class="timer">
					<span>${childs.timer}</span>
				</div>	
			</div>
		`;
		return listHtml;
	},
	//新建文件列表夹模板
	L_newFile:function(childs){
	     var newFileHtml=`
			<div class="files reNameFile newFile" data-file-id="${childs.id}">
				<div class="titles">
					<a href="javascript:void(0)" class="selectBox"></a>
					<span class="icon folderIcon"></span>
					<span class="filename">${childs.title}</span>
					<input type="text" class="txt">
				</div>
				<div class="tools">
					<a href="javascript:void(0)" class="icon download" title="下载"></a>
					<a href="javascript:void(0)" class="icon share" title="分享"></a>
					<a href="javascript:void(0)" class="icon move" title="移动"></a>
					<a href="javascript:void(0)" class="icon cancle" title="删除"></a>
				</div>
				<div class="timer">
					<span>${childs.timer}</span>
				</div>	
			</div>
		`;
		return 	newFileHtml
	},
	//新建文件夹试图模板
	V_newFile:function(childs){
	    var newFiles=`
				<div class="files reNameFile newFile" data-file-id="${childs.id}">
					   <div class="titles" data-file-id= "${childs.id}">
					   <a class="selectBox" href="javascript:void(0)"></a>
					   <span class="icon folderIcon"></span>
					   <p class="filename">${childs.title}</p>
					   <input type="text" class="txt">
				   </div>
				</div>`;
		return newFiles;
	},
	//创建树形菜单模板【opts:代表树形菜单需要的数据,json】
	createTreeMenu : function(opts){
		var $li = $("<li></li>")
		$li.html(`
			<div class="title control-none" style="padding-left:${opts.level*14}px;" data-file-id="${opts.id}">
				<i class="icon icon1"></i>
				<i class="icon icon2"></i>
				<span>${opts.title}</span>
			</div>
			<ul style="display:block"></ul>
		`);
		return $li;
	},
	
  
}