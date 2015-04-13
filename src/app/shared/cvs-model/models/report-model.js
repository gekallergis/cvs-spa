define(['shared/cvs-model/module', 'lodash'], function (module, _) {

    'use strict';
    module.registerFactory('ReportModel', function (CVSService, $q) {
    	var _report_list;
		
		function _getReports() {
			return CVSService.getReports()
			.then(function(report_list){
				_report_list = report_list;
			});
		}

		return {
			getReports: function() {
				return _getReports();
			},
			getReportList: function(){
				return _report_list;
			},
			deleteReport: function(reportID) {
				// Delete report through the API here!
				var deferred = $q.defer();
				deferred.resolve();
				return deferred.promise;
			},
			generateReport: function(productID, salesDataID, config) {
				// Generate report through the API here!
				var deferred = $q.defer();
				deferred.resolve();
				return deferred.promise;
			},
		};
    });
});
