define(['components/reporting/module', 'lodash'], function (module, _) {

	'use strict';
	module.registerController('ReportGenerationController', function ($scope, ReportModel, $state, $log) {
		$scope.report = {};
		$scope.report.list = ReportModel.getReportList();

		$scope.refreshList = function() {
			$state.go($state.current, {}, {reload: true});
		};

		$scope.deleteReport = function(id) {
			ReportModel.deleteReport(id)
			.then(function(){
				$scope.refreshList();
			});
		};
	});
});
