// JavaScript Documenttry{ 		

try{
 	document.addEventListener("MyAnswerEvent",function(e) { ExtensionAnswer(e); },false);

	var element;

	function start(act,para){
		//alert(document.getElementById('imapsec').value);

 		element = document.createElement("MyExtensionDataElement");
		element.setAttribute("user", document.getElementById('user').value);
		element.setAttribute("pass", document.getElementById('pass').value);
		element.setAttribute("smtp", document.getElementById('smtp').value);
		element.setAttribute("smtpport", document.getElementById('smtpport').value);
		element.setAttribute("smtpsec", document.getElementById('smtpsec').value);
		element.setAttribute("imap", document.getElementById('imap').value);
		element.setAttribute("imapport", document.getElementById('imapport').value);
		element.setAttribute("imapsec", document.getElementById('imapsec').value);
		element.setAttribute("body", document.getElementById('body').value);
		element.setAttribute("to", document.getElementById('to').value);		
		element.setAttribute("action",act);

		if(para){
			element.setAttribute("msgid",para);
		}

		document.documentElement.appendChild(element);
		var evt = document.createEvent("Events");
		evt.initEvent("MyExtensionEvent", true, false);
		element.dispatchEvent(evt);
 	}

	function ExtensionAnswer(EvtAnswer)
	{
	  //alert(element.getAttribute("attribute3") + " " + EvtAnswer.target.getAttribute("Part1"));
	  var type=EvtAnswer.target.getAttribute("type");
	  var val=EvtAnswer.target.getAttribute("value");
	  var txt=document.getElementById('text');
	  var tt=document.getElementById('body');
	  if(type=='mailids'){	  		  	
	  	try{
	  		var t=val.split('#');	  		
	  		var from=t[3].split("\r\n")[0].split(":")[1].trim()+"\n";
	  		var sub=t[3].split("\r\n")[1].split(":")[1].trim()+"\n";
	  		addRow(t[1],t[2],sub,from);  	
	  		//tt.value+="ruks";
	  	}catch(e){
	  		alert(e);
	  	}
	  	
	  }else if(type=='gotbody'){
	  	setBody(val);
	  }else{
	  	txt.value+=type+": "+val+"\n";
	  }
	}

 }catch(e){
 	alert(e);
 }

 function setSetting(){
 	var x = document.getElementById("setting").value;
 	if (x=='gmail') {
 		document.getElementById('user').value='unhostedcse@gmail.com';
		document.getElementById('pass').value='unhostedcse12345';
		document.getElementById('smtp').value='smtp.gmail.com';
		document.getElementById('smtpport').value='465';
		document.getElementById('imap').value='imap.gmail.com';
		document.getElementById('imapport').value='993';	
		document.getElementById('to').value='unhostedcse@gmail.com';	
 	}else if(x=='hotmail'){ 	
 		document.getElementById('user').value='unhostedcse@outlook.com';
		document.getElementById('pass').value='projects12345';
		document.getElementById('smtp').value='Smtp-mail.outlook.com';
		document.getElementById('smtpport').value='587';
		document.getElementById('imap').value='imap-mail.outlook.com';
		document.getElementById('imapport').value='993';		 	
		document.getElementById('to').value='unhostedcse@gmail.com';
 	}else if(x=='local'){ 	
 		document.getElementById('user').value='rukshan';
		document.getElementById('pass').value='17806';
		document.getElementById('smtp').value='localhost';
		document.getElementById('smtpport').value='25';
		document.getElementById('imap').value='localhost';
		document.getElementById('imapport').value='143';		 	
		document.getElementById('to').value='rukshan';
 	}else if(x=='unhosted'){ 	
 		document.getElementById('user').value='rukshan';
		document.getElementById('pass').value='rukshan17806';
		document.getElementById('smtp').value='unhosted.projects.uom.lk';
		document.getElementById('smtpport').value='25';
		document.getElementById('imap').value='unhosted.projects.uom.lk';
		document.getElementById('imapport').value='993';		 	
		document.getElementById('to').value='rukshan';
 	}	

 }

 function addRow(id,seen,sub,from){		 		
		var table = document.getElementById("myTable");
		var row = table.insertRow(1);
		row.className="nocolor";
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		cell1.innerHTML = id;
		cell2.innerHTML = seen;
		cell3.innerHTML = sub;
		cell4.innerHTML = from;		

		row.onclick=function(){
			//alert(id);
			start('getbody',id);
			var rows = table.getElementsByTagName("tr");   
    		for(i = 0; i < rows.length; i++){ 
				rows[i].className="nocolor";
			}
			row.className="red";
		}
 	}

function setBody(val){
	document.getElementById('mailbodytxt').value=val;
	document.getElementById('mailbody').innerHTML=val;
}

