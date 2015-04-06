define(['shared/cvs-model/module', 'lodash'], function (module, _) {

    'use strict';
    module.registerFactory('CVSService', function (SERVICE_ENDPOINT, $http, $q, $log, $timeout) {

    	var artificial_delay = 2000;

        function _getSystemLog() {
        	var deferred = $q.defer();

			$http.get(SERVICE_ENDPOINT.url + 'system-log.json')
			.success(function(data){
				$timeout(function(){
					deferred.resolve(data);
					$log.info('[CVS_SERVICE] Retrieved system log.');
				}, artificial_delay);
			})
			.error(function(response){
				deferred.reject(response);
				$log.error('[CVS_SERVICE] Failed to retrieve system log.');
			});

			return deferred.promise;
		}

		return {
			getSystemLog: function() {
				return _getSystemLog();
			}
		};
    });
});
