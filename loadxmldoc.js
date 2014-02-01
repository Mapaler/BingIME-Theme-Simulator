// JavaScript Document
function newXMLDoc(){
	var xmlDoc;
	if (window.ActiveXObject){ // IE   
		var activeXNameList=new Array("MSXML2.DOMDocument.6.0","MSXML2.DOMDocument.5.0","MSXML2.DOMDocument.4.0","MSXML2.DOMDocument.3.0","MSXML2.DOMDocument","Microsoft.XMLDOM","MSXML.DOMDocument");
		for(var h=0;h<activeXNameList.length;h++){
			try{
				xmlDoc=new ActiveXObject(activeXNameList[h]);
			}catch(e){
				continue;
			}
			if(xmlDoc) break;	
		}
	}else if(document.implementation && document.implementation.createDocument){ //非 IE
		xmlDoc=document.implementation.createDocument("","",null);	
	}else{
		alert('can not create XML DOM object, update your browser please...');
		return(null);
	}
	
	return xmlDoc;
}
function loadXMLDoc(url){
	var xmlDoc = new newXMLDoc();
	var xmlhttp;
	xmlhttp=null;
	if (window.XMLHttpRequest){// code for all new browsers
		xmlhttp=new XMLHttpRequest();
	}else if (window.ActiveXObject){// code for IE5 and IE6
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	if (xmlhttp!=null){
		xmlhttp.open("GET",url,false);
		xmlhttp.send(null);
		
		xmlDoc.async=false;
		//alert(xmlhttp.responseXML.getElementsByTagName("background")[0].innerHTML);
		xmlDoc = xmlhttp.responseXML;
		return(xmlDoc);
	}else{
		alert("Your browser does not support XMLHTTP.");
	}
}

function loadXMLDocTxt(dtxt){ 
	var xmlDoc = new newXMLDoc();
	try{
		if(window.DOMParser){
			xmlDocT = new DOMParser();
			xmlDoc=xmlDocT.parseFromString(dtxt,"text/xml");
		}else{
			xmlDoc.loadXML(dtxt)?xmlDoc:false;
		}
		return(xmlDoc);
	}
	catch(e) {alert(e.message)}
	return(null);
}