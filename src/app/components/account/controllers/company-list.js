define(['components/account/module', 'lodash'], function (module, _) {

	'use strict';
	module.registerController('CompanyListController', function ($scope, AccountModel, $state, $log) {
		$scope.nc = {};
		$scope.company = {};
		$scope.company.list = AccountModel.getCompanyList();
		$scope.country = {};
		$scope.country.list = AccountModel.getCountryList();
		
		$scope.modalVisibility = false;
		$scope.showModal = function(){
	        $scope.modalVisibility = !$scope.modalVisibility;
	    };

		$scope.refreshList = function() {
			$state.go($state.current, {}, {reload: true});
		};

		$scope.addNewCompany = function() {
			AccountModel.addCompany({
				"registrationNumber": $scope.nc.reg_number,
				"name": $scope.nc.name,
				"phoneNumber": $scope.nc.phone,
				"primaryAddress": $scope.nc.primary_address,
				"secondaryAddress": $scope.nc.secondary_address,
				"postcode": $scope.nc.postcode,
				"city": $scope.nc.city,
				"countryId": $scope.nc.country
			}).then(function(response) {
				$.smallBox({
	                title: response.message,
	                content: "[" + response.code + "]",
	                color: "#739E73",
					icon: "fa fa-check-trash-o swing animated",
	                timeout: 4000
	            });
				$scope.refreshList();
			}, function(errorResponse) {
				$scope.nc.message = {text: errorResponse.message, type: "error"};
			});
		};
	});
});
