
var resourceAdder = require('./util/resourceAdder');

/** Initializes PlugPro */
function init(){

	resourceAdder.addStyle('css/plug_pro.css');
	resourceAdder.addScript('js/plug_pro.js');

	var extId = document.createElement('input');
	extId.id = "plug_pro_chrome_extension_id";
	extId.type = "hidden";
	extId.value = chrome.runtime.id;
	document.body.appendChild(extId);

	/*
	var addViewSelector = setInterval(function(){


		var header = document.getElementById('room-meta');
		var roomInfo = document.getElementById('room-bar');

		if( header && roomInfo ){
			
			clearInterval(addViewSelector);

			// Add the view selector
			var viewSelector = document.createElement('div');
			viewSelector.id = "view-selector";
			viewSelector.style.backgroundImage = "url('" + chrome.extension.getURL('images/logo.png') + "')";

			header.insertBefore( viewSelector, roomInfo );


			// Add the view icon
			var viewIcon = document.createElement('img');
			viewIcon.id = "view-icon";
			viewIcon.src = chrome.extension.getURL('images/view-icon.png');
			document.body.appendChild(viewIcon);




			// Create hidden field to contain chrome extension ID
			var extId = document.createElement('input');
			extId.id = "plug_pro_chrome_extension_id";
			extId.type = "hidden";
			extId.value = chrome.runtime.id;
			document.body.appendChild(extId);




			// add updates modal
			var bgFader = document.createElement('div');
			bgFader.id = "plugProModalBgFader";
			document.body.appendChild(bgFader);

			var updateModal = document.createElement('div');
			updateModal.id = "plugProUpdatedModal";
			updateModal.style.backgroundImage = "url('" + chrome.extension.getURL('images/logo_large.png') + "')";

			document.body.appendChild(updateModal);

			var updateText = document.createElement('div');
			updateText.id = "plugProUpdatedText";
			updateText.innerHTML = "PlugPro has updated and needs to refesh.";
			updateModal.appendChild(updateText);

			var refreshButton = document.createElement('div');
			refreshButton.className = "plugProUpdatedButton";
			refreshButton.style.backgroundColor = "#2cbce0";
			refreshButton.innerHTML = "Refresh Now";
			refreshButton.addEventListener("click", function(){
				location.reload(true);
			});
			updateModal.appendChild(refreshButton);

			var laterButton = document.createElement('div');
			laterButton.className = "plugProUpdatedButton";
			laterButton.style.backgroundColor = "#E09F2C";
			laterButton.innerHTML = "Do it later";
			laterButton.addEventListener("click", function(){
				bgFader.className = "";
				updateModal.className = "";
			});
			updateModal.appendChild(laterButton);






		}

	}, 1000);*/
}



/** Checks if the document has loaded, and PlugPro can begin running */
var readyStateCheckInterval = setInterval(function(){
	if(document.readyState === "complete"){
		init();
		clearInterval(readyStateCheckInterval);
	}
}, 10);