define(['angular', 'angular-couch-potato'], function (ng, couchPotato) {

    "use strict";
    var module = ng.module('app.language', []);

    couchPotato.configureApp(module);

    module.config(function ($couchPotatoProvider) {});

    module.run(function($couchPotato){
        module.lazy = $couchPotato;
    });

    return module;
});
