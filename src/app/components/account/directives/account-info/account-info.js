define(['components/account/module'], function(module){

    "use strict";

    return module.registerDirective('cvsAccountInfo', function(){
        return {
            restrict: 'A',
            templateUrl: 'app/components/account/directives/account-info/account-info.tpl.html',
            controller: function($scope, $element, $attrs, AccountModel) {
                var loggedin_user = AccountModel.getLoggedInUser();

                $scope.user = {};
                $scope.user.username = loggedin_user.first_name + " " + loggedin_user.last_name;
                $scope.user.image = loggedin_user.image;
            }
        };
    });
});
