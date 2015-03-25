define(['angular',
    'angular-couch-potato',
    'angular-ui-router'], function (ng, couchPotato) {

    "use strict";


    var module = ng.module('app.layout', ['ui.router']);


    couchPotato.configureApp(module);

    module.config(function ($stateProvider, $couchPotatoProvider, $urlRouterProvider) {


        $stateProvider
            .state('app', {
                abstract: true,
                views: {
                    root: {
                        templateUrl: 'app/core/layout/layout.tpl.html',
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                                'modules/auth/directives/loginInfo',
                                'modules/graphs/directives/inline/sparklineContainer',
                                'modules/inbox/directives/unreadMessagesCount',
                                'modules/chat/api/ChatApi',
                                'modules/chat/directives/asideChatWidget'
                            ])
                        }
                    }
                }
            });
        $urlRouterProvider.otherwise('/dashboard');

    });

    module.run(function ($couchPotato) {
        module.lazy = $couchPotato;
    });

    return module;

});
