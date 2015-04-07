define(['components/account/module'], function(module){

    "use strict";
    return module.registerDirective('cvsProfileList', function(){
    	return {
            restrict: "A",
            replace: true,
            scope: true,
            templateUrl: 'app/components/account/directives/profile-list/profile-list.tpl.html',
            controller: 'ProfileListController'
        }
    });
});
