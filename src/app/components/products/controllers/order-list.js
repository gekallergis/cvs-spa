define(['components/products/module', 'lodash'], function (module, _) {

	'use strict';
	module.registerController('OrderListController', function ($scope, OrderModel, $state) {
		$scope.order = {};
		$scope.order.list = OrderModel.getOrderList();

		$scope.$on('OrderModel::currentOrderChanged', function() {
	        $scope.order.current = OrderModel.getCurrentOrder();
	    });

		$scope.refreshList = function() {
			$state.go($state.current, {}, {reload: true});
		};

		$scope.setCurrentOrder = function(id) {
			OrderModel.setCurrentOrder(id);
		};

		$scope.refundOrder = function(id) {
			OrderModel.refundOrder(id)
			.then(function(){
				$scope.refreshList();
			});
		};
	});
});
