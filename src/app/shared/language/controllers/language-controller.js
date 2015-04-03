define(['shared/language/module', 'lodash'], function (module, _) {

    'use strict';
    module.registerController('LanguageController', function ($rootScope, $scope, $log, LanguageService) {
        $rootScope.i18n = {};

        LanguageService.getLanguages()
        .then(function(languages) {
            var defaultLanguage = _.find(languages, {'default': true});
            $rootScope.i18n.activeLanguage = defaultLanguage;
            $rootScope.i18n.languages = languages;
            return LanguageService.getLang(defaultLanguage.key);
        })
        .then(function(translation){
            $rootScope.i18n.activeTranslation = translation;
        });

        $scope.selectLanguage = function(language){
            $rootScope.i18n.activeLanguage = language;
            LanguageService.getLang(language.key)
            .then(function(translation){
                $rootScope.i18n.activeTranslation = translation;
            });
        };

        $rootScope.i18n.getTranslation = function(key){
        	if(angular.isDefined($rootScope.i18n.activeTranslation)) {
	        	if(angular.isDefined($rootScope.i18n.activeTranslation[key])){
					return $rootScope.i18n.activeTranslation[key];
				} else {
					return key;
				}
			}
        };
    });
});
