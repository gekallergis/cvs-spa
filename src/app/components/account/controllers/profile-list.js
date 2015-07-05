define(['components/account/module', 'lodash'], function (module, _) {

	'use strict';
	module.registerController('ProfileListController', function ($scope, AccountModel, $state, $log) {
		$scope.np = {};
		$scope.profile = {};
		$scope.profile.list = AccountModel.getProfileList();
		$scope.registration = {};
		$scope.registration.message = null;
		
		$scope.modalVisibility = false;
		$scope.showModal = function(){
	        $scope.modalVisibility = !$scope.modalVisibility;
	    };

		$scope.refreshList = function() {
			$state.go($state.current, {}, {reload: true});
		};

		$scope.addNewProfile = function() {
			AccountModel.addProfile({
				"firstName": $scope.np.first_name,
				"lastName": $scope.np.last_name,
				"email": $scope.np.email,
				"password": $scope.np.password,
			}).then(function(response){
				$.smallBox({
	                title: response.message,
	                content: "[" + response.code + "]",
	                color: "#739E73",
					icon: "fa fa-check-o swing animated",
	                timeout: 4000
	            });
				$scope.refreshList();
			}, function(errorResponse) {
				$scope.registration.message = {text: errorResponse.message, type: "error"};
			});
		};

		$scope.deleteProfile = function(employeeId) {
			var profile = $scope.profile.list[_.findIndex($scope.profile.list, 'employeeId', employeeId)];

			$.SmartMessageBox({
                title: "Delete User Profile!",
                content: "You are about to delete " + profile.firstName + " " + profile.lastName + "! Are you sure?",
                buttons: '[Cancel][Delete]'
            }, function (key_press) {
				if (key_press === "Delete") {
					AccountModel.deleteProfile(employeeId)
					.then(function(response){
						$.smallBox({
		                    title: response.message,
		                    content: "[" + response.code + "]",
		                    color: "#739E73",
							icon: "fa fa-trash-o swing animated",
		                    timeout: 4000
		                });
	                    $scope.refreshList();
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
