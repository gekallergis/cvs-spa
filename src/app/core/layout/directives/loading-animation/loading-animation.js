define(['core/layout/module'], function (module) {

	'use strict';

	module.registerDirective('cvsLoadingAnimation', function ($log) {
		return {
			restrict: 'A',
			replace: true,
			templateUrl: 'app/core/layout/directives/loading-animation/loading-animation.tpl.html'
		};
	});
});
