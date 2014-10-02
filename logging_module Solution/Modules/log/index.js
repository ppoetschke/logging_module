var BASE_PATH;
	

BASE_PATH = module.id.substr(0, module.id.lastIndexOf('index'));


	
exports.start = function(){
	//debugger
	var worker = new SharedWorker(BASE_PATH + "logWorker.js", "logWorker");
	var workerPort = worker.port;
	workerPort.postMessage({type: 'start'});
};

exports.stop = function(){
	var worker = new SharedWorker(BASE_PATH + "logWorker.js", "logWorker");
	var workerPort = worker.port;
	workerPort.postMessage({type: 'stop'});
};
		
exports.createLog = function(){
	//debugger
	var moment = require(solution.getFolder("path") + "Modules/moment");
	var dateString = moment().toISOString();
	var dateString2 = moment().format("X");
	var path = solution.getFolder("path") + "Logs/cache_" + dateString2 + ".json";
	var file = File(path);
	if(!file.exists){
		file.create();
	}
	
	
	var logMutex = Mutex("CacheLog");
	logMutex.lock();
	try{
		var stream = TextStream(file, "write");  // open the stream in write mode
		var obj = {};
		obj.date = dateString;
		obj.name = application.name;
		
		ds.freeCacheMem();
		obj.cacheInfo = ds.getCacheInfo();
		
		
		// STEP 1: LOGIN
		var protocol;
		var port;
		if(application.httpServer.ssl.enabled){
			protocol = "https://";
			port = application.httpServer.ssl.port;
		}else{
			protocol = "http://";
			port = application.httpServer.port;
		}
		var server = protocol + application.httpServer.hostName + ":" + port;

		var url = server + "/rest/$directory/login";
		xhr = new XMLHttpRequest();
		xhr.open("POST", url);
		xhr.send('["admin", "admin"]');

		var response = xhr.response;
		var wasid = xhr.getResponseHeader("Set-Cookie").split(";")[0]; //get session cookie
		var result = JSON.parse(response);

		// result; // result is true !


		// STEP 2: Get current User
		var url = server + "/rest/$info";
		xhr = new XMLHttpRequest();
		xhr.open("GET", url);
		xhr.setRequestHeader("Cookie", wasid);
		xhr.send();

		var response = xhr.response;

		obj.serverInfo = JSON.parse(response);

		var url = server + "/rest/$directory/logout";
		xhr = new XMLHttpRequest();
		xhr.open("GET", url);
		xhr.setRequestHeader("Cookie", wasid);
		xhr.send();

		var note = JSON.stringify(obj);
		stream.write(note);
		stream.close();
		logMutex.unlock();
	}
	catch(err){
		logMutex.unlock();
	}
};
;
