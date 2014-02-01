// JavaScript Document
var box={
status:{b:[
	{id:"zh-en",state:["zh","en","cap"]},
	{id:"half-full",state:["half-shape","full-shape"]},
	{id:"punctuation",state:["zh","en"]},
	{id:"menu",state:["0"]},
	{id:"feedback",state:["0"]}
]},
rich:{},
input:{w:[
	{id:"composition",font:["en","zh"]},
	{id:"candidate",font:["default","highlight"]}
],b:[
	{id:"pageup"},
	{id:"pagedown"},
	{id:"bingbtn"},
	{id:"custom0"}
]}
};
function addbox(box){//构建皮肤框架
	var st = document.getElementById("stage");
	//状态框
	d0 = document.createElement('div');
	d0.id = "status";
	d0.className = "window";
		d1 = document.createElement('div');
		d1.className = "background";
		//d1.innerHTML = "background";
		d0.appendChild(d1);
	for (i1=0;i1<box.status.b.length;i1++){
		d1 = document.createElement('div');
		d1.className = box.status.b[i1].id;
		//d1.innerHTML = box.status.b[i1].id;
		d0.appendChild(d1);
	}
	st.appendChild(d0);
	//输入框
	var input_windows = ["horizontal","vertical"]
	for(var i0 in input_windows){
		d0 = document.createElement('div');
		d0.id = "input-" + input_windows[i0];
		d0.className = "window";
			d1 = document.createElement('div');
			d1.className = "background";
			//d1.innerHTML = "background";
			d0.appendChild(d1);
			
			d2 = document.createElement('div');
			d2.className = 'inputtext';
		for (i1=0;i1<box.input.w.length;i1++){
			d1 = document.createElement('div');
			d1.className = box.input.w[i1].id;
			//d1.innerHTML = box.input.w[i1].id;
			d2.appendChild(d1);
		}
			d0.appendChild(d2);
			
/*		for (i1=0;i1<box.input.b.length;i1++){
			d1 = document.createElement('div');
			d1.className = box.input.b[i1].id;
			//d1.innerHTML = box.input.b[i1].id;
			d0.appendChild(d1);
		}*/
		st.appendChild(d0);
	}
}
//添加CSS
function addCssRule(filter, cssText) {
    var styleSheet = document.styleSheets[1];
    if (styleSheet.addRule) {
        styleSheet.addRule(filter, cssText);
    } else {
        styleSheet.insertRule(filter+"{" + cssText + "}", styleSheet.cssRules.length);
    }
}
function cbg(css){//custombackground
	document.body.style.background = css;
}
function load(patht){
	document.getElementById("stage").innerHTML='';//清除老东西
	document.getElementById('customcss').innerHTML = '';//清除css
	addbox(box);//添加框架

	//var obj = document.getElementById(objid);
	//var skinxml = document.getElementById(skinxmlid);
	var xmlFileName="skin.xml";
	if(patht.length > 0 && patht.lastIndexOf("\\") != patht.length - 1)
		patht += "/"
	xmlpath = patht + xmlFileName;
	xmlurl = PathToUrl(xmlpath);
		
	//xmlDoc = loadXMLDocTxt(skinxml);
	xmlDoc = loadXMLDoc(xmlpath);
	refreshskin(patht,xmlDoc);
}
function refreshskin(patht,xmlDoc){
	//获取xml内的框架
	var cfg = xmlDoc.getElementsByTagName("skin")[0];
	var sta = xmlDoc.getElementsByTagName("status-window")[0];
	var inp = xmlDoc.getElementsByTagName("input-window")[0];
	//状态BG
	var bgimgfn = sta.getElementsByTagName("background")[0].getElementsByTagName("stretchable-image")[0].getAttribute("source");
	var stabgimg = document.getElementById("status").getElementsByClassName("background").item(0);
	setSbgCSS(stabgimg,PathToUrl(patht + bgimgfn));
	//状态按钮
	var bgimg = sta.getElementsByTagName("toggle-button");
	for(i0=0;i0<bgimg.length;i0++){
		if(bgimg[i0].getAttribute("visibility") != true)continue;
		var stabgimg = document.getElementById("status").getElementsByClassName(bgimg[i0].getAttribute("id")).item(0);
		setSBbgCSS(stabgimg,bgimg[i0].getElementsByTagName("state")[0],patht);
		var position = bgimg[i0].getAttribute("position");
		pos = position.split(",");
		stabgimg.style.left = pos[0] + "px";
		stabgimg.style.top = pos[1] + "px";
	}
	
	//输入框
	for(i1=0;i1<2;i1++){
		//输入BG
		var bgimgfn = inp.getElementsByTagName("background")[0].getElementsByTagName("stretchable-image")[0].getAttribute("source");
		//第一个横板，i1 = 0则为false，第二个值
		var idname =['input-horizontal','input-vertical'];
		var stabgimg = document.getElementById(idname[i1]).getElementsByClassName("background").item(0);
		
		
		//输入框
		var comw = inp.getElementsByTagName("composition-window")[0];
		var comd = document.getElementById(idname[i1]).getElementsByClassName("composition").item(0);
		comd.innerHTML = '<span class="compositionword zhword">'+document.getElementById('composition_text').value.replace(/([A-Za-z']+)/,'<span class="compositionword enword">$1</span>')+'</span>';
		var styletemp = '';
		var comwp = comw.getAttribute("padding").split(',');
		
		var comwf = comw.getElementsByTagName("font");
		var font_size = 14;
		var font_family_en = 'Arial';
		var font_family_zh = '宋体';
		var font_color_en = '0,0,0';
		var font_color_zh = '0,0,0';
		for(i2=0;i2<comwf.length;i2++){
			if(comwf[i2].getAttribute("id")=='zh'){
				font_size = parseInt(comwf[i2].getAttribute("size"));
				font_family_zh = comwf[i2].getAttribute("family");
				font_color_zh = comwf[i2].getAttribute("color");
			}else{
				font_family_en = comwf[i2].getAttribute("family");
				font_color_en = comwf[i2].getAttribute("color");
			}
		}
		styletemp+='font-size:'+font_size+'px;\r\n';
		styletemp+='padding:'+comwp[1]+'px '+comwp[2]+'px '+comwp[3]+'px '+comwp[0]+'px;\r\n';
		addCssRule('#'+document.getElementById(idname[i1]).id+' .composition', styletemp);
		styletemp='color:rgb('+font_color_en+');\r\n';
		styletemp+='font-family:'+font_family_en+';\r\n';
		addCssRule('#'+document.getElementById(idname[i1]).id+' .composition .enword', styletemp);
		styletemp='color:rgb('+font_color_zh+');\r\n';
		styletemp+='font-family:'+font_family_zh+';\r\n';
		addCssRule('#'+document.getElementById(idname[i1]).id+' .composition .zhword', styletemp);
		
		//候选框
		var canw = inp.getElementsByTagName("candidate-window")[0];
		var cand = document.getElementById(idname[i1]).getElementsByClassName("candidate").item(0);
		var houxuanci = document.getElementById('candidate_text').value.split('\n');
		var hxtxt = '';
		for(i2=0;i2<houxuanci.length;i2++){
			if(i2==0){hxtxt +='<span class="candidateword highlight">';}else{hxtxt +='<span class="candidateword default">';}
			hxtxt += (i2+1)+'.'+houxuanci[i2];
			hxtxt +='</span>';
			if (i1==0){
			}else{
				if (i2<houxuanci.length-1)hxtxt += '<br />';
			}
		}
		cand.innerHTML = hxtxt;
		var styletemp = '';
		var canwp = canw.getAttribute("padding").split(',');
		
		var canwf = canw.getElementsByTagName("font");
		var font_color_default = '0,0,0';
		var font_color_highlight = '0,114,198';
		for(i2=0;i2<canwf.length;i2++){
			if(canwf[i2].getAttribute("id")=='default'){
				font_color_default = canwf[i2].getAttribute("color");
			}else{
				font_color_highlight = canwf[i2].getAttribute("color");
			}
		}
		
		styletemp+='font-size:'+font_size+'px;\r\n';
		styletemp+='font-family:'+font_family_zh+';\r\n';
		styletemp+='padding:'+canwp[1]+'px '+canwp[2]+'px '+canwp[3]+'px '+canwp[0]+'px;\r\n';
		addCssRule('#'+document.getElementById(idname[i1]).id+' .candidate', styletemp);
		styletemp='color:rgb('+font_color_default+');\r\n';
		addCssRule('#'+document.getElementById(idname[i1]).id+' .candidate .default', styletemp);
		styletemp='color:rgb('+font_color_highlight+');\r\n';
		addCssRule('#'+document.getElementById(idname[i1]).id+' .candidate .highlight', styletemp);

		var stabgimg = document.getElementById(idname[i1]).getElementsByClassName("background").item(0);
		var inputw_w = document.getElementById(idname[i1]).getElementsByClassName('inputtext').item(0).offsetWidth;
		var inputw_h = document.getElementById(idname[i1]).getElementsByClassName('inputtext').item(0).offsetHeight;
		
		//输入按钮
		var btimg = inp.getElementsByTagName("button");
		var button_width_size = 0;
		for(i0=0;i0<btimg.length;i0++){
			if( btimg[i0].getAttribute("visibility") == false)continue;
			var stabtimg = document.getElementById(idname[i1]); 
			var last_button_size = setIBbgCSS(stabtimg,btimg[i0],patht);
			var last_button_grid = btimg[i0].getElementsByTagName("alignment")[0].getAttribute("grid-position");
			
			if(last_button_grid == 'right'){
				if(last_button_size[0]>button_width_size)button_width_size=last_button_size[0];
				//stabtimg.getElementsByClassName(btimg[i0].getAttribute("id")).item(0).style.right = (-last_button_size[0])+'px';
			}
			var last_button_grid = '';
			var last_button_size = new Array(0,0);
		}
		inputw_w +=button_width_size;
		setIbgCSS(stabgimg,inp.getElementsByTagName("background")[0].getElementsByTagName("stretchable-image")[0],patht,i1,inputw_w,inputw_h);
		
	}

	return;
}

function PathToUrl(path){
	return path;
	path = path.replace(/\\/g,"/");
	path = path.replace(/:/,"|");
	if (path.indexOf("file|")==0)
		path = path.replace(/^file\|/g,"file:");
	if (path.indexOf("file:")!=0)
		path = "file:///" + path;
	return path;
}
function setSbgCSS(divdom,imgsrc){//将图片设为该div的背景并把div也改成那么大
	var imgte = new Image();
	imgte.src = imgsrc;
	imgte.onload = function(e){
		var styletemp = '';
		styletemp+='width:'+this.width + 'px;\r\n';
		styletemp+='height:'+this.height + 'px;\r\n';
		addCssRule('#'+divdom.parentNode.id, styletemp);
		var styletemp = '';
		styletemp+='background:url('+imgsrc+') no-repeat;\r\n';
		styletemp+='width:'+this.width+'px;\r\n';
		styletemp+='height:'+this.height+'px;\r\n';
		addCssRule('#'+divdom.parentNode.id+' .'+divdom.className, styletemp);
	}
}
function setSBbgCSS(divdom,imgdom,path){//将图片设为该div的背景并把div也改成那么大，css模式
	var bgimgfn = imgdom.getAttribute("default")!=null?imgdom.getAttribute("default"):'';
	var bgimgfn_h = imgdom.getAttribute("hover")!=null?imgdom.getAttribute("hover"):'';
	var bgimgfn_d = imgdom.getAttribute("down")!=null?imgdom.getAttribute("down"):'';
	var bgimgfn_e = imgdom.getAttribute("enter")!=null?imgdom.getAttribute("enter"):'';
	var bgimgfn_l = imgdom.getAttribute("leave")!=null?imgdom.getAttribute("leave"):'';
	var imgte = new Image();
	imgte.src = PathToUrl(path + bgimgfn);
	imgte.onload = function(e){
		var styletemp = '';
		styletemp+='background:url('+PathToUrl(path + bgimgfn)+') no-repeat;\r\n';
		styletemp+='width:'+this.width+'px;\r\n';
		styletemp+='height:'+this.height+'px;\r\n';
		addCssRule('#'+divdom.parentNode.id+' .'+divdom.className, styletemp);
		if(bgimgfn_h.length>0){
			addCssRule('#'+divdom.parentNode.id+' .'+divdom.className+':hover', 'background:url('+PathToUrl(path + bgimgfn_h)+') no-repeat;\r\n');
		}else if(bgimgfn_e.length>0){
			addCssRule('#'+divdom.parentNode.id+' .'+divdom.className+':hover', 'background:url('+PathToUrl(path + bgimgfn_e)+') no-repeat;\r\n');
		}
		if(bgimgfn_d.length>0){
			addCssRule('#'+divdom.parentNode.id+' .'+divdom.className+':active', 'background:url('+PathToUrl(path + bgimgfn_d)+') no-repeat;\r\n');
		}
	}
}
function setIBbgCSS(divpdom,imgdom,path){//将图片设为该div的背景并把div也改成那么大，css模式
	var divdom = document.createElement('div');
	divdom.className = imgdom.getAttribute("id");
	
	var imgdoms0 =imgdom.getElementsByTagName("state")[0];
	var imgdomam =imgdom.getElementsByTagName("alignment")[0];
	
	var bgimgfn = imgdoms0.getAttribute("default")!=null?imgdoms0.getAttribute("default"):'';
	var bgimgfn_h = imgdoms0.getAttribute("hover")!=null?imgdoms0.getAttribute("hover"):'';
	var bgimgfn_d = imgdoms0.getAttribute("down")!=null?imgdoms0.getAttribute("down"):'';
	var bgimgfn_e = imgdoms0.getAttribute("enter")!=null?imgdoms0.getAttribute("enter"):'';
	var bgimgfn_l = imgdoms0.getAttribute("leave")!=null?imgdoms0.getAttribute("leave"):'';
	
	var grid = imgdomam.getAttribute("grid-position");
	var margin = imgdomam.getAttribute("margin").split(",");
	var horizontal = imgdomam.getAttribute("horizontal-alignment");
	var vertical = imgdomam.getAttribute("vertical-alignment");
	var relative = imgdomam.getAttribute("relative-window");
	
	if(relative=='input-window'){
		var bp = divpdom.getElementsByClassName("inputtext")[0];
		var bphorizontal = document.getElementById('input-horizontal').getElementsByClassName("inputtext")[0];
	}else if(relative=='composition-window'){
		var bp = divpdom.getElementsByClassName("composition")[0];
		var bphorizontal = document.getElementById('input-horizontal').getElementsByClassName("composition")[0];
	}else if(relative=='candidate-window'){
		var bp = divpdom.getElementsByClassName("candidate")[0];
		var bphorizontal = document.getElementById('input-horizontal').getElementsByClassName("candidate")[0];
	}else{
		alert(imgdom.getAttribute("id")+'按钮的relative-window有错误');
	}
	divpdom.appendChild(divdom);
	
	var imgte = new Image();
	imgte.src = PathToUrl(path + bgimgfn);
	//imgte.onload = function(e){
		var styletemp = '';
		styletemp+='background:url('+PathToUrl(path + bgimgfn)+') no-repeat;\r\n';
		styletemp+='width:'+imgte.width+'px;\r\n';
		styletemp+='height:'+imgte.height+'px;\r\n';
		
		
		if (horizontal=='left'){styletemp+='left:'+bp.offsetLeft+'px;\r\n';}
		else if (horizontal=='right'){styletemp+='right:'+0+'px;\r\n';}
		else if (horizontal=='center'){styletemp+='left:'+(bp.offsetLeft+(bphorizontal.offsetWidth-imgte.width)/2)+'px;\r\n';
		alert(imgdom.getAttribute("id") + '：horizontal为center将会导致必应输入法无法显示该按钮');}
		else{alert(imgdom.getAttribute("id") + '：horizontal设置错误');}
		
		if (vertical=='top'){styletemp+='top:'+bp.offsetTop+'px;\r\n';}
		else if (vertical=='bottom'){styletemp+='bottom:'+0+'px;\r\n';}
		else if (vertical=='middle'){styletemp+='top:'+(bp.offsetTop+(bphorizontal.offsetHeight-imgte.height)/2)+'px;\r\n';}
		else{alert(imgdom.getAttribute("id") + '：vertical设置错误');}
		
		styletemp+='margin:'+margin[1]+'px '+margin[2]+'px '+margin[3]+'px '+margin[0]+'px;\r\n';
		styletemp+='position: absolute;\r\n';
		//styletemp+='float:right;\r\n';
		addCssRule('#'+divpdom.id+' .'+divdom.className, styletemp);
		if(bgimgfn_h.length>0){
			addCssRule('#'+divpdom.id+' .'+divdom.className+':hover', 'background:url('+PathToUrl(path + bgimgfn_h)+') no-repeat;\r\n');
		}else if(bgimgfn_e.length>0){
			addCssRule('#'+divpdom.id+' .'+divdom.className+':hover', 'background:url('+PathToUrl(path + bgimgfn_e)+') no-repeat;\r\n');
		}
		if(bgimgfn_d.length>0){
			addCssRule('#'+divpdom.id+' .'+divdom.className+':active', 'background:url('+PathToUrl(path + bgimgfn_d)+') no-repeat;\r\n');
		}
	//}
	return new Array((imgte.width+parseInt(margin[2])), imgte.height);
}
function setIbgCSS(divdom,imgdom,path,mode,dwidth,dheight){//将图片设为该div的背景并把div也改成那么大
	var bgimgfn = imgdom.getAttribute("source");
	
	var bgimghst = imgdom.getAttribute("horizontal-stretch-type");
	if(bgimghst=='tile'){var hst=0;}
	else if(bgimghst=='fixed-range-stretch'){var hst=1;}
	var hsp = imgdom.getAttribute("horizontal-stretch-param").split(",");
	hsp[0]=parseInt(hsp[0]);
	hsp[1]=parseInt(hsp[1]);
	
	var bgimgvst = imgdom.getAttribute("vertical-stretch-type");
	if(bgimgvst=='tile'){var vst=0;}
	else if(bgimgvst=='fixed-range-stretch'){var vst=1;}
	
	var vsp = imgdom.getAttribute("vertical-stretch-param").split(",");
	vsp[0]=parseInt(vsp[0]);
	vsp[1]=parseInt(vsp[1]);
	
	var imgte = new Image();
	imgte.src = PathToUrl(path + bgimgfn);
	imgte.onload = function(e){
		if(this.width>dwidth)dwidth=this.width;
		if(this.height>dheight)dheight=this.height;
		addCssRule('#'+divdom.parentNode.id, 'width:'+dwidth + 'px;\r\nheight:'+dheight + 'px;');
		addCssRule('#'+divdom.parentNode.id + ' .background div', 'position:relative;');
		if(hsp[0]+hsp[1]<this.width){
			var inw = this.width - (hsp[0]+hsp[1]);
			if(hst){ //拉伸
				var hdnum = 3;
			}else{
				var hdnum = Math.ceil( (dwidth-(hsp[0]+hsp[1]))/inw +2 );
			}
		}else{
			alert('横向边界值大于等于图片宽度');
			return;
		}
		if(vsp[0]+vsp[1]<this.height){
			var inh = this.height - (vsp[0]+vsp[1]);
			if(vst){ //拉伸
				var vdnum = 3;
			}else{
				var vdnum = Math.ceil( (dheight-(vsp[0]+vsp[1]))/inh +2 );
			}
		}else{
			alert('竖直边界值大于等于图片高度');
			return;
		}
var imgtable = {
	row:{
		start:{cssname:'browStart'+mode,css:vsp[0]},
		end:{cssname:'browEnd'+mode,css:vsp[1]},
		last:{cssname:'browLast'+mode,css:(dheight-(vsp[0]+vsp[1])-(vdnum-3)*inh)},
		inter:{cssname:'browInter'+mode,css:inh}
	},
	col:{
		start:{cssname:'bcolStart'+mode,css:hsp[0]},
		end:{cssname:'bcolEnd'+mode,css:hsp[1]},
		last:{cssname:'bcolLast'+mode,css:(dwidth-(hsp[0]+hsp[1])-(hdnum-3)*inw)},
		inter:{cssname:'bcolInter'+mode,css:inw}
	}
};
		for(var item0 in imgtable){
			for(var item1 in imgtable[item0]){
				if(item0=='row')crname='height';
				else if(item0=='col')crname='width';
				addCssRule('#'+divdom.parentNode.id+' .'+imgtable[item0][item1].cssname,crname+':'+imgtable[item0][item1].css+'px;');
			}
		}

		for(var item0 in imgtable.row){
			for(var item1 in imgtable.col){
				var posx;var posy;
				var sizex;var sizey;
				var bgpositioncss = '';
				if(item1=='start'){//第一个
					posx = 0;
					sizex = this.width;
				}else if(item1=='end'){//最后一个
					posx = this.width-hsp[1];
					sizex = this.width;
				}else if(item1=='last'){//末二拉伸
					var xtimes = imgtable.col['last'].css/imgtable.col['inter'].css;
					posx = hsp[0]*xtimes;
					sizex = this.width*xtimes;
				}else{
					posx = hsp[0];
					sizex = this.width;
				}
				if(item0=='start'){//第一个
					posy = 0;
					sizey = this.height;
				}else if(item0=='end'){//最后一个
					posy = this.height-vsp[1];
					sizey = this.height;
				}else if(item0=='last'){//末二拉伸
					var ytimes = imgtable.row['last'].css/imgtable.row['inter'].css;
					posy = vsp[0]*ytimes;
					sizey = this.height*ytimes;
				}else{
					posy = vsp[0];
					sizey = this.height;
				}
				bgpositioncss += 'background-position:'+(-posx)+'px '+(-posy)+'px;\r\nbackground-size:'+sizex+'px '+sizey+'px;';
				addCssRule('#'+divdom.parentNode.id+' .pos_'+imgtable.row[item0].cssname+'_'+imgtable.col[item1].cssname,bgpositioncss);
				//alert('.pos_'+imgtable.row[item0].cssname+'_'+imgtable.col[item1].cssname+'   '+bgpositioncss);
			}
		}

		for(ih=0;ih<vdnum;ih++){
			var hcssname = '';
			if(ih==0){//第一个
				hcssname = imgtable.row.start.cssname;
			}else if(ih==vdnum-1){//最后一个
				hcssname = imgtable.row.end.cssname;
			}else if(ih==vdnum-2){//末二拉伸
				hcssname = imgtable.row.last.cssname;
			}else{
				hcssname = imgtable.row.inter.cssname;
			}
			for(iv=0;iv<hdnum;iv++){
				var vcssname = '';
				if(iv==0){//第一个
					vcssname = imgtable.col.start.cssname;
				}else if(iv==hdnum-1){//最后一个
					vcssname = imgtable.col.end.cssname;
				}else if(iv==hdnum-2){//末二拉伸
					vcssname = imgtable.col.last.cssname;
				}else{
					vcssname = imgtable.col.inter.cssname;
				}
				var imgd = document.createElement('div');
				imgd.className = 'btd ' + hcssname + ' ' + vcssname + ' pos_'+hcssname+'_'+ vcssname;
				divdom.appendChild(imgd);
			}
		}
		
		var styletemp = '';
		styletemp+='background-image:url('+PathToUrl(path + bgimgfn)+');\r\nbackground-repeat:no-repeat;\r\nfloat:left;';
		addCssRule('.btd',styletemp);
		return;
		var styletemp = '';
		styletemp+='background:url('+PathToUrl(path + bgimgfn)+');\r\n';
		styletemp+='width:'+this.width+'px;\r\n';
		styletemp+='height:'+this.height+'px;\r\n';
		addCssRule('#'+divdom.parentNode.id+' .'+divdom.className, styletemp);
		if(bgimgfn_h.length>0){
			addCssRule('#'+divdom.parentNode.id+' .'+divdom.className+':hover', 'background:url('+PathToUrl(path + bgimgfn_h)+');\r\n');
		}else if(bgimgfn_e.length>0){
			addCssRule('#'+divdom.parentNode.id+' .'+divdom.className+':hover', 'background:url('+PathToUrl(path + bgimgfn_e)+');\r\n');
		}
		if(bgimgfn_d.length>0){
			addCssRule('#'+divdom.parentNode.id+' .'+divdom.className+':active', 'background:url('+PathToUrl(path + bgimgfn_d)+');\r\n');
		}
	}
}
