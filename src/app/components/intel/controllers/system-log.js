define(['components/intel/module', 'lodash'], function (module, _) {

    'use strict';
    module.registerController('SystemLogController', function ($scope, $log, SystemLogService) {
        $scope.log = {};

        SystemLogService.getSystemLog()
        .then(function(logs){
        	$scope.log.list = logs;
        });
    });
});
