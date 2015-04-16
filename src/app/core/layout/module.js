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
								'core/layout/controllers/menu',
								'shared/cvs-model/services/cvs-api',
								'shared/cvs-model/models/account-model',
								'shared/cvs-model/models/order-model',
								'shared/utils/directives/shortcut-menu/shortcut-menu',
								'shared/utils/directives/shortcut-menu/toggle-shortcut-menu',
								'shared/language/directives/language-selector',
								'components/basket/directives/basket/basket',
								'components/basket/directives/basket-dropdown-toggle',
								'components/account/directives/account-info/account-info',
								'components/inbox/directives/unread-messages-count'
							])
							//delay: function($q, $timeout) {
							//    var def = $q.defer();
							//    
							//    $timeout(function(){
							//        def.resolve();
							//    }, 3000);
							//    
							//    return def.promise;
							//}
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
