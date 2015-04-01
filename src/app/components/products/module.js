define(['angular', 'angular-couch-potato', 'lodash', 'angular-ui-router', 'angular-resource'], function (ng, couchPotato, _) {
    
    'use strict';
    var module = ng.module('app.products', ['ui.router', 'ngResource']);

    couchPotato.configureApp(module);

    module.config(function ($stateProvider, $couchPotatoProvider) {
        $stateProvider.state('app.products', {
            url: '/products',
            views: {
                'content@app': {
                    templateUrl: 'app/components/products/partials/product-list.html',
                    resolve: {
                        deps: $couchPotatoProvider.resolveDependencies([])
                    }
                }
            },
            data: {
                title: 'Products'
            }
        })
        .state('app.ownedproducts', {
            url: '/products/owned',
            views: {
                'content@app': {
                    templateUrl: 'app/components/products/partials/owned-product-list.html',
                    resolve: {
                        deps: $couchPotatoProvider.resolveDependencies([
                            'shared/utils/directives/table-tools/datatable-basic'
                        ])
                    }
                }
            },
            data: {
                title: 'Owned Products'
            }
        })
        .state('app.invoice', {
            url: '/invoice',
            views: {
                'content@app': {
                    templateUrl: 'app/components/products/partials/invoice-list.html',
                    resolve: {
                        deps: $couchPotatoProvider.resolveDependencies([
                            'shared/utils/directives/table-tools/datatable-basic'
                        ])
                    }
                }
            },
            data: {
                title: 'Invoices'
            }
        })
        .state('app.invoice.details', {
            url: '/:invoiceId',
            views: {
                "content@app": {
                    templateUrl: 'app/components/products/partials/invoice.html'
                }
            },
            data: {
                title: 'Invoice'
            }
        })
        .state('app.orders', {
            url: '/orders',
            views: {
                'content@app': {
                    templateUrl: 'app/components/products/partials/orders.html',
                    resolve: {
                        deps: $couchPotatoProvider.resolveDependencies([
                            'shared/utils/directives/table-tools/datatable-basic'
                        ])
                    }
                }
            },
            data: {
                title: 'Orders'
            }
        });
    });

    module.run(function($couchPotato){
        module.lazy = $couchPotato;
    });

    return module;
});
