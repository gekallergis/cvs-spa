define(['components/account/module'], function(module){

    "use strict";

    return module.registerDirective('cvsAccountInfo', function(){
        return {
            restrict: 'A',
            templateUrl: 'app/components/account/directives/account-info/account-info.tpl.html',
            controller: function($scope, $element, $attrs, AccountModel) {
                var loggedin_user = AccountModel.getLoggedInUser();

                $scope.user = {};
                $scope.user.username = loggedin_user.firstName + " " + loggedin_user.lastName;
                $scope.user.image = loggedin_user.photoPath;
            }
        };
    });
});
