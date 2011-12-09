/**
* Crisp.js
* logicalcognition.com/crisp.js
* Paul Bouchon
*/
window.crisp = this;
this.loadStyles(['http://fonts.googleapis.com/css?family=Amaranth']);

/**
* Creates a button
*/
function create(args){
	if(!args)
		var args = {};
		
	//1. Build container
	var button = document.createElement('div');
	var text = document.createElement('div');
	text.innerHTML = (args.innerHTML) ? args.innerHTML : 'hello<br>world';
	button.className = 'button';
	
	//2. Style with args / defaults
	text.style.cssText = "display:table-cell;vertical-align:middle;";
	var width = (args.width) ? args.width : '';
	var height = (args.height) ? args.height : '';
	var color = (args.color) ? args.color : 'white';
	var bgColor = (args.bgColor) ? args.bgColor : '#56ba4a';
	var fontSize = (args.fontSize) ? args.fontSize : '24px'; 
	var fontFamily = (args.fontFamily) ? args.fontFamily : "'Amaranth', sans-serif"; 
	var padding = (args.padding) ? args.padding : '5px';
	button.style.cssText = ""
		+"background: "+bgColor+";"
		+"color: "+color+";"
		+"font-size: "+fontSize+";"
		+"height: "+height+";"
		+"width: "+width+";"
		+"margin:5px;"
		+"padding:"+padding+";"
		+"vertical-align:middle; display:inline-table;text-align: center;text-decoration: none;cursor:hand;cursor:pointer;"
		+"overflow:hidden;text-shadow: 1px 1px 1px #59a24f;position:relative;border-radius: 5px;"
		+"font-family: "+fontFamily+";-moz-user-select: none;-khtml-user-select: none;top:0px;left:0px;"
	   	+"user-select: none;box-shadow: 2px 2px 2px rgba(0,0,0,0.5);";
	//3. Listen, and  add to DOM if domNode provided
	button.appendChild(text);
	button.setAttribute("down", "false");
	text.addEventListener('mousedown',onMouseDown);
	text.addEventListener('mouseup',onMouseUp);
	text.addEventListener('mouseout',onMouseOut);
	if(args.domNode)
		args.domNode.appendChild(button);
		
	return button;
}
function onMouseOut(e){
	if(e.target.parentNode.getAttribute('down') == 'true')
		onMouseUp(e);
}

function onMouseDown(e){
	if(e.target.parentNode.getAttribute('down') == 'false'){
		e.target.parentNode.setAttribute("down", "true");
		e.target.parentNode.down = 'true';
		e.target.parentNode.style.boxShadow = '';
		var numTop = parseInt(e.target.parentNode.style.top.replace('px',''))+1;
		var numLeft = parseInt(e.target.parentNode.style.left.replace('px',''))+1;
		e.target.parentNode.style.top = numTop.toString()+'px';
		e.target.parentNode.style.left = numLeft.toString()+'px';
	}
}

function onMouseUp(e){
	if(e.target.parentNode.getAttribute('down') == 'true'){
		e.target.parentNode.setAttribute("down", "false");
		e.target.parentNode.down = 'false';
		var numTop = parseInt(e.target.parentNode.style.top.replace('px',''))-1;
		var numLeft = parseInt(e.target.parentNode.style.left.replace('px',''))-1;
		e.target.parentNode.style.top = numTop.toString()+'px';
		e.target.parentNode.style.left = numLeft.toString()+'px';
		e.target.parentNode.style.boxShadow = '2px 2px 2px rgba(0,0,0,0.5)';	
	}
}

function loadStyles(styles){
	for(var i in styles){
		var e = document.createElement("link");
	    e.href = styles[i];
	    e.type = "text/css";
	    e.rel = "stylesheet";
	    e.media = "screen";
	    document.getElementsByTagName("head")[0].appendChild(e);
	}
}