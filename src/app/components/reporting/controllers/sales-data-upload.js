define(['components/reporting/module', 'lodash'], function (module, _) {

	'use strict';
	module.registerController('SalesDataUploadController', function ($scope, AccountModel, SalesDataModel, $state, $log) {
		$scope.company = {};
		$scope.company.list = AccountModel.getCompanyList();

		$scope.salesData = {};
		$scope.salesData.list = SalesDataModel.getSalesDataList();

		$log.debug($scope.salesData.list);

		$scope.period = {};
		$scope.period.months = [{monthId: 1, name: "January"}, {monthId: 2, name: "February"}, {monthId: 3, name: "March"}, 
							    {monthId: 4, name: "April"}, {monthId: 5, name: "May"}, {monthId: 6, name: "June"}, 
							    {monthId: 7, name: "July"}, {monthId: 8, name: "August"}, {monthId: 9, name: "September"}, 
							    {monthId: 10, name: "October"}, {monthId: 11, name: "November"}, {monthId: 12, name: "December"}];

		var currentYear = new Date().getFullYear();
		var years = "";
		for(var i = -2; i < 10; i++) {
			years += (currentYear + i).toString() + ",";
		}

		$scope.period.years = years.substring(0, years.length - 1).split(',');

		$scope.sd = {};
		$scope.month = 0;
		$scope.year = currentYear;

		$scope.alerts = {};
		$scope.alerts.missingOptions = false;
		$scope.alerts.duplicateSalesData = function() {
			return _.some($scope.salesData.list, function(salesData) {
				if($scope.period.months[$scope.sd.month - 1] == undefined) {
					return false;
				}

				return ((salesData.uploadedFor.companyId == $scope.sd.companyId) && (salesData.salesPeriod == $scope.period.months[$scope.sd.month - 1].name + " " + $scope.sd.year));
			});
		};

		$scope.refreshList = function() {
			$state.go($state.current, {}, {reload: true});
		};

		$scope.test = function() {
			$log.debug($scope.sd);
		};
	});
});
