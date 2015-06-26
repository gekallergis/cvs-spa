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
                            'shared/cvs-model/models/sales-data-model',
                            'shared/cvs-model/models/account-model',
                            'shared/utils/directives/file-upload/smart-dropzone',
                            'shared/utils/directives/table-tools/datatable-basic',
                            'components/reporting/directives/sales-data-list/sales-data-list',
                            'components/reporting/controllers/sales-data-list',
                            'components/reporting/directives/sales-data-upload/sales-data-upload',
                            'components/reporting/controllers/sales-data-upload'
                        ]),
                        sales_data: function(SalesDataModel) {
                            return SalesDataModel.getSalesData();
                        },
                        companies: function(AccountModel) {
                            return AccountModel.getCompanies();
                        }
                    }
                }
            },
            data: {
                title: 'Sales Data',
                auth: {
                    requireLogin: true
                }
            },
        })
        .state('app.reports', {
            url: '/reports',
            views: {
                "content@app": {
                    templateUrl: 'app/components/reporting/partials/report.html',
                    resolve: {
                        deps: $couchPotatoProvider.resolveDependencies([
                            'shared/cvs-model/models/report-model',
                            'shared/utils/directives/table-tools/datatable-basic',
                            'components/reporting/controllers/report-generation',
                            'components/reporting/directives/report-generation/report-generation'
                        ]),
                        reports: function(ReportModel) {
                            return ReportModel.getReports();
                        }
                    }
                }
            },
            data: {
                title: 'Reports',
                auth: {
                    requireLogin: true
                }
            },
        })
    });

    module.run(function($couchPotato){
        module.lazy = $couchPotato;
    });

    return module;
});
