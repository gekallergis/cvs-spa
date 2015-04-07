define(['components/products/module'], function(module){

    "use strict";
    return module.registerDirective('cvsOrderList', function(){
    	return {
            restrict: "A",
            replace: true,
            scope: true,
            templateUrl: 'app/components/products/directives/order-list/order-list.tpl.html',
            controller: 'OrderListController'
        }
    });
});
