	define(['components/intel/module', 'lodash'], function (module, _) {

	'use strict';
	module.registerController('SystemLogController', function ($scope, IntelModel) {
		$scope.log = {};
		$scope.log.list = IntelModel.getSystemLogList();
	});
});
