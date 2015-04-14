define(['components/account/module', 'lodash'], function (module, _) {

	'use strict';
	module.registerController('PasswrodResetController', function ($scope, AccountModel, $state, $log) {
		$scope.reset = {};
		$scope.reset.email = {};
		$scope.reset.message = null;

		$scope.resetPassword = function() {
			AccountModel.resetPassword({
				"email": $scope.reset.email
			})
			.then(function(){
				$state.go('login', {message: {text: "An email has been sent with your new password! It is strongly advised that you change your password imediately after logging in!", type: "info"}});
			}, function(){
				$scope.reset.message = {text: "The provided email does not belong to a registered account!", type: "error"};
			});
		};
	});
});
