define(['components/account/module', 'lodash'], function (module, _) {

	'use strict';
	module.registerController('ProfileListController', function ($scope, AccountModel, $state) {
		$scope.profile = {};
		$scope.profile.list = AccountModel.getProfileList();

		$scope.refreshList = function() {
			$state.go($state.current, {}, {reload: true});
		};

		$scope.addNewProfile = function() {
			AccountModel.addProfile({
				"first_name": $scope.np.first_name,
				"last_name": $scope.np.last_name,
				"company_name": $scope.np.company_name,
				"company_phone": $scope.np.company_phone,
				"company_city": $scope.np.company_city,
				"company_zip": $scope.np.company_zip
			}).then(function(){
				$scope.refreshList();
			});
		};

		$scope.deleteProfile = function(id) {
			AccountModel.deleteProfile(id)
			.then(function(){
				$scope.refreshList();
			});
		};
	});
});
