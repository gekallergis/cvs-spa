define(['angular', 'angular-couch-potato', 'angular-ui-router', 'angular-animate', 'angular-bootstrap', 'angular-ui-select2', 'smartwidgets', 'notification'], function (ng, couchPotato) {

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

    app.run(function ($couchPotato, $rootScope, $state, $stateParams) {
        app.lazy = $couchPotato;
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        // editableOptions.theme = 'bs3';

        // Intercept stateChangeError event to redirect in case of a faild promise in a state resolve block.
        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
            //$state.go('app.inbox.folder', {folder: "sent"});
        });


        // DEBUGING UI ROUTER
        //$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
        //  console.log('$stateChangeStart to '+toState.to+'- fired when the transition begins. toState,toParams : \n',toState, toParams);
        //});
        //$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
        //  console.log('$stateChangeError - fired when an error occurs during transition.');
        //  console.log(arguments);
        //});
        //$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        //  console.log('$stateChangeSuccess to '+toState.name+'- fired once the state transition is complete.');
        //});
        //$rootScope.$on('$viewContentLoaded', function(event){
        //  console.log('$viewContentLoaded - fired after dom rendered',event);
        //});
        //$rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams){
        //  console.log('$stateNotFound '+unfoundState.to+'  - fired when a state cannot be found by its name.');
        //  console.log(unfoundState, fromState, fromParams);
        //});
    });

    return app;
});
