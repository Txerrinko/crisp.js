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
	button.innerHTML = (args.innerHTML) ? args.innerHTML : 'hello<br>world';
	button.className = 'button';
	
	//2. Style with args / defaults
	var width = (args.width) ? args.width : '';
	var height = (args.height) ? args.height : '';
	var color = (args.color) ? args.color : 'white';
	var bgColor = (args.bgColor) ? args.bgColor : '#56ba4a';
	var fontSize = (args.fontSize) ? args.fontSize : '24px'; 
	var fontFamily = (args.fontFamily) ? args.fontFamily : "'Amaranth', sans-serif"; 
	var paddingSides = (args.width) ? '' : '5px';
	var paddingTop = (args.height) ? '' : '5px';
	button.style.cssText = "display: inline-block;"
		+"background: "+bgColor+";"
		+"color: "+color+";"
		+"font-size: "+fontSize+";"
		+"height: "+height+";"
		+"width: "+width+";"
		+"margin:5px;"
		+"padding-left:"+paddingSides+";"
		+"padding-right:"+paddingSides+";"
		+"padding-top:"+paddingTop+";"
		+"padding-bottom:"+paddingTop+";"
		+"line-height:"+height+";text-align: center;text-decoration: none;cursor:hand;cursor:pointer;"
		+"overflow:hidden;text-shadow: 1px 1px 1px #59a24f;position:relative;border-radius: 5px;"
		+"font-family: "+fontFamily+";-moz-user-select: none;-khtml-user-select: none;top:0px;left:0px;"
	   	+"user-select: none;box-shadow: 2px 2px 2px rgba(0,0,0,0.5);";
	//3. Listen, and  add to DOM if domNode provided
	button.setAttribute("down", "false");
	button.addEventListener('mousedown',onMouseDown);
	button.addEventListener('mouseup',onMouseUp);
	button.addEventListener('mouseout',onMouseOut);
	if(args.domNode)
		args.domNode.appendChild(button);
		
	return button;
}
function onMouseOut(e){
	if(e.target.getAttribute('down') == 'true')
		onMouseUp(e);
}

function onMouseDown(e){
	if(e.target.getAttribute('down') == 'false'){
		e.target.setAttribute("down", "true");
		e.target.down = 'true';
		e.target.style.boxShadow = '';
		var numTop = parseInt(e.target.style.top.replace('px',''))+1;
		var numLeft = parseInt(e.target.style.left.replace('px',''))+1;
		e.target.style.top = numTop.toString()+'px';
		e.target.style.left = numLeft.toString()+'px';
	}
}

function onMouseUp(e){
	if(e.target.getAttribute('down') == 'true'){
		e.target.setAttribute("down", "false");
		e.target.down = 'false';
		var numTop = parseInt(e.target.style.top.replace('px',''))-1;
		var numLeft = parseInt(e.target.style.left.replace('px',''))-1;
		e.target.style.top = numTop.toString()+'px';
		e.target.style.left = numLeft.toString()+'px';
		e.target.style.boxShadow = '2px 2px 2px rgba(0,0,0,0.5)';	
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