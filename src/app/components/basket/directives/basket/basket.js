define(['components/basket/module'], function(module){
    
    "use strict";
    return module.registerDirective('cvsBasket', function() {
    	return {
    		restrict: 'EA',
    		controller: 'BasketController',
    		templateUrl: 'app/components/basket/directives/basket/basket.html',
    	};
	});
});
