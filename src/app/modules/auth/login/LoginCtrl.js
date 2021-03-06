define(['modules/auth/module'], function (module) {

    "use strict";

    module.registerController('LoginCtrl', function ($scope, $state, GooglePlus, User, ezfb) {

        $scope.$on('event:google-plus-signin-success', function (event, authResult) {
            if (authResult.status.method == 'PROMPT') {
                GooglePlus.getUser().then(function (user) {
                    User.username = user.name;
                    User.picture = user.picture;
                    $state.go('app.dashboard');
                });
            }
        });

        $scope.$on('event:facebook-signin-success', function (event, authResult) {
            ezfb.api('/me', function (res) {
                User.username = res.name;
                User.picture = 'https://graph.facebook.com/' + res.id + '/picture';
                $state.go('app.dashboard');
            });
        });
    })
});
