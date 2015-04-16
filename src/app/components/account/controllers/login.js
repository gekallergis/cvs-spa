define(['components/account/module', 'lodash'], function (module, _) {

	'use strict';
	module.registerController('LoginController', function ($scope, AccountModel, $state, $stateParams, $log) {
		$scope.login = {};
		$scope.login.credentials = {};
		$scope.login.message = null;

		$scope.$watch('$stateParams.message', function(message) {
			if(!_.isEmpty(message)) {
				$scope.login.message = message;
			}
		});

		$scope.login = function() {
			AccountModel.login($scope.login.credentials.email, $scope.login.credentials.password)
			.then(function(){
				$state.go('app.profile.details', {profileId: AccountModel.getLoggedInUser().id});
			}, function(){
				$scope.login.message = {text: "Wrong email/password combination! You have 2 remaining tries!", type: "error"};
			});
		};
	});
});