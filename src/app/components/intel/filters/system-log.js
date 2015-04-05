define(['components/intel/module', 'lodash'], function (module, _) {

    'use strict';
    module.registerFilter('pretty_timestamp', function ($log) {
        return function(timestamp) {
        	var prettystamp;

        	var now = new Date();
        	var log_time = new Date(timestamp * 1000);

        	var dy = now.getFullYear() - log_time.getFullYear();
        	var dm = now.getMonth() - log_time.getMonth();
        	var dd = now.getDate() - log_time.getDate();
        	var dh = now.getHours() - log_time.getHours();
        	var dmin = now.getMinutes() - log_time.getMinutes();
        	var dsec = now.getSeconds() - log_time.getSeconds();

        	$log.debug('For timestamp ' + timestamp + ' we get ' + now.getMonth() + " - " + log_time.getMonth() + " = " + dm);

        	if(dy > 0) {
        		prettystamp = log_time.toDateString();
        	} else if (dm > 0) {
        		if (dm == 1) {
        			prettystamp = dm + " month ago";
        		} else {
        			prettystamp = dm + " months ago";
        		}
        	} else if (dd > 0) {
        		if (dd == 1) {
        			prettystamp = dd + " day ago";
        		} else {
        			prettystamp = dd + " days ago";
        		}
        	} else if (dh > 0) {
        		if (dh == 1) {
        			prettystamp = dh + " hr ago";
        		} else {
        			prettystamp = dh + " hrs ago";
        		}
        	} else if (dmin > 0) {
        		if (dmin == 1) {
        			prettystamp = dmin + " min ago";
        		} else {
        			prettystamp = dmin + " mins ago";
        		}
        	} else if (dsec > 0) {
        		if (dsec < 30) {
        			prettystamp = "just now";
        		} else {
        			prettystamp = "30 seconds ago";
        		}
        	}
			
			return prettystamp;
		};
    });

	module.registerFilter('full_timestamp', function () {
        return function(timestamp) {
        	return new Date(timestamp * 1000).toString();
		};
    });
});
