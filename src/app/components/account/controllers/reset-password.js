define(['components/account/module', 'lodash'], function (module, _) {

	'use strict';
	module.registerController('PasswrodResetController', function ($scope, AccountModel, $state, $log) {
		$scope.reset = {};
		$scope.reset.email = {};
		$scope.reset.message = null;
		$scope.state = {};
		$scope.state.reseting = false;

		$scope.resetPassword = function() {
			$scope.state.reseting = true;
			AccountModel.resetPassword($scope.reset.email)
			.then(function(response){
				$state.go('login', {message: {text: response.message, type: "info"}});
			}, function(errorResponse){
				$scope.state.reseting = false;
				$scope.reset.message = {text: errorResponse.message, type: "error"};
			});
		};
	});
});
