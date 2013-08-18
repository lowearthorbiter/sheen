var keys = {};
chrome.extension.onMessage.addListener(
	function(request,sender,sendResponse){
		//alert(sender.tab);
		if(request.keydown == true){
			keys[request.keyCode] = true;

			if (keys[17] == true && keys[18] == true && keys[39] == true){
				moveRight(sender.tab);
			} else if (keys[17] == true && keys[18] == true && keys[37] == true){
				moveLeft(sender.tab);
			} else if (keys[17] == true && keys[18] == true && keys[40] == true){
				keys[40] = false;
				separateWindow(sender.tab);
			} else if (keys[17] == true && keys[18] == true && keys[38] == true){
				keys[38] = false;
				combineWindow(sender.tab);
			} else if (keys[17] == true && keys[18] == true && keys[80] == true){
				keys[80] = false;
				togglePin(sender.tab);
			};
		} else if( request.keyup == true){
			keys[request.keyCode] = false;
		};
	}
);

//ACTION METHODS
function moveRight(tab){
	chrome.tabs.query({currentWindow: true}, function(tabs){
		if(tab.index == tabs.length-1){
			chrome.tabs.move(tab.id, {index: 0});
		} else {
			chrome.tabs.move(tab.id, {index: tab.index+1})
		};
	});
};
function moveLeft(tab){
	chrome.tabs.move(tab.id,{index: tab.index-1});
};
function separateWindow(tab){
	chrome.windows.get(tab.windowId, {populate: true}, function(window){
		if(window.tabs.length != 1){
			chrome.tabs.remove(tab.id);
			chrome.windows.create({url: tab.url});
		};
	});
};
function combineWindow(tab){
	chrome.windows.getAll({populate: true}, function(windows){
		for(var i in windows){
			if(windows[i].focused == true){
				//check that more than one window open
				if(windows.length != 1){
					if(i == 0){
						chrome.tabs.remove(tab.id);
						chrome.tabs.create({windowId: windows[windows.length-1].id, url: tab.url});			
					} else {
						chrome.tabs.remove(tab.id);
						chrome.tabs.create({windowId: windows[i-1].id, url: tab.url});
					};
				};
			};
		};
	});	
};
function togglePin(tab){
	if(tab.pinned == false){
		chrome.tabs.update(tab.id, {"pinned": true});
	} else {
		chrome.tabs.update(tab.id, {"pinned": false});
	};
};
