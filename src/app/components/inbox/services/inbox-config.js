define(['components/inbox/module'], function(module){

    "use strict";
    return module.registerFactory('InboxConfig', function($http){
        return $http.get('fAPI/inbox.json');
    })
});
