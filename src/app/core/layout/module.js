define(['angular', 'angular-couch-potato', 'angular-ui-router'], function (ng, couchPotato) {

    "use strict";
    var module = ng.module('app.layout', ['ui.router']);

    couchPotato.configureApp(module);

    module.config(function ($stateProvider, $couchPotatoProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                abstract: true,
                views: {
                    'root': {
                        templateUrl: 'app/core/layout/layout.tpl.html',
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                                'components/account/directives/account-info/account-info',
                                'components/account/directives/shortcut-menu/shortcut-menu',
                                'components/account/directives/shortcut-menu/toggle-shortcut-menu',
                                'shared/language/directives/language-selector',

                                'modules/graphs/directives/inline/sparklineContainer',
                                'modules/inbox/directives/unreadMessagesCount',
                                'modules/chat/api/ChatApi',
                                'modules/chat/directives/asideChatWidget'
                            ])
                        }
                    }
                }
            });
        $urlRouterProvider.otherwise('/login');

    });

    module.run(function ($couchPotato) {
        module.lazy = $couchPotato;
    });

    return module;

});
