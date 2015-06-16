define(['components/basket/module'], function(module){

    "use strict";
    return module.registerController('BasketController', function($scope, AccountModel, OrderModel, $state, $log) {
    	$scope.basket = {};
    	$scope.basket.total = 0;
    	$scope.basket.items = [];
    	$scope.companies = generateSmartAlertCompanyList(AccountModel.getCompanyList());

		$scope.$on('OrderModel::basketUpdate', function() {
	        $scope.basket = OrderModel.getBasket();
	    });

		$scope.$on('OrderModel::addBasketItem', function(event, item) {
			$log.debug(item);
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

		function generateSmartAlertCompanyList(companies) {
			var alertList = "";

			_.forEach(companies, function(company) {
				alertList += "[" + company.name + "]";
			});

			return alertList;
		}

		function getCompanyIdFromName(companyName) {
			return _.result(_.find(AccountModel.getCompanyList(), {name: companyName}), 'companyId');
		}

		$scope.checkout = function() {
			var messageBoxOptions = {
                title: "Place an Order!",
                content: "You are about to place an order with Customer Value Sweden AB for " + $scope.basket.total + "SEK! Click \'Confirm\' to complete the order!",
                buttons: '[Cancel][Confirm]',
                input: "select",
    			options: $scope.companies
            };

			$.SmartMessageBox(messageBoxOptions, function (key_press, company) {
				if (key_press === "Confirm") {
					OrderModel.placeOrder(getCompanyIdFromName(company))
					.then(function(response){
						OrderModel.emptyBasket();
						$.smallBox({
	                        title: response.message,
	                        content: "[" + response.code + "]",
	                        color: "#739E73",
	                        icon: "fa fa-check-square-o swing animated",
	                        timeout: 4000
	                    });
	                    $state.go('app.invoice.details', {invoiceId: 1});
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
