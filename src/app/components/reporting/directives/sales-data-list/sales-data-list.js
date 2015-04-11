define(['components/reporting/module'], function(module){

    "use strict";
    return module.registerDirective('cvsSalesDataList', function(){
    	return {
            restrict: "A",
            replace: true,
            scope: true,
            templateUrl: function() {
				return 'app/components/reporting/directives/sales-data-list/sales-data-list.tpl.html';
            },
            controller: 'SalesDataListController'
        }
    });
});
