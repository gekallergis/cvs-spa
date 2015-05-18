define(['shared/utils/module'], function(module){

    "use strict";
    return module.registerDirective('cvsShortcutMenu', function(){
    	return {
            restrict: 'A',
            replace: true,
            templateUrl: 'app/shared/utils/directives/shortcut-menu/shortcut-menu.tpl.html',
            controller: function($scope, $element, $attrs, AccountModel, $log) {
                var loggedin_user = AccountModel.getLoggedInUser();

                $scope.currentUser = {};
                $scope.currentUser.id = loggedin_user.employeeId;
            }
        };
    });
});
