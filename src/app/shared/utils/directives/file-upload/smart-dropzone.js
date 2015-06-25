define(['shared/utils/module', 'dropzone'], function (module, Dropzone) {

    'use strict';

    return module.registerDirective('smartDropzone', function ($timeout, $log) {
        return {
            restrict: 'A',
            link: function (scope, iElement, iAttributes) {
                iElement.removeAttr('smart-dropzone data-smart-dropzone');

                var options = {
                    autoProcessQueue: false,
                    addRemoveLinks : false,
                    maxFilesize: 512,
                    paramName: 'salesData',
                    uploadMultiple: false,
                    maxFiles: 1,
                    dictDefaultMessage: '<span class="text-center"><span class="font-lg visible-xs-block visible-sm-block visible-lg-block"><span class="font-lg"><i class="fa fa-caret-right text-danger"></i> Drop files <span class="font-xs">to upload</span></span><span>&nbsp&nbsp<h4 class="display-inline"> (Or Click)</h4></span>',
                    dictResponseError: 'Error uploading file!',
                    dictMaxFilesExceeded: 'This file won\'t be uploaded!'
                };

                var dropzone = new Dropzone(iElement[0], options);

                dropzone.on('success', function(file, response) {
                    $.smallBox({
                        title: response.message,
                        content: "[" + response.code + "]",
                        color: "#739E73",
                        icon: "fa fa-check-square-o swing animated",
                        timeout: 4000
                    });
                    $timeout(function() {
                        scope.refreshList();
                    }, 1000);
                });

                var uploadButton = $("#salesDataUpload");
                if(uploadButton.length == 1) {
                    uploadButton.on('click', function() {
                        if((dropzone.getQueuedFiles().length == 1) && ((scope.sd.month != undefined) || (scope.sd.year != undefined) || (scope.sd.copmany != undefined))) {
                            dropzone.processQueue();
                        } else {
                            scope.alerts.missingOptions = true;
                            $timeout(function() {
                                scope.alerts.missingOptions = false;
                            }, 10000);
                        }
                    });
                }

                var clearButton = $("#salesDataClear");
                if(clearButton.length == 1) {
                    clearButton.on('click', function() {
                        dropzone.removeAllFiles();
                    });
                }
            }
        }
    });
});
