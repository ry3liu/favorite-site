document.getElementById("webList").addEventListener("submit", saveWeb); //I want to access the form element, and addEventListener will access the button, of submit type

function saveWeb(ee){
	var name=document.getElementById("siteName").value;
	var desc=document.getElementById("siteDesc").value;
	var url=document.getElementById("siteAddre").value;
	
	if (!testURL(url, name))
	{
		return false;
	}
	
	
	var web={
		webName:name, 
		webDesc:desc,
		webURL:url
		
	}
	
	
	
	if(localStorage.getItem('websites')==null){
		var webs=[];
		webs.push(web);
		
	}
	else{
		var webs = JSON.parse(localStorage.getItem('websites')); //inside this array, there will be many objects
		webs.push(web);
		
	}
	
	
	
	localStorage.setItem('websites',JSON.stringify(webs));
	
	ee.preventDefault(); //prevent the form from submitting so I can view the json in application, local memory
	document.getElementById("webList").reset();
	showWeb();
	
}





function deleteIssue(url) {
  var issues = JSON.parse(localStorage.getItem('websites')); //issues will store the javascript object in the key issues
//getItem is only getting/reading what's in the json file, no deleting
  for (var i = 0; i < issues.length; i++) {
    if (issues[i].webURL == url) {
      issues.splice(i, 1);
    }
  }

  localStorage.setItem('websites', JSON.stringify(issues));
  
  showWeb();
}

function showWeb(){
	//I want the info i get from local storage to be in javascript format
	var getInfo=JSON.parse(localStorage.getItem('websites'));
	var editHTML=document.getElementById("webLis");
	editHTML.innerHTML="";
	
	for(var i=0; i<getInfo.length; i++){
		var name=getInfo[i].webName;
		var des=getInfo[i].webDesc;
		var url=getInfo[i].webURL;
		
		editHTML.innerHTML+='<div class="panel panel-info">'+
		'<div class="panel-heading">'+
		name +'</div>'+
		'<div class="panel-body">'+
		'<p><span class="label label-info"> Note:</span> '+ des+'</p>'+
		'<h5> The site URL is: <br>'+ url +'</h5>'+
		'<a href="#" onclick="deleteIssue(\''+url+'\')" class="btn btn-danger">Delete</a>'+

		'<a href="' + url +'" class="btn btn-default" target="_blank" > Open </a>'
		
		'</div>'+
			'</div>'
			
	}
	
	
}


function testURL(url, name){
	if(!url || !name){
		alert("You need to fill in url and name");
		return false;
	}
	
	
		return true;
	
	//since I know regular expression is object in javascript
	
}
