define(['components/products/module', 'lodash'], function (module, _) {

	'use strict';
	module.registerController('ProductListController', function ($rootScope, $scope, ProductModel, $state, $log) {
		$scope.product = {};
		$scope.product.list = ProductModel.getProductList();

		$scope.refreshList = function() {
			$state.go($state.current, {}, {reload: true});
		};

		$scope.addItemToBasket = function(item) {
			$rootScope.$broadcast('OrderModel::addBasketItem', item);

			$.smallBox({
	            title: "Added to Basket!",
	            content: "The product " + item.name + " was added to your basket!",
	            color: "#739E73",
	            iconSmall: "fa fa-check swing animated",
	            timeout: 2000
	        });
		}
	});
});
