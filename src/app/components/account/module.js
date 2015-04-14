define(['angular', 'angular-couch-potato', 'angular-ui-router'], function (ng, couchPotato) {

    "use strict";
    var module = ng.module('app.account', ['ui.router']);

    couchPotato.configureApp(module);

    module.config(function ($stateProvider, $couchPotatoProvider) {
        $stateProvider.state('login', {
            url: '/login',
            views: {
                'root': {
                    templateUrl: 'app/components/account/partials/login.html'
                }
            },
            data: {
                title: 'Login',
                htmlId: 'extr-page'
            },
            resolve: {
                deps: $couchPotatoProvider.resolveDependencies([
                    'shared/utils/directives/validator/smart-validate-form',
                    'components/account/controllers/login'
                ])
            }
        })
        .state('register', {
            url: '/register',
            views: {
                'root': {
                    templateUrl: 'app/components/account/partials/register.html'
                }
            },
            data: {
                title: 'Register',
                htmlId: 'extr-page'
            },
            resolve: {
                deps: $couchPotatoProvider.resolveDependencies([
                    'modules/forms/directives/validate/smartValidateForm'
                ])
            }
        })
        .state('forgotPassword', {
            url: '/forgot-password',
            views: {
                'root': {
                    templateUrl: 'app/components/account/partials/forgot-password.html'
                }
            },
            data: {
                title: 'Password Recovery',
                htmlId: 'extr-page'
            },
            resolve: {
                deps: $couchPotatoProvider.resolveDependencies([
                    'modules/forms/directives/validate/smartValidateForm'
                ])
            }
        })
        .state('lock', {
            url: '/lock',
            views: {
                'root': {
                    templateUrl: 'app/components/account/partials/lock.html'
                }
            },
            data: {
                title: 'Locked',
                htmlId: 'lock-page'
            }
        })
        .state('app.profile', {
            url: '/profile',
            views: {
                "content": {
                    templateUrl: 'app/components/account/partials/profile-list.html',
                    resolve: {
                        deps: $couchPotatoProvider.resolveDependencies([
                            'shared/cvs-model/models/account-model',
                            'shared/utils/directives/table-tools/datatable-basic',
                            'shared/utils/directives/modal-window/modal-window',
                            'shared/utils/directives/validator/smart-validate-form',
                            'components/account/directives/profile-list/profile-list',
                            'components/account/controllers/profile-list'
                        ]),
                        profiles: function(AccountModel) {
                            return AccountModel.getProfiles();
                        },
                        companies: function(AccountModel) {
                            return AccountModel.getCompanies();
                        }
                    }
                }
            },
            data: {
                title: 'Profiles'
            }
        })
        .state('app.profile.details', {
            url: '/:profileId',
            views: {
                "content@app": {
                    templateUrl: 'app/components/account/partials/user-profile.html',
                    resolve: {
                        deps: $couchPotatoProvider.resolveDependencies([
                            'shared/cvs-model/models/account-model',
                            'shared/cvs-model/models/product-model',
                            'shared/utils/directives/modal-window/modal-window',
                            'shared/utils/directives/validator/smart-validate-form',
                            'components/account/directives/user-profile/user-profile',
                            'components/account/controllers/user-profile',
                            'components/products/directives/product-list/product-list',
                            'components/products/controllers/product-list'
                        ]),
                        user_profile: function(AccountModel, $stateParams) {
                            return AccountModel.getUserProfile($stateParams.profileId);
                        },
                        products: function(ProductModel) {
                            return ProductModel.getProducts();
                        }
                    }
                }
            },
            data: {
                title: 'Profile'
            }
        })
        .state('app.company', {
            url: '/company',
            views: {
                "content": {
                    templateUrl: 'app/components/account/partials/company-list.html',
                    resolve: {
                        deps: $couchPotatoProvider.resolveDependencies([
                            'shared/cvs-model/models/account-model',
                            'shared/utils/directives/table-tools/datatable-basic',
                            'shared/utils/directives/modal-window/modal-window',
                            'shared/utils/directives/validator/smart-validate-form',
                            'components/account/directives/company-list/company-list',
                            'components/account/controllers/company-list',
                        ]),
                        companies: function(AccountModel) {
                            return AccountModel.getCompanies();
                        }
                    }
                }
            },
            data: {
                title: 'Companies'
            }
        })
        .state('app.company.details', {
            url: '/:companyId',
            views: {
                "content@app": {
                    templateUrl: 'app/components/account/partials/company-profile.html',
                    resolve: {
                        deps: $couchPotatoProvider.resolveDependencies([
                            'shared/cvs-model/models/account-model',
                            'shared/utils/directives/modal-window/modal-window',
                            'shared/utils/directives/validator/smart-validate-form',
                            'components/account/directives/company-profile/company-profile',
                            'components/account/controllers/company-profile'
                        ]),
                        company_profile: function(AccountModel, $stateParams) {
                            return AccountModel.getCompanyProfile($stateParams.companyId);
                        },
                        profiles: function(AccountModel) {
                            return AccountModel.getProfiles();
                        }
                    }
                }
            },
            data: {
                title: 'Company Profile'
            }
        });
    });

    module.run(function($couchPotato){
        module.lazy = $couchPotato;
    });

    return module;
});
