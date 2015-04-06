define(['angular', 'angular-couch-potato', 'appConfig'], function (ng, couchPotato) {

    "use strict";
    var module = ng.module('app.cvs-model', []);

    couchPotato.configureApp(module);

    module.config(function ($couchPotatoProvider) {});

    module.run(function($couchPotato){
        module.lazy = $couchPotato;
    });

    module.constant('SERVICE_ENDPOINT', {url: appConfig.service_endpoint});

    return module;
});
