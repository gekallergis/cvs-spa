define(['components/account/module', 'lodash'], function (module, _) {

	'use strict';
	module.registerController('CompanyListController', function ($scope, AccountModel, $state) {
		$scope.company = {};
		$scope.company.list = AccountModel.getCompanyList();

		$scope.refreshList = function() {
			$state.go($state.current, {}, {reload: true});
		};

		$scope.addNewCompany = function() {
			AccountModel.addCompany({
				"reg_number": $scope.nc.reg_number,
				"name": $scope.nc.name,
				"phone": $scope.nc.phone,
				"primary_address": $scope.nc.primary_address,
				"secondary_address": $scope.nc.secondary_address,
				"postcode": $scope.nc.postcode,
				"city": $scope.nc.city,
				"country": $scope.nc.country
			});
			
			$scope.refreshList();
		};
	});
});