define(['components/account/module', 'lodash'], function (module, _) {

	'use strict';
	module.registerController('ProfileListController', function ($scope, AccountModel, $state, $log) {
		$scope.np = {};
		$scope.profile = {};
		$scope.profile.list = AccountModel.getProfileList();
		
		$scope.modalVisibility = false;
		$scope.showModal = function(){
	        $scope.modalVisibility = !$scope.modalVisibility;
	    };

		$scope.refreshList = function() {
			$state.go($state.current, {}, {reload: true});
		};

		$scope.addNewProfile = function() {
			AccountModel.addProfile({
				"first_name": $scope.np.first_name,
				"last_name": $scope.np.last_name,
				"password": $scope.np.password,
			}).then(function(){
				$scope.refreshList();
			});
		};

		$scope.deleteProfile = function(id) {
			var profile = $scope.profile.list[_.findIndex($scope.profile.list, 'id', id)];

			$.SmartMessageBox({
                title: "Delete User Profile!",
                content: "You are about to delete " + profile.first_name + " " + profile.last_name + "! Are you sure?",
                buttons: '[Cancel][Delete]'
            }, function (key_press) {
				if (key_press === "Delete") {
					AccountModel.deleteProfile(id)
					.then(function(){
						$.smallBox({
	                        title: "User Profile Deleted",
	                        content: "User " + profile.first_name + " " + profile.last_name + " was deleted!",
	                        color: "#C46A69",
	                        icon: "fa fa-trash-o swing animated",
	                        timeout: 4000
	                    });
	                    $scope.refreshList();
					});
                }
            });
		};
	});
});
