define(['modules/auth/module'], function(module){
    "use strict";

    return module.registerDirective('loginInfo', function(User){

        return {
            restrict: 'A',
            templateUrl: 'app/modules/auth/directives/login-info.tpl.html',
            link: function(scope, element){
                User.initialized.then(function(){
                    scope.user = User
                });
            }
        }
    })
});
