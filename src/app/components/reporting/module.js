define(['angular', 'angular-couch-potato', 'angular-ui-router'], function (ng, couchPotato) {
    
    'use strict';
    var module = ng.module('app.reporting', ['ui.router']);

    couchPotato.configureApp(module);

    module.config(function ($stateProvider, $couchPotatoProvider) {
        $stateProvider.state('app.salesdata', {
            url: '/salesdata',
            views: {
                "content@app": {
                    templateUrl: 'app/components/reporting/partials/sales-data.html',
                    resolve: {
                        deps: $couchPotatoProvider.resolveDependencies([
                            'shared/utils/directives/file-upload/smart-dropzone',
                            'shared/utils/directives/table-tools/datatable-basic',
                        ])
                    }
                }
            },
            data: {
                title: 'Sales Data'
            },
        })
        .state('app.reports', {
            url: '/reports',
            views: {
                "content@app": {
                    templateUrl: 'app/components/reporting/partials/reports.html',
                    resolve: {
                        deps: $couchPotatoProvider.resolveDependencies([
                            'shared/utils/directives/table-tools/datatable-basic',
                        ])
                    }
                }
            },
            data: {
                title: 'Sales Data'
            },
        })
    });

    module.run(function($couchPotato){
        module.lazy = $couchPotato;
    });

    return module;
});
