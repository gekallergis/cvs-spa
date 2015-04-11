define(['components/products/module', 'lodash'], function (module, _) {

	'use strict';
	module.registerFilter('split', function ($log) {
		return function(input, splitChar, splitIndex) {
			return input.split(splitChar)[splitIndex];
        }
	});
});
