define(['components/intel/module'], function(module){

    "use strict";
    return module.registerDirective('cvsSystemLog', function(){
    	return {
            restrict: "A",
            replace: true,
            scope: true,
            templateUrl: "app/components/intel/partials/system-log.tpl.html",
            controller: 'SystemLogController'
        }
    });
});
