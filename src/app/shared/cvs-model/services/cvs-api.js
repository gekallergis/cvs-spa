define(['shared/cvs-model/module', 'lodash'], function (module, _) {

    'use strict';
    module.registerFactory('CVSService', function (SERVICE_ENDPOINT, $http, $q, $log, $timeout) {

    	var artificial_delay = 500;

        function _makeGETRequest(filename) {
        	var deferred = $q.defer();

			$http.get(SERVICE_ENDPOINT.url + filename)
			.success(function(data){
				$timeout(function(){
					deferred.resolve(data);
					$log.info('[CVS_SERVICE] Retrieved [' + filename + '].');
				}, artificial_delay);
			})
			.error(function(response){
				deferred.reject(response);
				$log.error('[CVS_SERVICE] Failed to retrieve [' + filename + '].');
			});

			return deferred.promise;
		}

		return {
			getSystemLog: function() {
				return _makeGETRequest('system-log.json');
			},
			getCompanies: function() {
				return _makeGETRequest('company-list.json');
			},
			getProfiles: function() {
				return _makeGETRequest('profile-list.json');
			},
			getOrders: function() {
				return _makeGETRequest('order-list.json');
			},
			getInvoices: function() {
				return _makeGETRequest('invoice-list.json');	
			}
		};
    });
});
