define(['components/account/module', 'lodash'], function (module, _) {

	'use strict';
	module.registerController('RegistrationController', function ($scope, AccountModel, $state, $log) {
		$scope.registration = {};
		$scope.registration.info = {};
		$scope.registration.message = null;
		$scope.registration.countries = AccountModel.getCountryList();

		$scope.register = function() {
			AccountModel.register({
				"reg_num": $scope.registration.info.reg_num,
				"name": $scope.registration.info.name,
				"primary_address": $scope.registration.info.primary_address,
				"secondary_address": $scope.registration.info.secondary_address,
				"postcode": $scope.registration.info.postcode,
				"city": $scope.registration.info.city,
				"country": $scope.registration.info.country,
				"phone": $scope.registration.info.phone,
				"first_name": $scope.registration.info.first_name,
				"last_name": $scope.registration.info.last_name,
				"email": $scope.registration.info.email,
				"password": $scope.registration.info.password,
			})
			.then(function(){
				$state.go('login', {message: {text: "Welcome! Activate your account and login!", type: "info"}});
			}, function(){
				$scope.registration.message = {text: "Wrong email/password combination! You have 2 remaining tries!", type: "error"};
			});
		};
	});
});
