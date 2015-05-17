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
			AccountModel.setStatus({
				"id": $scope.user.id,
				"isActive": !$scope.user.isActive
			})
			.then(function(){
				$scope.refreshPage();
			});
		};

		$scope.attachToCompany = function() {
			AccountModel.attachToCompany({
				"profile": $scope.user.id,
				"parent_company": $scope.mw.attachToCompanyModal.data.id
			}).then(function() {
				$scope.refreshPage();
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
                        content: response.code,
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
				"company": $scope.user.employer.id,
				"product": $scope.mw.addFreeProductsModal.data.id,
				"qty": $scope.mw.addFreeProductsModal.data.qty
			}).then(function() {
				$scope.refreshPage();
			});
		};

		$scope.deleteProfile = function(id) {
			$.SmartMessageBox({
                title: "Delete User Profile!",
                content: "You are about to delete " + $scope.user.first_name + " " + $scope.user.last_name + "! Are you sure?",
                buttons: '[Cancel][Delete]'
            }, function (key_press) {
				if (key_press === "Delete") {
					AccountModel.deleteProfile(id)
					.then(function(){
						$.smallBox({
	                        title: "User Profile Deleted",
	                        content: "User " + $scope.user.first_name + " " + $scope.user.last_name + " was deleted!",
	                        color: "#C46A69",
	                        icon: "fa fa-trash-o swing animated",
	                        timeout: 4000
	                    });
	                    $state.go('app.profile', {});
					});
                }
            });
		};
	});
});
