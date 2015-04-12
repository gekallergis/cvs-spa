define(['components/account/module', 'lodash'], function (module, _) {

	'use strict';
	module.registerController('CompanyProfileController', function ($scope, AccountModel, $state, $log) {
		$scope.company = AccountModel.getCurrentCompany();

		$scope.refreshList = function() {
			$state.go($state.current, {}, {reload: true});
		};
	});
});
