define(['shared/utils/module'], function (module) {

    'use strict';
    module.registerDirective('smartTreeviewContent', function ($compile) {
        return {
            restrict: 'E',
            link: function (scope, element) {

                var $content = $(scope.item.content);

                function handleExpanded(){
                    $content.find('>i')
                        .toggleClass('fa-plus-circle', !scope.item.expanded)
                        .toggleClass('fa-minus-circle', !!scope.item.expanded);
                }

                if (scope.item.children && scope.item.children.length) {
                    $content.on('click', function(){
                        scope.$apply(function(){
                            scope.item.expanded = !scope.item.expanded;
                            handleExpanded();
                        });
                    });
                    handleExpanded();
                }
                element.replaceWith($content);
            }
        }
    });

    module.registerDirective('smartTreeview', function ($compile, $sce) {
        return {
            restrict: 'A',
            scope: {
                'items': '='
            },
            templateUrl: 'app/shared/utils/directives/tree-view/tree-view.tpl.html',
            compile: function (element) {
                // Break the recursion loop by removing the contents
                var contents = element.contents().remove();
                var compiledContents;
                return {
                    post: function (scope, element) {
                        // Compile the contents
                        if (!compiledContents) {
                            compiledContents = $compile(contents);
                        }
                        // Re-add the compiled contents to the element
                        compiledContents(scope, function (clone) {
                            element.append(clone);
                        });
                    }
                };
            }
        };
    });
});
