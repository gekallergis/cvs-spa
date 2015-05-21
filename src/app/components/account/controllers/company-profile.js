define(['components/account/module', 'lodash', 'notification'], function (module, _) {

	'use strict';
	module.registerController('CompanyProfileController', function ($scope, AccountModel, $state, $log) {
		$scope.company = AccountModel.getCurrentCompany();
		$scope.company.list = AccountModel.getCompanyList();
		$scope.countries = AccountModel.getCountryList();
		$scope.user_profiles = filterProfileList(AccountModel.getProfileList());

		function filterProfileList(profiles) {
			var filteredProfiles = _.filter(profiles, function(item){
			  return item.employer.companyId === $scope.company.companyId;
			});
			return filteredProfiles;
		}

		$scope.mw = {
			bespokeCurrencyModal: {
				visibility: false,
				data: {}
			},
			editCompanyInfoModal: {
				visibility: false,
				data: {}
			},
			attachManagingAccountModal: {
				visibility: false,
				data: {}
			},
			attachToCompanyModal: {
				visibility: false,
				data: {}
			}
		};
		$scope.showModal = function(modal){
			if(modal === 'editCompanyInfoModal') {
				$scope.mw.editCompanyInfoModal.data = _.clone($scope.company);
			} else if(modal === 'attachManagingAccountModal') {
				if($scope.company.managingEmployee != null) {
					$scope.mw.attachManagingAccountModal.data.id = $scope.company.managingEmployee.employeeId;
				}
			} else if(modal === 'attachToCompanyModal') {
				if($scope.company.parentCompany != null) {
					$scope.mw.attachToCompanyModal.data.id = $scope.company.parentCompany.companyId;
				}
			}

			$scope.mw[modal].visibility = !$scope.mw[modal].visibility;
	    };

		$scope.refreshPage = function() {
			$state.go($state.current, {}, {reload: true});
		};

		// Actions
		$scope.setBespokeCurrency = function() {
			AccountModel.setBespokeCurrency({
				"company": $scope.company.id,
				"bespoke_code": $scope.mw.bespokeCurrencyModal.data.bespoke,
				"iso_code": $scope.mw.bespokeCurrencyModal.data.iso
			}).then(function() {
				$scope.refreshPage();
			});
		};

		$scope.editCompanyInformation = function() {
			AccountModel.editCompany({
				"companyId": $scope.company.companyId,
				"registrationNumber": $scope.mw.editCompanyInfoModal.data.registrationNumber,
				"name": $scope.mw.editCompanyInfoModal.data.name,
				"phoneNumber": $scope.mw.editCompanyInfoModal.data.phoneNumber,
				"primaryAddress": $scope.mw.editCompanyInfoModal.data.primaryAddress,
				"secondaryAddress": $scope.mw.editCompanyInfoModal.data.secondaryAddress,
				"postcode": $scope.mw.editCompanyInfoModal.data.postcode,
				"city": $scope.mw.editCompanyInfoModal.data.city,
				"country": $scope.mw.editCompanyInfoModal.data.country
			}).then(function(response) {
				$.smallBox({
                    title: response.message,
                    content: "[" + response.code + "]",
                    color: "#739E73",
					icon: "fa fa-check-square-o swing animated",
                    timeout: 4000
                });
				$scope.refreshPage();
			}, function(errorResponse) {
				$scope.mw.editCompanyInfoModal.data.message = {text: errorResponse.message, type: 'error'};
			});
		};

		$scope.attachManagingAccount = function() {
			AccountModel.attachManagingAccount({
				"companyId": $scope.company.companyId,
				"employeeId": $scope.mw.attachManagingAccountModal.data.id
			}).then(function(response) {
				$.smallBox({
                    title: response.message,
                    content: "[" + response.code + "]",
                    color: "#739E73",
					icon: "fa fa-check-square-o swing animated",
                    timeout: 4000
                });
				$scope.refreshPage();
			}, function(errorResponse) {
				$scope.mw.attachManagingAccountModal.data.message = {text: errorResponse.message, type: 'error'};
			});
		};

		$scope.attachParentCompany = function() {
			AccountModel.attachParentCompany({
				"companyId": $scope.company.companyId,
				"parentCompanyId": $scope.mw.attachToCompanyModal.data.id
			}).then(function(response) {
				$.smallBox({
                    title: response.message,
                    content: "[" + response.code + "]",
                    color: "#739E73",
					icon: "fa fa-check-square-o swing animated",
                    timeout: 4000
                });
				$scope.refreshPage();
			}, function(errorResponse) {
				$scope.mw.attachToCompanyModal.data.message = {text: errorResponse.message, type: 'error'};
			});
		};

		$scope.deleteCompany = function(companyId) {
			$.SmartMessageBox({
                title: "Delete Company!",
                content: "You are about to delete " + $scope.company.name + "! Are you sure?",
                buttons: '[Cancel][Delete]'
            }, function (key_press) {
				if (key_press === "Delete") {
                	AccountModel.deleteCompany(companyId)
					.then(function(response){
						$.smallBox({
		                    title: response.message,
		                    content: "[" + response.code + "]",
		                    color: "#739E73",
							icon: "fa fa-trash-o swing animated",
		                    timeout: 4000
		                });
	                    $state.go('app.company', {}, {reload: true});
					}, function(errorResponse) {
						$.smallBox({
		                    title: errorResponse.message,
		                    content: "[" + errorResponse.code + "]",
		                    color: "#C46A69",
		                    icon: "fa fa-times swing animated",
		                    timeout: 4000
		                });
					});
                }
            });
		};
	});
});
