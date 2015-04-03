define(['shared/language/module'], function(module){

    "use strict";
    return module.registerDirective('cvsLanguageSelector', function(){
    	return {
            restrict: "A",
            replace: true,
            scope: true,
            templateUrl: "app/shared/language/partials/language-selector.tpl.html",
            controller: 'LanguageController'
        }
    });
});
