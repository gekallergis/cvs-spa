define(['components/account/module'], function(module){
    "use strict";

    return module.registerDirective('cvsShortcutMenu', function(){
    	return {
            restrict: 'A',
            replace: true,
            templateUrl: 'app/components/account/directives/shortcut-menu/shortcut-menu.tpl.html'
        };
    });
});
