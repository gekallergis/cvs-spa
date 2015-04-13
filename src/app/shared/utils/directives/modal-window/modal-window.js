define(['shared/utils/module'], function (module) {

	'use strict';
	module.registerDirective('cvsModalWindow', function ($log) {
		return {
			restrict: 'A',
			transclude: true,
			replace:true,
			priority: 10,
			scope: {
				title: '@',
				action_title: '@actionTitle',
				icon: '@',
				action: '&submitAction',
				visible: '='
			},
			templateUrl: 'app/shared/utils/directives/modal-window/modal-window.tpl.html',
			link: function(scope, iElem, iAttrs) {
				scope.$watch('visible', function(value){
					if(value == true) {
						$(iElem).modal('show');
					} else {
						$(iElem).modal('hide');
					}
				});
				
				$(iElem).on('shown.bs.modal', function(){
					scope.$apply(function(){
						scope.visible = true;
					});
				});
				
				$(iElem).on('hidden.bs.modal', function(){
					scope.$apply(function(){
						scope.visible = false;
					});
				});
			}
		};
	});
});
