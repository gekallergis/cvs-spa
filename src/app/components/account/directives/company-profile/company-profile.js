define(['components/account/module'], function(module){

    "use strict";
    return module.registerDirective('cvsCompanyProfile', function(){
    	return {
            restrict: "A",
            replace: true,
            scope: true,
            templateUrl: function() {
				return 'app/components/account/directives/company-profile/company-profile.tpl.html';
            },
            controller: 'CompanyProfileController'
        }
    });
});
