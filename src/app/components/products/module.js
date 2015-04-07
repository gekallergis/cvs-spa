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
                            'shared/cvs-model/models/invoice-model',
                            'shared/utils/directives/table-tools/datatable-basic',
                            'components/products/directives/invoice-list/invoice-list',
                            'components/products/controllers/invoice-list'
                        ]),
                        invoices: function(InvoiceModel) {
                            return InvoiceModel.getInvoices();
                        }
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
        .state('app.order', {
            url: '/order',
            views: {
                'content@app': {
                    templateUrl: 'app/components/products/partials/orders.html',
                    resolve: {
                        deps: $couchPotatoProvider.resolveDependencies([
                            'shared/cvs-model/models/order-model',
                            'shared/utils/directives/table-tools/datatable-basic',
                            'components/products/directives/order-list/order-list',
                            'components/products/controllers/order-list'
                        ]),
                        orders: function(OrderModel) {
                            return OrderModel.getOrders();
                        }
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
