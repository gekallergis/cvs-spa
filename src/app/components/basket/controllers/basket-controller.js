define(['components/basket/module'], function(module){

    "use strict";
    return module.registerController("BasketController", function($scope, $log, BasketService){
    	$scope.activeTab = 'default';
		$scope.currentActivityItems = [];
		$scope.itemsCount = 0;
		
		// Getting different type of activites
		BasketService.get(function(data){
			$scope.activities = data.activities;
		});


		$scope.isActive = function(tab){
			return $scope.activeTab === tab;
		};

		$scope.setTab = function(activityType){
			$scope.activeTab = activityType;
			BasketService.getbytype(activityType, function(data) {
				$scope.currentActivityItems = data.data;
			});
		};
    });
});
