/*
 getClass 获取指定类名的元素
 classname指定要获取元素的类名
 1、判断浏览器
    document.getElementsByClassName
 2、获取所有元素
    range指定的范围,具体的document对象
    range=range?range:document
 3、判断是否等于指定的类名
    classname
 4、符合条件的保存到数组里
 5、返回数组
 */
function getClass(classname,range){
	range=range?range:document;
	// range=range||document;
	// range=(range===undefined)?document:range;
	// if(!range){range=document}
	if(document.getElementsByClassName){
		//w3c
		return range.getElementsByClassName(classname);
	}else{
		//ie6-8
		var newarr=[];
		var arr=range.getElementsByTagName("*");
		for(var i=0;i<arr.length;i++){
			//判断当前元素的类名是否包含classname
			if(classCheck(arr[i].className,classname)){
				newarr.push(arr[i]);
			}
		}
		return newarr;
	}
}
//判断classStr里是否含有classname
function classCheck(classStr,classname){
	var arr=classStr.split(" ");
	for(var i in arr){
		if(arr[i]===classname){
			return true;
		}
	}
	return false;
}
/*
  先判断参数的类型,如果是函数执行window.onload
  如果是字符串则执行以下
  $(".one") $(".two") $("div")
  初始化范围
  先判断type的第一个字符
  是"."按照类名选择
  是"#"按照id选择
  其他按照标签选择
  返回元素
  如果传进来一个标签对,则表示要创建一个相应的标签
*/
function $(type,range){
	if(typeof type=="function"){
		window.onload=function(){
			type();
		}
	}else if(typeof type=="string"){
		range=range||document;
		//兼容性
		// type=type.trim();
		if(type.charAt(0)=="."){
			return getClass(type.substring(1),range);
		}else if(type.charAt(0)=="#"){
			return range.getElementById(type.substring(1));
		}else if(/^[a-zA-Z][a-zA-Z1-6]{0,8}$/.test(type)){
			return range.getElementsByTagName(type);
		}else if(/^<[a-zA-Z][a-zA-Z1-6]{0,8}>$/.test(type)){
			return document.createElement(type.slice(1,-1));
		}
	}
}
/*
  获取和设置文本
*/
function getContent(obj,value){
	if(value){
		//设置
		if(obj.textContent){
			//w3c
			obj.textContent=value;
		}else{
			//ie6-8
			obj.innerText=value;
		}
	}else{
		//获取
		if(obj.textContent){
			return obj.textContent;
		}else{
			return obj.innerText;
		}
	}
}
/*获取指定元素的样式*/
function getStyle(obj,attr){
	if(window.getComputedStyle){
		return getComputedStyle(obj,null)[attr];
	}else{
		return obj.currentStyle[attr];
	}
}
/*获取指定元素的子节点
  getChild(obj,type)
  obj指定父元素
  type
  真时获取元素节点和有意义的文本节点
  假时或者不传时获取元素节点
*/
function getChild(obj,type){
	var childs=obj.childNodes;
	var arr=[];
	if(type){
		for(var i=0;i<childs.length;i++){
			if(childs[i].nodeType==1||(childs[i].nodeType==3&&childs[i].nodeValue.replace(/^\s*|\s*&/g,""))){
				arr.push(childs[i]);
			}
		}
	}else{
		for(var i=0;i<childs.length;i++){
			if(childs[i].nodeType==1){
				arr.push(childs[i]);
			}
		}
	}
	return arr;
}
//获取第一个子元素节点
function firstChild(obj) {
	return getChild(obj)[0];
}
//获取最后一个子元素节点
function lastChild(obj){
	return getChild(obj)[getChild(obj).length-1];
}
//随机获取一个子元素节点
function randomChild(obj,num){
	return getChild(obj)[num];
}
/* 获取当前子元素节点的下一个子元素节点
   如果有 获取
   没有返回false*/
