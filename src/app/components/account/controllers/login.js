define(['components/account/module', 'lodash'], function (module, _) {

	'use strict';
	module.registerController('LoginController', function ($scope, AccountModel, $state, $stateParams, $log) {
		$scope.login = {};
		$scope.state = {};
		$scope.state.loggingIn = false;
		$scope.credentials = {};
		$scope.login.message = null;

		$scope.$watch('$stateParams.message', function(message) {
			if(!_.isEmpty(message)) {
				$scope.login.message = message;
			}
		});

		$scope.preLogin = function(id) {
			switch(id) {
				case 1:
					$scope.credentials.email = "d.waller@companyc.se";
					$scope.credentials.password = "123456";
					break;
				case 2:
					$scope.credentials.email = "n.thompsett@companyc.se";
					$scope.credentials.password = "123456";
					break;
				case 3:
					$scope.credentials.email = "r.franklin@companya.se";
					$scope.credentials.password = "123456";
					break;
				case 4:
					$scope.credentials.email = "k.ryder@companya.se";
					$scope.credentials.password = "123456";
					break;
				case 5:
					$scope.credentials.email = "w.hogarth@companya.se";
					$scope.credentials.password = "123456";
					break;
				case 6:
					$scope.credentials.email = "d.burnham@companyb.se";
					$scope.credentials.password = "123456";
					break;
				case 7:
					$scope.credentials.email = "f.mondy@companyb.se";
					$scope.credentials.password = "123456";
					break;
			}
		}

		$scope.login = function() {
			$scope.state.loggingIn = true;
			AccountModel.login($scope.credentials.email, $scope.credentials.password)
			.then(function(response){
				$state.go('app.profile.details', {profileId: AccountModel.getLoggedInUser().employeeId});
			}, function(errorResponse){
				$scope.state.loggingIn = false;
				$scope.login.message = {text: errorResponse.message, type: "error"};
			});
		};
	});
});
