define(['components/account/module', 'lodash'], function (module, _) {

	'use strict';
	module.registerController('UserProfileController', function ($scope, AccountModel, $state, $log) {
		$scope.user = AccountModel.getCurrentUser();

		$scope.refreshList = function() {
			$state.go($state.current, {}, {reload: true});
		};
	});
});
