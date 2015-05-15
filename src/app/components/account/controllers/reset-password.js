define(['components/account/module', 'lodash'], function (module, _) {

	'use strict';
	module.registerController('PasswrodResetController', function ($scope, AccountModel, $state, $log) {
		$scope.reset = {};
		$scope.reset.email = {};
		$scope.reset.message = null;

		$scope.resetPassword = function() {
			AccountModel.resetPassword($scope.reset.email)
			.then(function(response){
				$state.go('login', {message: {text: response.message, type: "info"}});
			}, function(errorResponse){
				$scope.reset.message = {text: errorResponse.message, type: "error"};
			});
		};
	});
});
