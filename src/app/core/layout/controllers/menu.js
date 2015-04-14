define(['core/layout/module', 'lodash'], function (module, _) {

	'use strict';
	module.registerController('MenuController', function ($scope, AccountModel, $state, $log) {
		$scope.loggedin_user = {};
		$scope.loggedin_user.id = AccountModel.getLoggedInUser().id;
	});
});
