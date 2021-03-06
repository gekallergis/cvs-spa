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
        var redirectionRequiredAfterLogin = false;
        var loginRedirectionState;
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
            if (toState.data == undefined || toState.data.auth == undefined) {
                return;
            }

            var auth = toState.data.auth;

            if(redirectionRequiredAfterLogin) {
                event.preventDefault();
                redirectionRequiredAfterLogin = false;
                $state.go(loginRedirectionState, {}, {reload: true});
            } else if (auth.requireLogin && AccountModel.getLoggedInUser() == null) {
                event.preventDefault();
                redirectionRequiredAfterLogin = true;
                loginRedirectionState = toState.name;
                $state.go('login', {message: {text: "You need to be logged in to view '" + toState.data.title + "' page!", type: "info"}}, {reload: true});
            } else if (auth.requiredRoles != undefined && !AccountModel.authorize(auth.requiredRoles)) {
                event.preventDefault();
                $.smallBox({
                    title: "Unauthorized Page Access!",
                    content: "Your account does not have the approproate permisions to access this page!",
                    color: "#C46A69",
                    icon: "fa fa-times swing animated",
                    timeout: 4000
                });
                $state.reload();
            }
        });

        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, rejection) {
            //if(toState.name == "app.profile.details" || toState.name == "app.intel.log" || toState.name == "app.company.details" || toState.name == "app.order" || toState.name == "app.invoice" || toState.name == "app.invoice.details") {
            event.preventDefault();
            if(rejection.code == "107") {
                redirectionRequiredAfterLogin = true;
                loginRedirectionState = toState.name;
                $state.go('login', {message: {text: "You need to be logged in to view '" + toState.data.title + "' page!", type: "error"}}, {reload: true});
            } else {
                $.smallBox({
                    title: rejection.message,
                    content: "[" + rejection.code + "]",
                    color: "#C46A69",
                    icon: "fa fa-times swing animated",
                    timeout: 4000
                });
                $state.reload();
            }
            //} else {
            //    $state.reload();
            //}
        });
    });

    return app;
});
