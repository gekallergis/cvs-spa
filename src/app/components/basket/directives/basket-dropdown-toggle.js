define(['components/basket/module'], function(module){
    
    "use strict";
    return module.registerDirective('basketDropdownToggle', function() {
    	return {
    		restrict: 'EA',
    		link: function(scope, iElement, iAttrs) {
    			var ajax_dropdown = null;

				iElement.on('click', function(){
					ajax_dropdown = $(this).next('.ajax-dropdown');

					if (!ajax_dropdown.is(':visible')) {
						ajax_dropdown.fadeIn(150);
						$(this).addClass('active');
					} else {
						ajax_dropdown.fadeOut(150);
						$(this).removeClass('active');
					}
				});

				$(document).mouseup(function(e) {
					if (ajax_dropdown && !ajax_dropdown.is(e.target) && ajax_dropdown.has(e.target).length === 0) {
						ajax_dropdown.fadeOut(150);
						iElement.removeClass('active');
					}
				});
    		}
    	};
	});
});
