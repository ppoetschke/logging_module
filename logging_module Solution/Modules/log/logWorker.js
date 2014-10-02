//login using admin account
if (loginByPassword("admin", "admin")) {
    onconnect = function(msg) {
		//debugger
        var thePort = msg.ports[0];
        thePort.onmessage = function(event) {
        	
            var message = event.data;
            switch (message.type) {
            case 'start':
				//debugger;
	               function doLog()
						{
							require(solution.getFolder("path") + "Modules/log").createLog();
						}
		 
		            
					setInterval(doLog, 1000 * 60 * 60); // every hour
					doLog();               

                break;
                
            case 'stop':
            clearInterval();
                close();
                break;

            case 'test':
                debugger;
                break;
            }
        };

    };
}
else {
    close();
}
