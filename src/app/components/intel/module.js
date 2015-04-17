define(['angular', 'angular-couch-potato', 'angular-ui-router'], function (ng, couchPotato) {
    
    'use strict';
    var module = ng.module('app.intel', ['ui.router']);

    couchPotato.configureApp(module);

    module.config(function ($stateProvider, $couchPotatoProvider) {
        $stateProvider.state('app.intel', {
            url: '/intel',
            abstract: true,
            template: '<ui-view />',
            data:{
                title: 'Intel'
            }
        })

        .state('app.intel.log', {
            url: '/log',
            views: {
                "content@app": {
                    templateUrl: 'app/components/intel/partials/system-log.html',
                    resolve: {
                        deps: $couchPotatoProvider.resolveDependencies([
							'shared/cvs-model/models/intel-model',
                            'components/intel/controllers/system-log',
                            'components/intel/directives/system-log',
                            'components/intel/filters/system-log'
                        ]),
                        sys_log: function(IntelModel) {
                        	return IntelModel.getSystemLog('ASC');
                        }
                    }
                }
            },
            data: {
                title: 'System Log',
                auth: {
                    requireLogin: true,
                    requiredRoles: ["1"]
                }
            }
        });
    });

    module.run(function($couchPotato){
        module.lazy = $couchPotato;
    });

    return module;
});
