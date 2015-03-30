define(['shared/utils/module'], function (module) {

	'use strict';
	module.registerDirective('cvsLoadingAnimation', function ($log) {
		return {
			restrict: 'A',
			replace: true,
			templateUrl: 'app/shared/utils/directives/loading-animation/loading-animation.tpl.html'
		};
	});
});
