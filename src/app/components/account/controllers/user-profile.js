define(['components/account/module', 'lodash'], function (module, _) {

	'use strict';
	module.registerController('UserProfileController', function ($scope, AccountModel, ProductModel, $state, $log) {
		$scope.user = AccountModel.getCurrentUser();
		$scope.company = {};
		$scope.company.list = AccountModel.getCompanyList();
		$scope.product = {};
		$scope.product.list = ProductModel.getProductList();
		$scope.roles = {};
		$scope.roles.list = AccountModel.getUserRolesList();

		$scope.mw = {
			editProfileInfoModal: {
				visibility: false,
				data: {}
			},
			attachToCompanyModal: {
				visibility: false,
				data: {}
			},
			addFreeProductsModal: {
				visibility: false,
				data: {}
			}
		};
		$scope.showModal = function(modal){
			if(modal === 'editProfileInfoModal') {
				$scope.mw.editProfileInfoModal.data = _.clone($scope.user);
				$scope.mw.editProfileInfoModal.data.roles = _.pluck($scope.mw.editProfileInfoModal.data.roles, 'roleId');
			} else if(modal === 'attachToCompanyModal') {
				if($scope.user.employer != null) {
					$scope.mw.attachToCompanyModal.data.id = $scope.user.employer.companyId;
				}
			}

			$scope.mw[modal].visibility = !$scope.mw[modal].visibility;
	    };

		$scope.refreshPage = function() {
			$state.go($state.current, {}, {reload: true});
		};

		$scope.toggleStatus = function() {
			AccountModel.toggleStatus($scope.user.employeeId)
			.then(function(response){
				$.smallBox({
                    title: response.message,
                    content: "[" + response.code + "]",
                    color: "#739E73",
					icon: "fa fa-check-square-o swing animated",
                    timeout: 4000
                });
				$scope.refreshPage();
			}, function(errorResponse) {
				$.smallBox({
                    title: errorResponse.message,
                    content: "[" + errorResponse.code + "]",
                    color: "#C46A69",
                    icon: "fa fa-times swing animated",
                    timeout: 4000
                });
			});
		};

		$scope.attachToCompany = function() {
			AccountModel.attachToCompany({
				"employeeId": $scope.user.employeeId,
				"companyId": $scope.mw.attachToCompanyModal.data.id
			}).then(function(response) {
				if(AccountModel.getLoggedInUser().employeeId == $scope.user.employeeId) {
					AccountModel.logout()
					.then(function(logoutResponse) {
						$state.go('login', {message: {text: response.message, type: "info"}}, {reload: true});
					});
				} else {
					$.smallBox({
	                    title: response.message,
	                    content: "[" + response.code + "]",
	                    color: "#739E73",
						icon: "fa fa-check-square-o swing animated",
	                    timeout: 4000
	                });
	                $state.go('app.profile.details', {profileId: AccountModel.getLoggedInUser().employeeId});
				}
			}, function(errorResponse) {
				$scope.mw.attachToCompanyModal.data.message = {text: errorResponse.message, type: 'error'};
			});
		};

		$scope.editProfileInformation = function() {
			var rolesList = [];
			_.forEach($scope.mw.editProfileInfoModal.data.roles, function(roleId) {
				rolesList.push({"roleId": roleId, "label":""});
			});

			AccountModel.editProfile({
				"employeeId": $scope.user.employeeId,
				"firstName": $scope.mw.editProfileInfoModal.data.firstName,
				"lastName": $scope.mw.editProfileInfoModal.data.lastName,
				"email": $scope.mw.editProfileInfoModal.data.email,
				"password": $scope.mw.editProfileInfoModal.data.password,
				"roles": rolesList
			}).then(function(response){
				if(AccountModel.getLoggedInUser().employeeId == $scope.user.employeeId) {
					AccountModel.logout()
					.then(function(logoutResponse) {
						$state.go('login', {message: {text: response.message, type: "info"}}, {reload: true});
					});
				} else {
					$.smallBox({
                        title: response.message,
                        content: "[" + response.code + "]",
                        color: "#739E73",
						icon: "fa fa-check-square-o swing animated",
                        timeout: 4000
                    });
                    $scope.refreshPage();
				}
			}, function(errorResponse){
				$scope.mw.editProfileInfoModal.data.message = {text: errorResponse.message, type: 'error'};
			});
		};

		$scope.addFreeProducts = function() {
			AccountModel.addFreeProducts({
				"companyId": $scope.user.employer.companyId,
				"productId": $scope.mw.addFreeProductsModal.data.id,
				"quantity": $scope.mw.addFreeProductsModal.data.qty
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
				$scope.mw.addFreeProductsModal.data.message = {text: errorResponse.message, type: 'error'};
			});
		};

		$scope.deleteProfile = function(id) {
			$.SmartMessageBox({
                title: "Delete User Profile!",
                content: "You are about to delete " + $scope.user.firstName + " " + $scope.user.lastName + "! Are you sure?",
                buttons: '[Cancel][Delete]'
            }, function (key_press) {
				if (key_press === "Delete") {
					AccountModel.deleteProfile(id)
					.then(function(response){
						$.smallBox({
		                    title: response.message,
		                    content: "[" + response.code + "]",
		                    color: "#739E73",
							icon: "fa fa-trash-o swing animated",
		                    timeout: 4000
		                });
	                    $state.go('app.profile', {}, {reload: true});
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
