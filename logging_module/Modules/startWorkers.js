/*	Handler function for service messages (required)
*/
exports.postMessage = function (message) {

	if (message.name === 'applicationWillStart') {
		/* 	This is the first message sent to the service.
			It's a good location to initialize and start the service */

			log = require(solution.getFolder("path") + "Modules/log");
			log.start();

	}
	else if (message.name === 'applicationWillStop') {
		/*	The service should be stopped and ended here */
	}
	else if (message.name === 'httpServerDidStart') {
		/*	This message should be handled if the service depends on the HTTP Server status */
	}
	else if (message.name === 'httpServerWillStop') {
		/*	This message should be handled if the service depends on the HTTP Server status */
	}
	else if (message.name === 'catalogWillReload') {
		/*	This message should be handled if the service depends on the Model and uses the 'ds' property */
	}
	else if (message.name === 'catalogDidReload') {
		/*	This message should be handled if the service depends on the Model and uses the 'ds' property */
	}	
};


/*	The application storage can be used to store private data.
	The service data is accessed as follows: var serviceDatas = storage.getItem('services').startWorkers;
	
	In the same way, the application setting's storage contains the service settings, which are usually defined in the project's settings file.
	The service settings are accessed as follows: var serviceSettings = settings.getItem('services').startWorkers;
	
	For more information, refer to http://doc.wakanda.org/Wakanda Studio0.2/help/Title/en/page3326.html
*/
