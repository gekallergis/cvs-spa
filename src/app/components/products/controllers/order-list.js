define(['components/products/module', 'lodash'], function (module, _) {

	'use strict';
	module.registerController('OrderListController', function ($scope, OrderModel, $state, $log) {
		$scope.order = {};
		$scope.order.list = OrderModel.getOrderList();

		$scope.$on('OrderModel::currentOrderChanged', function() {
	        $scope.order.current = OrderModel.getCurrentOrder();
	    });

		$scope.refreshList = function() {
			$state.go($state.current, {}, {reload: true});
		};

		$scope.setCurrentOrder = function(orderHeaderId) {
			OrderModel.setCurrentOrder(orderHeaderId);
		};

		$scope.refundOrder = function(orderHeaderId) {
			OrderModel.refundOrder(orderHeaderId)
			.then(function(response){
				$.smallBox({
                    title: response.message,
                    content: "[" + response.code + "]",
                    color: "#739E73",
					icon: "fa fa-check-square-o swing animated",
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
		};
	});
});
