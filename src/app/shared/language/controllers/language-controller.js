define(['shared/language/module', 'lodash'], function (module, _) {

    'use strict';
    module.registerController('LanguageController', function ($scope, $rootScope, Language) {
        $rootScope.lang = {};
                
        Language.getLanguages(function(data){
            $rootScope.currentLanguage = data[0];
            $rootScope.languages = data;
            Language.getLang(data[0].key,function(data){
                $rootScope.lang = data;
            });

        });

        $scope.selectLanguage = function(language){
            $rootScope.currentLanguage = language;
            Language.getLang(language.key,function(data){
                $rootScope.lang = data;
            });
        };

        $rootScope.getTranslation = function(key){
			if(angular.isDefined($rootScope.lang[key])){
				return $rootScope.lang[key];
			} else {
				return key;
			}
        };
    });
});
