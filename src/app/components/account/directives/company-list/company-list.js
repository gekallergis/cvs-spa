define(['components/account/module'], function(module){

    "use strict";
    return module.registerDirective('cvsCompanyList', function(){
    	return {
            restrict: "A",
            replace: true,
            scope: true,
            templateUrl: "app/components/account/directives/company-list/company-list.tpl.html",
            controller: 'CompanyListController'
        }
    });
});
