define(['components/products/module', 'lodash'], function (module, _) {

	'use strict';
	module.registerController('InvoiceListController', function ($scope, InvoiceModel, $state, $log) {
		$scope.invoice = {};
		$scope.invoice.list = InvoiceModel.getInvoiceList();

		$scope.refreshList = function() {
			$state.go($state.current, {}, {reload: true});
		};
	});
});
