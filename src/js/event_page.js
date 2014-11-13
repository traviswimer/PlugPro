chrome.runtime.onInstalled.addListener(function(install){
	console.log(install);

	// Detect as update by default
	var injectFileName = "on_update.js";

	// If user had just installed, do nothing
	if( install.reason === "install" ){
		return;
	}

	chrome.tabs.query(
		{
			"url": "*://plug.dj/*"
		},
		function(tabs){
			for( var tabCount=0; tabCount<tabs.length; tabCount++){
				chrome.tabs.executeScript(
					tabs[tabCount].id,
					{
						"file": "js/" + injectFileName
					},
					function(injectback){
						console.log("Injected");
						console.log(injectback);
					}
				);
			}
		}
	);
});