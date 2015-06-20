define(['shared/utils/module'], function (module) {

	'use strict';
	module.registerDirective('requiredRoles', function (AccountModel, $log) {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				function makeVisible() {
					element.removeClass('hidden');
				}

				function makeHidden() {
					element.addClass('hidden');
				}

				function determineVisibility(roles) {
					var authorized = AccountModel.authorize(roles);
					if (authorized) {
						makeVisible();
					} else {
						makeHidden();
					}
				}

				var roles = attrs.requiredRoles.split(',');
				if (roles.length > 0) {
					determineVisibility(roles);
				}
			}
		};
	});
});
