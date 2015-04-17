define(['angular', 'angular-couch-potato', 'lodash', 'angular-ui-router', 'angular-animate', 'angular-bootstrap', 'angular-ui-select2', 'smartwidgets', 'notification'], function (ng, couchPotato, _) {

    'use strict';
    var app = ng.module('app', [
        'ngSanitize',

        'scs.couch-potato',
        'ngAnimate',
        'ui.router',
        'ui.bootstrap',
        'ui.select2',
        
        // App
        'app.seed',
        'app.cvs-model',
        'app.layout',
        'app.utils',
        'app.language',
        'app.account',
        'app.inbox',
        'app.products',
        'app.reporting',
        'app.widgets',
        'app.intel',
        'app.basket',
        //'app.dashboard',
        //'app.auth',
        //'app.chat',
        //'app.calendar',
        //'app.graphs',
        //'app.tables',
        //'app.forms',
        //'app.ui',
        //'app.maps',
        //'app.appViews',
        //'app.misc',
        //'app.smartAdmin'
    ]);

    couchPotato.configureApp(app);

    app.config(function ($provide, $httpProvider) {

        // Intercept http calls.
        $provide.factory('ErrorHttpInterceptor', function ($q) {
            var errorCounter = 0;
            function notifyError(rejection){
                console.log(rejection);
                $.bigBox({
                    title: rejection.status + ' ' + rejection.statusText,
                    content: rejection.data,
                    color: "#C46A69",
                    icon: "fa fa-warning shake animated",
                    number: ++errorCounter,
                    timeout: 6000
                });
            }

            return {
                // On request failure
                requestError: function (rejection) {
                    // show notification
                    notifyError(rejection);

                    // Return the promise rejection.
                    return $q.reject(rejection);
                },

                // On response failure
                responseError: function (rejection) {
                    // show notification
                    notifyError(rejection);
                    // Return the promise rejection.
                    return $q.reject(rejection);
                }
            };
        });

        // Add the interceptor to the $httpProvider.
        $httpProvider.interceptors.push('ErrorHttpInterceptor');
    });

    app.run(function ($couchPotato, $rootScope, $state, $stateParams, AccountModel) {
        app.lazy = $couchPotato;
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        // editableOptions.theme = 'bs3';

        // Authorization
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
            if (toState.data == undefined || toState.data.auth == undefined) {
                return;
            }

            var auth = toState.data.auth;

            if (auth.requireLogin && AccountModel.getLoggedInUser() == null) {
                event.preventDefault();
                $state.go('login', {message: {text: "You need to be logged in to view '" + toState.data.title + "' page!", type: "info"}}, {reload: true});
            } else if (!AccountModel.authorize(auth.requiredRoles)) {
                event.preventDefault();
                $state.reload();
            }
        });
    });

    return app;
});
