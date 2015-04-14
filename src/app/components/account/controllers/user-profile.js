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
			} else if(modal === 'attachToCompanyModal') {
				if($scope.user.employer != null) {
					$scope.mw.attachToCompanyModal.data.id = $scope.user.employer.id;
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
			AccountModel.editProfile({
				"first_name": $scope.mw.editProfileInfoModal.data.first_name,
				"last_name": $scope.mw.editProfileInfoModal.data.last_name,
				"email": $scope.mw.editProfileInfoModal.data.email,
				"password": $scope.mw.editProfileInfoModal.data.password,
				"roles": $scope.mw.editProfileInfoModal.data.roles
			}).then(function(){
				$scope.refreshPage();
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
