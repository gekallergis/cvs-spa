define(['shared/utils/module'], function(module){
    "use strict";

    return module.registerDirective('cvsShortcutMenu', function(){
    	return {
            restrict: 'A',
            replace: true,
            templateUrl: 'app/shared/utils/directives/shortcut-menu/shortcut-menu.tpl.html'
        };
    });
});
