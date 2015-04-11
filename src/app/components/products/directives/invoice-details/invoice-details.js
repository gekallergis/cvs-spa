define(['components/products/module'], function(module){

    "use strict";
    return module.registerDirective('cvsInvoiceDetails', function(){
    	return {
            restrict: "A",
            replace: true,
            scope: true,
            templateUrl: function() {
				return 'app/components/products/directives/invoice-details/invoice-details.tpl.html';
            },
            controller: 'InvoiceDetailsController'
        }
    });
});
