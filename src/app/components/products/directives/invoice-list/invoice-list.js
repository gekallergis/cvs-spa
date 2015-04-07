define(['components/products/module'], function(module){

    "use strict";
    return module.registerDirective('cvsInvoiceList', function(){
    	return {
            restrict: "A",
            replace: true,
            scope: true,
            templateUrl: 'app/components/products/directives/invoice-list/invoice-list.tpl.html',
            controller: 'InvoiceListController'
        }
    });
});
