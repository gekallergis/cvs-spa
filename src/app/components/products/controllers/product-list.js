define(['components/products/module', 'lodash'], function (module, _) {

	'use strict';
	module.registerController('ProductListController', function ($scope, ProductModel, $state, $log) {
		$scope.product = {};
		$scope.product.list = ProductModel.getProductList();

		$scope.refreshList = function() {
			$state.go($state.current, {}, {reload: true});
		};
	});
});
