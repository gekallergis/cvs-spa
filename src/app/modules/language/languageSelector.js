define(['app'], function(module){
    "use strict";

    module.registerDirective('languageSelector', function(Language){
        return {
            restrict: "EA",
            replace: true,
            templateUrl: "app/modules/language/language-selector.tpl.html",
            scope: true,
        }
    })
});