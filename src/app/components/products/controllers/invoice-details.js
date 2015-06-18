define(['components/products/module', 'lodash'], function (module, _) {

	'use strict';
	module.registerController('InvoiceDetailsController', function ($scope, InvoiceModel, $state) {
		$scope.invoice = InvoiceModel.getCurrentInvoice();

		$scope.refreshList = function() {
			$state.go($state.current, {}, {reload: true});
		};

		$scope.settleInvoice = function(invoiceId) {
			InvoiceModel.settleInvoice(invoiceId)
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
