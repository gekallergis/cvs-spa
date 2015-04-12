define(['components/account/module'], function(module){

    "use strict";
    return module.registerDirective('cvsUserProfile', function(){
    	return {
            restrict: "A",
            replace: true,
            scope: true,
            templateUrl: function() {
				return 'app/components/account/directives/user-profile/user-profile.tpl.html';
            },
            controller: 'UserProfileController'
        }
    });
});
