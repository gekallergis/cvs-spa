define(['core/layout/module'], function (module) {

    'use strict';

    module.registerDirective('dismisser', function () {
        return {
            restrict: 'A',
            compile: function (element) {
                element.removeAttr('dismisser data-dissmiser')
                var closer = '<button class="close">&times;</button>';
                element.prepend(closer);
                element.on('click', '>button.close', function(){
                    element.fadeOut('fast',function(){ $(this).remove(); });
                })
            }
        }
    });
});
