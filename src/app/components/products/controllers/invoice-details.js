define(['components/products/module', 'lodash'], function (module, _) {

	'use strict';
	module.registerController('InvoiceDetailsController', function ($scope, InvoiceModel, $state) {
		$scope.invoice = InvoiceModel.getCurrentInvoice();

		$scope.refreshList = function() {
			$state.go($state.current, {}, {reload: true});
		};

		$scope.settleInvoice = function(id) {
			InvoiceModel.settleInvoice(id)
			.then(function(){
				$scope.refreshList();
			});
		};
	});
});
