define(['angular', 'angular-couch-potato', 'angular-ui-router', 'angular-google-plus', 'angular-easyfb'], function (ng, couchPotato) {

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
                ])
            }
        })

        .state('register', {
            url: '/register',
            views: {
                root: {
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
                root: {
                    templateUrl: 'app/components/account/partials/forgot-password.html'
                }
            },
            data: {
                title: 'Forgot Password',
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
                root: {
                    templateUrl: 'app/components/account/partials/lock.html'
                }
            },
            data: {
                title: 'Locked Screen',
                htmlId: 'lock-page'
            }
        })
    })

    module.run(function($couchPotato){
        module.lazy = $couchPotato;
    });

    return module;
});
