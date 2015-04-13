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
                        deps: $couchPotatoProvider.resolveDependencies([
                            'shared/cvs-model/models/product-model',
                            'components/products/directives/product-list/product-list',
                            'components/products/controllers/product-list',
                            'components/products/filters/string-split',
                        ]),
                        products: function(ProductModel) {
                            return ProductModel.getProducts();
                        }
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
                            'shared/cvs-model/models/product-model',
                            'shared/cvs-model/models/sales-data-model',
                            'shared/utils/directives/modal-window/modal-window',
                            'shared/utils/directives/validator/smart-validate-form',
                            'shared/utils/directives/table-tools/datatable-basic',
                            'components/products/directives/owned-product-list/owned-product-list',
                            'components/products/controllers/owned-product-list'
                        ]),
                        owned_products: function(ProductModel) {
                            return ProductModel.getOwnedProducts();
                        },
                        sales_data: function(SalesDataModel) {
                            return SalesDataModel.getSalesData();
                        }
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
                            'shared/utils/filters/capitalize',
                            'components/products/directives/invoice-list/invoice-list',
                            'components/products/controllers/invoice-list',

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
                    templateUrl: 'app/components/products/partials/invoice.html',
                    resolve: {
                        deps: $couchPotatoProvider.resolveDependencies([
                            'shared/cvs-model/models/invoice-model',
                            'components/products/directives/invoice-details/invoice-details',
                            'components/products/controllers/invoice-details'
                        ]),
                        invoice: function(InvoiceModel, $stateParams) {
                            return InvoiceModel.getInvoice($stateParams.invoiceId);
                        }
                    }
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
