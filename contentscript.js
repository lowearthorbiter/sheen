$(document).keydown(function (e){
	chrome.extension.sendMessage({"keydown": true, "keyCode": e.keyCode});
	console.log(e.keyCode);
});

$(document).keyup(function(e){
	chrome.extension.sendMessage({"keyup": true, "keyCode": e.keyCode});
});