chrome.runtime.onInstalled.addListener(function(install){
	console.log(install);

	// Detect as update by default
	var injectFileName = "on_update.js";

	// Check if it is actually the first install
	if( install.reason === "install" ){
		injectFileName = "on_install.js";
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