define(['components/reporting/module', 'lodash'], function (module, _) {

	'use strict';
	module.registerController('SalesDataListController', function ($scope, SalesDataModel, $state, $log) {
		$scope.sales_data = {};
		$scope.sales_data.list = SalesDataModel.getSalesDataList();

		$scope.refreshList = function() {
			$state.go($state.current, {}, {reload: true});
		};

		$scope.deleteSalesData = function(id) {
			SalesDataModel.deleteSalesData(id)
			.then(function(){
				$scope.refreshList();
			});
		};
	});
});
