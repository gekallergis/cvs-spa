define(['components/account/module'], function(module){

    "use strict";

    return module.registerDirective('cvsAccountInfo', function(){
        return {
            restrict: 'A',
            templateUrl: 'app/components/account/directives/account-info/account-info.tpl.html',
            link: function(scope, element){
                //User.initialized.then(function(){
                //    scope.user = User
                //});
                scope.user = {};
                scope.user.username = "George Kallergis";
                scope.user.picture = "assets/img/avatars/george.png";
            }
        };
    });
});
