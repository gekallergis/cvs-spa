define(['shared/cvs-model/module', 'lodash'], function (module, _) {

    'use strict';
    module.registerFactory('SalesDataModel', function (CVSService, $http, $q, $log) {
    	var _sales_data_list;
		
		function _getSalesData() {
			return CVSService.getSalesData()
			.then(function(sales_data_list){
				_sales_data_list = sales_data_list;
			});
		}

		return {
			getSalesData: function() {
				return _getSalesData();
			},
			getSalesDataList: function(){
				return _sales_data_list;
			},
			deleteSalesData: function(salesDataId) {
				// Delete sales data through the API here!
				var deferred = $q.defer();
				deferred.resolve();
				return deferred.promise;
			},
		};
    });
});
