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
                    'modules/forms/directives/validate/smartValidateForm'
                ]),
                //delay: function($q, $timeout) {
                //    var def = $q.defer();
                //    
                //    $timeout(function(){
                //        def.resolve();
                //    }, 5000);
                //    
                //    return def.promise;
                //}
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
                            'components/account/directives/profile-list/profile-list',
                            'components/account/controllers/profile-list'
                        ]),
                        profiles: function(AccountModel) {
                            return AccountModel.getProfiles();
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
                    templateUrl: 'app/components/account/partials/user-profile.html'
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
                            'components/account/directives/company-list/company-list',
                            'components/account/controllers/company-list'
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
                    controller: 'TreeViewController',
                    templateUrl: 'app/components/account/partials/company-profile.html'
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
