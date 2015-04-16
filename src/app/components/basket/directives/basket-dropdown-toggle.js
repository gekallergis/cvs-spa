define(['components/basket/module'], function(module){
    
    "use strict";
    return module.registerDirective('basketDropdownToggle', function() {
    	return {
    		restrict: 'EA',
    		link: function(scope, iElement, iAttrs) {
    			var basket_dropdown = null;

				iElement.on('click', function(){
					basket_dropdown = $(this).next('.ajax-dropdown');

					if (!basket_dropdown.is(':visible')) {
						basket_dropdown.fadeIn(150);
						$(this).addClass('active');
					} else {
						basket_dropdown.fadeOut(150);
						$(this).removeClass('active');
					}
				});

				$(document).mouseup(function(e) {
					if (basket_dropdown && !basket_dropdown.is(e.target) && basket_dropdown.has(e.target).length === 0) {
						basket_dropdown.fadeOut(150);
						iElement.removeClass('active');
					}
				});
    		}
    	};
	});
});
