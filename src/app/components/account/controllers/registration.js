define(['components/account/module', 'lodash'], function (module, _) {

	'use strict';
	module.registerController('RegistrationController', function ($scope, AccountModel, $state, $log) {
		$scope.registration = {};
		$scope.registration.info = {};
		$scope.registration.message = null;
		$scope.registration.countries = AccountModel.getCountryList();

		$scope.register = function() {
			AccountModel.register({
				"registrationNumber": $scope.registration.info.reg_num,
				"name": $scope.registration.info.name,
				"primaryAddress": $scope.registration.info.primary_address,
				"secondaryAddress": $scope.registration.info.secondary_address,
				"postcode": $scope.registration.info.postcode,
				"city": $scope.registration.info.city,
				"countryId": $scope.registration.info.country,
				"phoneNumber": $scope.registration.info.phone},
				{"firstName": $scope.registration.info.first_name,
				"lastName": $scope.registration.info.last_name,
				"email": $scope.registration.info.email,
				"password": $scope.registration.info.password
			})
			.then(function(response){
				$state.go('login', {message: {text: response.message, type: "info"}});
			}, function(errorResponse){
				$scope.registration.message = {text: errorResponse.message, type: "error"};
			});
		};
	});
});
