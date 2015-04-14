define(['components/account/module', 'lodash'], function (module, _) {

	'use strict';
	module.registerController('LoginController', function ($scope, AccountModel, $state, $log) {
		$scope.login = {};
		$scope.login.credentials = {};
		$scope.login.error_message = null;

		$scope.login = function() {
			AccountModel.login($scope.login.credentials.email, $scope.login.credentials.password)
			.then(function(){
				$state.go('app.profile.details', {profileId: AccountModel.getLoggedInUser().id});
			}, function(){
				$scope.login.error_message = "Wrong email/password combination! You have 2 remaining tries!";
			});
		};
	});
});
