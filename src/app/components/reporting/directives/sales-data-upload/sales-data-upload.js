define(['components/reporting/module'], function(module){

    "use strict";
    return module.registerDirective('cvsSalesDataUpload', function(){
    	return {
            restrict: "A",
            replace: true,
            scope: true,
            templateUrl: function() {
				return 'app/components/reporting/directives/sales-data-upload/sales-data-upload.tpl.html';
            },
            controller: 'SalesDataUploadController'
        }
    });
});
