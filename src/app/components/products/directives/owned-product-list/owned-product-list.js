define(['components/products/module'], function(module){

    "use strict";
    return module.registerDirective('cvsOwnedProductList', function(){
    	return {
            restrict: "A",
            replace: true,
            scope: true,
            templateUrl: function() {
				return 'app/components/products/directives/owned-product-list/owned-product-list.tpl.html';
            },
            controller: 'OwnedProductListController'
        }
    });
});
