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
            function notifyError(errorResponse){
                console.log(errorResponse);
                $.bigBox({
                    title: errorResponse.status + ' ' + errorResponse.statusText,
                    content: "[" + errorResponse.data.code + "] " + errorResponse.data.message,
                    color: "#C46A69",
                    icon: "fa fa-warning shake animated",
                    timeout: 5000
                });
            }

            return {
                // On request failure
                requestError: function (errorResponse) {
                    // show notification
                    notifyError(errorResponse);

                    // Return the promise errorResponse.
                    return $q.reject(errorResponse);
                },

                // On response failure
                responseError: function (errorResponse) {
                    // show notification
                    notifyError(errorResponse);
                    // Return the promise errorResponse.
                    return $q.reject(errorResponse);
                }
            };
        });

        // Add the interceptor to the $httpProvider.
        $httpProvider.interceptors.push('ErrorHttpInterceptor');
    });

    app.run(function ($couchPotato, $rootScope, $state, $stateParams, $log, AccountModel) {
        app.lazy = $couchPotato;
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        // Check if the user is logged in already upon every refresh to avoid loggin out!
        // AccountModel.login("", "")
        // .then(function(response){
        //     $state.go('app.profile.details', {profileId: AccountModel.getLoggedInUser().id});
        // }, function(errorResponse){
        //     $state.go('login', {reload: true});
        // });

        // Authorization
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
            if (toState.data == undefined || toState.data.auth == undefined) {
                return;
            }

            var auth = toState.data.auth;

            if (auth.requireLogin && AccountModel.getLoggedInUser() == null) {
                event.preventDefault();
                $state.go('login', {message: {text: "You need to be logged in to view '" + toState.data.title + "' page!", type: "info"}}, {reload: true});
            } else if (auth.requiredRoles != undefined && !AccountModel.authorize(auth.requiredRoles)) {
                event.preventDefault();
                $state.reload();
            }
        });
    });

    return app;
});