function getNext(obj){
	if(obj.nextSibling){
		if(obj.nextSibling.nodeType!=1){
			return getNext(obj.nextSibling);
		}
		return obj.nextSibling;
	}
	return false;
}
/* 获取当前子元素节点的上一个子元素节点
   如果有 获取
   没有返回false*/
function getPrevious(obj){
	if(obj.previousSibling){
		if(obj.previousSibling.nodeType!=1){
			return getPrevious(obj.previousSibling);
		}
		return obj.previousSibling;
	}
	return false;
}
/*  在当前子元素节点的后面添加元素
    如果当前子元素节点后面有子元素节点   则在后面的子元素节点前插入元素
    如果当前子元素节点后面没有子元素节点 则追加到父对象的最后*/
function insertAfter(newobj,obj){
	var parent=obj.parentNode;
	if(getNext(obj)){
		parent.insertBefore(newobj,getNext(obj));
	}else{
		parent.appendChild(newobj);
	}
}
//给对象添加绑定事件
function addEvent(obj,event,fn){
	if(obj.addEventListener){
		//w3c
		obj.addEventListener(event,fn,false);
	}else{
		//ie
		obj.attachEvent("on"+event,fn);
	}
}
//给对象删除绑定事件
function removeEvent(obj,event,fn){
	if(obj.removeEventListener){
		obj.removeEventListener(event,fn,false);
	}else{
		obj.detachEvent("on"+event,fn);
	}
}
//给对象添加鼠标轮动时间
function mouseWheel(obj,down,up){
	//ie
	if(obj.attachEvent){
		obj.attachEvent("onmousewheel",scrollFun);
	}else{
		//谷歌
		obj.addEventListener("mousewheel",scrollFun,false);
		//火狐
		obj.addEventListener("DOMMouseScroll",scrollFun,false);
	}
	function scrollFun(e){
		e=e||window.event;
		//去掉浏览器默认动作
		/*if(e.preventDefault){
			e.preventDefault();
		}else{
			e.returnValue=false;
		}*/
		var num=e.wheelDelta||e.detail;
		//判断滚轮滑动方向
		//往下
		if(num==-120||num==3){
			//改变this指针,指向obj
			down.call(obj);
		}
		//往上
		if(num==120||num==-3){
			//改变this指针,指向obj
			up.call(obj);
		}
	}
}
//hover
//判断某个元素是否包含有另外一个元素
function contains (parent,child) {
	if(parent.contains){
		return parent.contains(child) && parent!=child;
	}else{
		return (parent.compareDocumentPosition(child)===20);
	}
}

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
function checkHover (e,target) {
	if(getEvent(e).type=="mouseover"){
		return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
			!((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
	}else{
		return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
			!((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
	}
}
//鼠标移入移出事件
/*
 obj   要操作的对象
 overfun   鼠标移入需要处理的函数
 outfun     鼠标移除需要处理的函数
 */
function hover (obj,overfun,outfun) {
	if(overfun){
		obj.onmouseover=function  (e) {
			if(checkHover(e,obj)){
				overfun.call(obj,[e]);
			}
		}
	}
	if(outfun){
		obj.onmouseout=function  (e) {
			if(checkHover(e,obj)){
				outfun.call(obj,[e]);
			}
		}
	}
}
function getEvent (e) {
	return e||window.event;
}
//设置cookie
function setCookie(attr,val,time){
	if(time){
		var now=new Date();
		now.setTime(now.getTime()+time*1000);
		document.cookie=attr+"="+val+";expires="+now.toGMTString();
	}else{
		document.cookie=attr+"="+val;
	}
}
//获取cookie
function getCookie(attr){
	var str=document.cookie;
	var arr=str.split("; ");
	for(var i=0;i<arr.length;i++){
		var nowarr=arr[i].split("=");
		if(attr==nowarr[0]){
			return nowarr[1];
		}
	}
	return false;
}
//删除cookie
function delCookie(attr){
	var time=new Date();
	time.setTime(time.getTime()-3);
	setCookie(attr,"ss",time);
}
