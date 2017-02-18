function ajax(obj){
//初始化数据
	if(typeof(obj)!=="object"){console.log("请传入json");return;}
	var url=obj.url;                                                     //传入地址
	if(url==undefined){console.log("请传入正确的url");return;}
	var method=obj.type||"get";                                          //传输方式
	var async=obj.async==undefined?"true":obj.async;                     //同异步传输
	var datatype=obj.datatype||"text";                                   //得到数据的类型
	var data="";                                                         //传入的数据
	var success=obj.success;                                             //运行成功后执行的函数
//检测数据类型存入data
    var tpof=typeof(obj.data)
	if(tpof=="string"){data=obj.data;} 
	if(tpof=="object"){
		for(var i in obj.data){
            data+=i+"="+obj.data[i]+"&";
        }
        data=data.slice(0,-1);
	}
//判断传输方式
    var ajax=window.XMLHttpRequest? new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
    if(method=="get"){
   		ajax.open("get",url+"?"+data,async);
   		ajax.responseType=datatype;
		ajax.send(null);  
    }else if(method=="post"){
		ajax.open("post",url,async);
		ajax.responseType=datatype;
		ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		ajax.send(data);
	}
//检测数据是否交换成功
	ajax.onreadystatechange=function(){
		if(ajax.readyState==4){
			if(ajax.status==200){
				var result;
				//数据交换成功后，取出数据存入result
    			if(datatype=="xml"){result=ajax.responseXML}else{result=ajax.response}
				if(success){
					success(result);
				}
			}else if(ajax.status==404){
				console.log("页面没有找到");
			}else{
				console.log("获取错误");
			}
		}
	}
}
