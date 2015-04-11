define(['components/products/module'], function(module){

    "use strict";
    return module.registerDirective('cvsProductList', function(){
    	return {
            restrict: "A",
            replace: true,
            scope: true,
            templateUrl: function() {
				return 'app/components/products/directives/product-list/product-list.tpl.html';
            },
            controller: 'ProductListController'
        }
    });
});
