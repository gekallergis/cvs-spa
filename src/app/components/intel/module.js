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
                            'components/intel/controllers/system-log',
                            'components/intel/directives/system-log',
                            'components/intel/filters/system-log',
                            'components/intel/services/system-log',
                        ])
                    }
                }
            },
            data: {
                title: 'System Log'
            }
        });
    });

    module.run(function($couchPotato){
        module.lazy = $couchPotato;
    });

    return module;
});
