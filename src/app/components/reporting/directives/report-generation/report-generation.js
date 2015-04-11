define(['components/reporting/module'], function(module){

    "use strict";
    return module.registerDirective('cvsReportGeneration', function(){
    	return {
            restrict: "A",
            replace: true,
            scope: true,
            templateUrl: function() {
				return 'app/components/reporting/directives/report-generation/report-generation.tpl.html';
            },
            controller: 'ReportGenerationController'
        }
    });
});
