window.onload=function(){
	//头部 送至北京
    var headL=$("div",$(".headCon")[0])[0];
    var headLs=$(".headL")[0];
    var headLX=$(".headLX")[0];
    var headLxl=$(".headxlJT",headLs)[0];
    var dizhi=$("#dizhi");
    headL.onmouseover=function(){
        headLX.style.display="block"
        headLs.style.backgroundColor="#fff";
        headLs.style.borderColor="#ccc";
        headLs.style.height="31px"
        // headLs.style.zIndex=100;
        animate(headLxl,{top:-10,left:2},50);
    }
    headL.onmouseout=function(){
        headLX.style.display="none"
        headLs.style.backgroundColor="#f1f1f1";
        animate(headLxl,{top:-15,left:0},50);
        headLs.style.borderColor="#f1f1f1";
        headLs.style.height="30px";
    }
    //初始化
    var ps=$("p",headLX);
    ps[0].style.backgroundColor="#c81623";
    for(var i=0;i<ps.length;i++){
        ps[i].index=i;
        ps[i].onclick=function(){
            // location.replace("index.html");
            for(var j=0;j<ps.length;j++){
                ps[j].style.backgroundColor="#fff";
            }
            ps[this.index].style.backgroundColor="#c81623";
            getContent(dizhi,getContent(ps[this.index]));
            headLX.style.display="none";
        }
    }
	//我的京东
    var headXiala=$(".headXiala");
    var headRxl=$(".headRxl");
    var headRX=$(".headRX");
    var headxlJT=$(".headxlJT");
    for(var i=0;i<headXiala.length;i++){
        headXiala[i].index=i;
        headXiala[i].onmouseover=function(){
            headRX[this.index].style.display="block"
            headRxl[this.index].style.backgroundColor="#fff";
            animate(headxlJT[this.index+1],{top:-4,left:2},50);
            headRxl[this.index].style.borderColor="#ccc";
            headRxl[this.index].style.height="31px";
        }
        headXiala[i].onmouseout=function(){
            headRX[this.index].style.display="none"
            headRxl[this.index].style.backgroundColor="#f1f1f1";
            animate(headxlJT[this.index+1],{top:-10,left:0},50)
            headRxl[this.index].style.borderColor="#f1f1f1";
            headRxl[this.index].style.height="30px";
        }
    }
    //头部的横图
    var headImgb=$(".headImgb")[0];
    var headImg=$(".headImg")[0];
    headImgb.onclick=function(){
        animate(headImg,{opacity:0},200,function(){
            headImg.style.display="none";
        })
    }
    //导航栏
    var bannersBig=$(".bannersBig");
    var bannersHover=$(".bannersHover");
    for(var i=0;i<bannersBig.length;i++){
        hover(bannersBig[i],function(){
            $(".bannersHover",this)[0].style.display="block";
            $(".banners",this)[0].className="banners bannershot";
        },function(){
            $(".bannersHover",this)[0].style.display="none";
            $(".banners",this)[0].className="banners";
        })
    }
    //我的购物车
    var logoRr=$(".logoRr")[0];
    var logoGW=$(".logoGW")[0];
    var logoGW1=$(".logoGW1")[0];
    logoRr.onmouseover=function(){
        logoGW.style.display="block";
        logoGW1.style.display="block";
    }
    logoRr.onmouseout=function(){
        logoGW.style.display="none";
        logoGW1.style.display="none";
    }
	//透明度轮播函数
    function opcTab(obj){
        var bannersc=$(".bannersc",obj);
        var left=$(".bannerNTCs",obj)[0];
        var right=$(".bannerNTCx",obj)[0];
        var lis=$("li",obj);
        var now=0;
        var next=0;
        //初始化
        lis[0].className="hot";
        bannersc[0].style.zIndex=3;
        var t=setInterval(move,4000);
        function move(){
            next++;
            if(next==bannersc.length){
                next=0;
            }
            for(var i=0;i<bannersc.length;i++){
                if(i==now){continue;}
                bannersc[i].style.zIndex=0;
                bannersc[i].style.opacity=1;
                bannersc[i].style.filter="alpha(opacity=100)";
            }
            bannersc[now].style.zIndex=3;
            bannersc[next].style.zIndex=1;
            animate(bannersc[now],{opacity:0},200);
            lis[next].className="hot";
            lis[now].className="";
            now=next;
        }
        function moveL(){
            next--;
            if(next<0){
                next=bannersc.length-1;
            }
            for(var i=0;i<bannersc.length;i++){
                if(i==now){continue;}
                bannersc[i].style.zIndex=0;
                bannersc[i].style.opacity=1;
                bannersc[i].style.filter="alpha(opacity=100)";
            }
            bannersc[now].style.zIndex=3;
            bannersc[next].style.zIndex=1;
            animate(bannersc[now],{opacity:0},200);
            lis[next].className="hot";
            lis[now].className="";
            now=next;
        }
        //开始和停止
        obj.onmouseover=function(){
            clearInterval(t);
        }
        obj.onmouseout=function(){
            t=setInterval(move,4000);
        }
        //左右选项卡
        left.onclick=function(){
            moveL();
        }
        right.onclick=function(){
            move();
        }
        //底部选项卡
        for(var i=0;i<lis.length;i++){
            lis[i].index=i;
            lis[i].onmouseover=function(){
                if(this.index==now){
                    return;
                }
                next=this.index;
                for(var i=0;i<bannersc.length;i++){
	                if(i==now){continue;}
	                bannersc[i].style.zIndex=0;
	                bannersc[i].style.opacity=1;
                    bannersc[i].style.filter="alpha(opacity=100)";
	            }
	            bannersc[now].style.zIndex=3;
	            bannersc[next].style.zIndex=1;
	            animate(bannersc[now],{opacity:0},200);
	            lis[next].className="hot";
	            lis[now].className="";
	            now=next;
            }
        }
    }
    //banner图轮播
    var bannerNTC=$(".bannerNTC")[0];
    opcTab(bannerNTC);
    //banner图右侧
    var banner_right=$(".bannerNTRmBox")[0];
    var banner_rights=$(".bannerNTRms",banner_right);
    var banner_box=$(".bannerNTRmBox2Big")[0];
    var banner_flag=true;
    var banner_close=$(".banner-close",banner_box)[0];
    var banner_boxs=$(".bannerNTRmBox2",banner_box);
    for(var i=0;i<banner_boxs.length;i++){
        banner_change(banner_boxs[i]);
    }
    for(var i=0;i<4;i++){
        banner_rights[i].index=i;
        hover(banner_rights[i],function(){
            for(var j=0;j<4;j++){
                banner_rights[j].style.borderTop="none";
                banner_rights[j].style.borderBottom="1px solid #e8e8e7";
                banner_rights[j].style.lineHeight="25px";
                banner_boxs[j].style.display="none";
            }
            this.style.borderTop="2px solid #c81623";
            this.style.borderBottom="none";
            this.style.lineHeight="21px";
            banner_boxs[this.index].style.display="block";
            if(banner_flag){
                banner_flag=false;
                animate(banner_box,{top:70},200,function(){
                    animate(banner_rights[0],{paddingTop:0},200);
                    animate(banner_rights[1],{paddingTop:0},200);
                    animate(banner_rights[2],{paddingTop:0},200);
                    animate(banner_rights[3],{paddingTop:0},200);
                    animate(banner_box,{top:26},200)
                })
            }
        },function(){
            
        })
    }
    //关闭
    banner_close.onclick=function(){
        animate(banner_rights[0],{paddingTop:44},200);
        animate(banner_rights[1],{paddingTop:44},200);
        animate(banner_rights[2],{paddingTop:44},200);
        animate(banner_rights[3],{paddingTop:44},200);
        animate(banner_box,{top:70},200,function(){
            animate(banner_box,{top:207},200);
            banner_flag=true;
        })
        for(var j=0;j<4;j++){
            banner_rights[j].style.borderTop="none";
            banner_rights[j].style.borderBottom="1px solid #e8e8e7";
            banner_rights[j].style.lineHeight="25px";
        }
    }
    //封装每块区域的初始化和变换
    function banner_change(obj){
        var changes=$(".bannerNTRmBox2B",obj);
        var title=$(".bannerNTRmBox2T",obj)[0];
        var titles=$("a",title);
        //初始化
        for (var i = 1; i<changes.length; i++) {
            changes[i].style.display="none";
        }
        //转换
        for(var j=0;j<titles.length;j++){
            titles[j].index=j;
            titles[j].onmouseover=function(){
                for (var i =0; i <changes.length; i++) {
                    changes[i].style.display="none";
                    titles[i].className="";
                };
                changes[this.index].style.display="block";
                this.className="bannerNTRmBox2Thover";
            }
        }
    }
    //封装banner图下方的选项卡
    function tabTrade(obj){
        var imgs=$(".bannerNBRs",obj);
        var left=$(".bannershang",obj)[0];
        var right=$(".bannerxia",obj)[0];
        var now=0;
        var next=0;
        var flag=true;
        //初始化
        var tabwm=parseInt(getStyle(imgs[0],"width"));
        for(var i=0;i<imgs.length;i++){
            if(i==0){
                continue;
            }
            imgs[i].style.left=tabwm+"px";
        }
        left.onclick=function(){
            if(flag){
                next=now-1;
                flag=false;
                if(next<0){
                    next=imgs.length-1;
                }
                for(var i=0;i<imgs.length;i++){
                    if(i==now){
                        continue;
                    }
                    imgs[i].style.left=-tabwm+"px";
                }
                animate(imgs[next],{left:0});
                animate(imgs[now],{left:tabwm},function(){
                    flag=true;
                });
                now=next;
            }
        }
        right.onclick=function(){
            if(flag){
                next=now+1;
                flag=false;
                if(next==imgs.length){
                    next=0;
                }
                for(var i=0;i<imgs.length;i++){
                    if(i==now){
                        continue;
                    }
                    imgs[i].style.left=tabwm+"px";
                }
                animate(imgs[next],{left:0});
                animate(imgs[now],{left:-tabwm},function(){
                    flag=true;
                });
                now=next;
            }
        }
    }
    //banner图下方的选项卡
    var bannerNBR=$(".bannerNBR")[0];
    tabTrade(bannerNBR);
    //猜你喜欢
    var like=$(".like")[0];
    var likeN=$(".likeN")[0];
    var p=$("p",likeN)[0];
    var change=$(".likeTitR",like)[0];
    var likeNwm=parseInt(getStyle(likeN,"width"));
    var pwm=parseInt(getStyle(p,"width"));
    var likeNs=$(".likeN1",likeN);
    var now=0;
    var next=0;
    //初始化
    for(var i=0;i<likeNs.length;i++){
        likeNs[i].style.zIndex=0;
    }
    likeNs[0].style.zIndex=3;
    hover(like,function(){
            p.style.left=0;
            animate(p,{left:likeNwm-pwm});
        },function(){
            p.style.left=likeNwm-pwm+"px";
        })
    change.onclick=function(){
        next=now+1;
        if(next==likeNs.length){
            next=0;
        }
        for(var i=0;i<likeNs.length;i++){
            likeNs[i].style.zIndex=0;
        }
        likeNs[next].style.zIndex=3;
        now=next;
    }
    //封装商品区页面变换
    function selt(obj){
        var tradetit3=$(".tradetit3",obj)[0];
    	var llis=$("li",tradetit3);
    	var spans=$("span",tradetit3);
    	var slwm=[];
        var tradeTRs=$(".tradeTRs",obj);
    	//初始化
    	for(var i=0;i<llis.length;i++){
            llis[i].style.width=getStyle(llis[i],"width");
            slwm.push(llis[i].offsetWidth);
    	}
    	spans[0].className="tithot";
    	spans[0].style.width=slwm[0]-1+"px";
    	for(var j=0;j<llis.length;j++){
    		llis[j].index=j;
    		llis[j].onmouseover=function(){
    			for(var i=0;i<llis.length;i++){
    				spans[i].className="";
    				spans[i].style.width="auto";
                    tradeTRs[i].style.display="none"
    			}
		    	spans[this.index].className="tithot";
		    	spans[this.index].style.width=slwm[this.index]-1+"px";
                tradeTRs[this.index].style.display="block" 
    		}
    	}
    }
    //调用
	var trades=$(".trade");
	for(var j=0;j<trades.length-1;j++){
		selt(trades[j]);
	}
    //封装商品区轮播图
    function tab(obj){
      var divs=$("div",obj);
      var lis=$("li",obj);
      var left=$(".bntL",obj)[0];
      var right=$(".bntR",obj)[0];
      var wm=parseInt(getStyle(obj,"width"));
      var now=0;
      var next=0;
      var flag=true;
      //初始化
      for(var i=0;i<divs.length;i++){
            if(i==0){
              continue;
            }
            divs[i].style.left=wm+"px";
          }
      lis[0].className="lli";
      function move(){
          next++;
          if(next==divs.length){
              next=0;
          }
          divs[next].style.left=wm+"px";
          animate(divs[now],{left:-wm});
          animate(divs[next],{left:0},function(){
              flag=true;
          });
          lis[now].className="";
          lis[next].className="lli";
          now=next;
      }
      function moveL(){
          next--;       
          if(next<0){
              next=divs.length-1;
          }
          divs[next].style.left=-wm+"px";
          animate(divs[now],{left:wm});
          animate(divs[next],{left:0});
          lis[now].className="";
          lis[next].className="lli";
          now=next;
      }
      //停止和轮播
      var t=setInterval(move,2500);
      obj.onmouseout=function(){
        t=setInterval(move,2500);
        left.style.zIndex=-1;
        right.style.zIndex=-1;
      }
      obj.onmouseover=function(){
        clearInterval(t);
        left.style.zIndex=5;
        right.style.zIndex=5;
      }
      //选项卡
      for(var i=0;i<lis.length;i++){
          lis[i].index=i;
          lis[i].onclick=function(){
            if(parseInt(getStyle(divs[next],"left"))==0){
              next=this.index;
              lis[now].className="";
              lis[next].className="lli";
              if(now>this.index){
                divs[next].style.left=-wm+"px";
                animate(divs[now],{left:wm});
                animate(divs[next],{left:0});
              }else if(now<this.index){
                divs[next].style.left=wm+"px";
                animate(divs[now],{left:-wm});
                animate(divs[next],{left:0});
              }
              now=next;
            }
          }
      }
      //左右选项卡
      //上页
      left.onclick=function(){
        if(parseInt(getStyle(divs[next],"left"))==0){
            moveL();
        }
      }
        //下页
        right.onclick=function(){
        if(flag){   
          move();
          flag=false;
        }
      }
    }
    var tradeRoll=$(".tradeRoll");
    for(var j=0;j<tradeRoll.length;j++){
        tab(tradeRoll[j]);
    }
    //封装热门晒单轮播
    function priceTab(obj,num){
    	num=num||1;
    	var Big=$(".priceRBsBig",obj)[0];
    	var pt=setInterval(pmove,2000);
		var pflag=true;
		var pS=$(".priceRBsmall",obj);
		var pmw=parseInt(getStyle(pS[0],"height"))+parseInt(getStyle(pS[0],"margin-bottom"));
		function pmove(){
			for(var i=0;i<num;i++){
				var first=firstChild(Big);
				var last=lastChild(Big);
				Big.insertBefore(last,first);
			}
			Big.style.top=-num*pmw+"px";
			animate(Big,{top:0})
		}
		//开始和停止
	    obj.onmouseover=function(){
		    clearInterval(pt);
        }
        obj.onmouseout=function(){
		    pt=setInterval(pmove,2000);
        }
    }
    //调用
    var priceR=$(".priceR")[0];
    priceTab(priceR);
    //左侧导航
    var sideL=$(".sideL")[0];
    var sides=$("a",sideL);
    var sideFlag=true;
    var titbox=$(".tradetit12box");
    for(var i=0;i<trades.length;i++){
        trades[i].hh=trades[i].offsetTop;
    }
    var body=$("body")[0];
    window.onscroll=function(){
        var obj=document.documentElement.scrollTop?document.documentElement:document.body;
        var bodyh=body.offsetHeight;
        if(obj.scrollTop>=trades[0].hh-700&&obj.scrollTop<bodyh-1000){
            sideL.style.display="block";
        }else{
            sideL.style.display="none";
        }
        if(sideFlag){
          for(var i=0;i<sides.length;i++){
            if(i<sides.length&&obj.scrollTop>trades[i].hh-280){
                for(var j=0;j<sides.length;j++){
                    $(".sideLName",sides[j])[0].style.display="none";
                    $(".sideLNum",sides[j])[0].style.display="block";
                }
                $(".sideLName",sides[i])[0].style.display="block";
                $(".sideLNum",sides[i])[0].style.display="none";
                animate(titbox[i],{height:36});
            }else{
                titbox[i].style.height="0px";
            }
            if(obj.scrollTop<trades[0].hh-300){
                $(".sideLName",sides[0])[0].style.display="none";
                $(".sideLNum",sides[0])[0].style.display="block";
                titbox[0].style.height="0px";
            }
          }
        }
    }
    //左侧导航点击事件
    for(var i=0;i<sides.length;i++){
        sides[i].index=i;
        sides[i].onclick=function(){
            sideFlag=false;
            var obj=document.documentElement.scrollTop?document.documentElement:document.body;
            animate(obj,{scrollTop:trades[this.index].hh-160},function(){
                sideFlag=true;
            });
        }
    }
    //右侧导航
    var sidelis=$("li",$(".sideRB")[0]);
    for(var i=0;i<sidelis.length;i++){
        sidelis[i].index=i;
        sidelis[i].onmouseover=function(){
            this.style.backgroundColor="#c81623";
            animate($("span",this)[0],{left:-60},200);
        }
        sidelis[i].onmouseout=function(){
            var that=this.index;
            animate($("span",this)[0],{left:0},200,function(){
               sidelis[that].style.backgroundColor="#7a6e6e";
            })
        }
    }
}