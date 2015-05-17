define(['core/layout/module', 'lodash'], function (module, _) {

	'use strict';
	module.registerController('HeaderController', function ($scope, AccountModel, $state, $log) {
		$scope.logout = function(id) {
			AccountModel.logout()
			.then(function(response) {
				$state.go('login', {message: {text: response.message, type: "info"}}, {reload: true});
			});
		};
	});
});
