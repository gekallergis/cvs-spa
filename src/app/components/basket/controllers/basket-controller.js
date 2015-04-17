define(['components/basket/module'], function(module){

    "use strict";
    return module.registerController('BasketController', function($scope, OrderModel, $state, $log) {
    	$scope.basket = {};
    	$scope.basket.total = 0;
    	$scope.basket.items = [];

		$scope.$on('OrderModel::basketUpdate', function() {
	        $scope.basket = OrderModel.getBasket();
	    });

		$scope.$on('OrderModel::addBasketItem', function(event, item) {
	    	OrderModel.addItem(item);
	    });	    

		$scope.increaseQty = function(id) {
			OrderModel.increaseQty(id);
		};

		$scope.decreaseQty = function(id) {
			OrderModel.decreaseQty(id);
		};

		$scope.removeItem = function(id) {
			OrderModel.removeItem(id);
		};

		$scope.checkout = function() {
			$.SmartMessageBox({
                title: "Place an Order!",
                content: "You are about to place an order with Customer Value Sweden AB for " + $scope.basket.total + "SEK! Click \'Confirm\' to complete the order!",
                buttons: '[Cancel][Confirm]'
            }, function (key_press) {
				if (key_press === "Confirm") {
					OrderModel.placeOrder()
					.then(function(){
						OrderModel.emptyBasket();
						$.smallBox({
	                        title: "Successfull Order!",
	                        content: "You order has been placed, you can see the invoice issued for you here!",
	                        color: "#739E73",
	                        icon: "fa fa-check-square-o swing animated",
	                        timeout: 4000
	                    });
	                    $state.go('app.invoice.details', {invoiceId: 1});
					});
                }
            });
		};
    });
});
