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
                    templateUrl: 'app/components/intel/partials/log.html',
                    resolve: {
                        deps: $couchPotatoProvider.resolveDependencies([])
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
