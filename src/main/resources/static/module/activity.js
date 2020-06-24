 $(function(){//页面加载完成以后执行
	    	/* debugger
	    	 var aty=[[${aty}]];//在js中获取thyemeaf表达式中的内容
	         //console.log("aty",aty); 在浏览器输出相关内容
	         if(aty){
	        	 doInitEditFormData(aty)
	         }*/
	         doGetActivitys();
	         
	     });
	    	function doGetActivitys(){
	    		//定义url
	    		var url="doFindActivitys";
	    		//定义params
	    		var params="";
	    		//发送异步请求获取数据返回至页面
	    		doAjaxGet(url,params,function(result){
	    			var jsonObj=JSON.parse(result);
	    			console.log("jsonObj",jsonObj);
	    			var tBody=$("tbody");tBody.empty();//清空内容
	    			for(var i=0;i<jsonObj.length;i++){
	    				tBody.append(doCreateRow(jsonObj[i]));
	    			}
	    		});
	    	}
	     function doInitEditFormData(aty){
	    	 $("#atyId").val(aty.id);
	    	 $("#titleId").val(aty.title);
        	 $("#categoryId").val(aty.category);
        	 $("#startTimeId").val(aty.startTime);
        	 $("#endTimeId").val(aty.endTime);
        	 $("#remarkId").text(aty.remark);
        	 //显示模态框
        	 $('#myModal').modal('show'); 
	     }
	     //呈现添加模态框
	     function doShowAddDialog(){
	    	 $("#atyId").val('');
	    	 $("#titleId").val('');
        	 $("#categoryId").val('');
        	 $("#startTimeId").val('');
        	 $("#endTimeId").val('');
        	 $("#remarkId").text('');
        	 //显示模态框
	    	 $('#myModal').modal('show'); 
	     }
	     function doLoadById(id){
	    	 location.href="doFindById?id="+id;
	     }
	     function doSaveActivity(){
	    	    //1.获取表单数据
	    	    var title=$("#titleId").val();
        	    var category=$("#categoryId").val();
        	    var startTime=$("#startTimeId").val();
        	    var endTime=$("#endTimeId").val();
        	    var remark=$("#remarkId").val();//text()取不到值
        	    var params="title="+title+"&category="+category+"&startTime="+startTime+"&endTime="+endTime+"&remark="+remark;
	    	    //2.异步提交表单数据
	    	    var url="doSaveActivity";
	    	    doAjaxPost(url,params,function(result){
	    	    	//将json格式的字符串转换为json格式的JS对象
	    	    	var jsonObj=JSON.parse(result);
	    	    	alert("save ok");
	    	    	$('#myModal').modal('hide');
	    	    	//刷新页面(两种方式：再次查询所有或者在当前页面在插入一行)
	    	    	//局部更新
	    	    	//获得第一个tr元素，在tr元素外部的前面插入
	    	    	//$("tbody").find("tr:eq(0)").before(doCreateRow(jsonObj));
	    	        //在tbody内部的前面插入。
	    	    	$("tbody").prepend(doCreateRow(jsonObj));
	    	    });
		 }
	     function doCreateRow(result){
	    	return `<tr><td>${result.id}</td>
	    	    <td>${result.title}</td>
	    	    <td>${result.category}</td>
	    	    <td>${result.startTime}</td>
	    	    <td>${result.endTime}</td>
	    	    <td>${result.state}</td>
	    	    <td>${result.createdTime}</td>
	    	    <td>
	    	    <button class="btn btn-danger btn-sm" id=${result.id} onclick=doDeleteById(${result.id})>删除</button>
				<button class="btn btn-warning btn-sm" onclick=doLoadById(${result.id})>更新</button>
	    	    </td></tr>`;
	     }
	     
	     //基于ajax方式执行删除操作
	     function doDeleteById(id){
	    	if(!confirm("确定删除吗"))return;
		    //location.href="doDeleteById?id="+id;
		    var url="doDeleteById";
		    var params="id="+id;
		    //var obj=$(this);
		    doAjaxGet(url,params,function(result){
		    	alert(result);
		    	//思考刷新的方式?...
		        var obj=$("#"+id);
		    	console.log("obj",obj);
		    	$("#"+id).parents("tr").remove();
		    });
		    
	     }
	  