define(['components/intel/module', 'lodash'], function (module, _) {

    'use strict';
    module.registerFactory('SystemLogService', function (SERVICE_ENDPOINT, $http, $q, $log) {

        function getSystemLog() {
        	var deferred = $q.defer();

			$http.get(SERVICE_ENDPOINT.url + 'system-log.json')
			.success(function(data){
				deferred.resolve(data);
				$log.info('[SYSTEM_LOG_SERVICE] Retrieved system log.');
			})
			.error(function(response){
				deferred.reject(response);
				$log.error('[SYSTEM_LOG_SERVICE] Failed to retrieve system log.');
			});

			return deferred.promise;
		}

		return {
			getSystemLog: function() {
				return getSystemLog();
			}
		};
    });
});
