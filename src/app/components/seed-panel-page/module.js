define(['angular', 'angular-couch-potato', 'angular-ui-router'], function (ng, couchPotato) {
    
    'use strict';
    var module = ng.module('app.seed', ['ui.router']);

    couchPotato.configureApp(module);

    module.config(function ($stateProvider, $couchPotatoProvider) {
        $stateProvider
        .state('app.seed-panel-page', {
            url: '/seedpage',
            views: {
                "content@app": {
                    controller: 'SeedController',
                    templateUrl: 'app/components/seed-panel-page/partials/template.html',
                    resolve: {
                        deps: $couchPotatoProvider.resolveDependencies([])
                    }
                }
            },
            data:{
                title: 'Seed',
                auth: {
                    requireLogin: true
                }
            }
        });
    });

    module.run(function($couchPotato){
        module.lazy = $couchPotato;
    });

    return module;
});
