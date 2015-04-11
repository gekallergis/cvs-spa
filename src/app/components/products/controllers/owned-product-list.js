define(['components/products/module', 'lodash'], function (module, _) {

	'use strict';
	module.registerController('OwnedProductListController', function ($scope, ProductModel, $state, $log) {
		$scope.owned_products = {};
		$scope.owned_products.list = ProductModel.getOwnedProductList();

		$scope.refreshList = function() {
			$state.go($state.current, {}, {reload: true});
		};
	});
});
