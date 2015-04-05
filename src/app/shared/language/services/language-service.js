define(['shared/language/module', 'lodash'], function (module, _) {

    'use strict';
    module.registerFactory('LanguageService', function (SERVICE_ENDPOINT, $http, $q, $log) {

        function getLanguage(iso_code) {
        	var deferred = $q.defer();

			$http.get(SERVICE_ENDPOINT.url + 'i18n/' + iso_code + '.json')
			.success(function(data){
				deferred.resolve(data);
				$log.info('[LANGUAGE_SERVICE] Retrieved language for ISO 3166-1 code "' + iso_code + '".');
			})
			.error(function(response){
				deferred.reject(response);
				$log.error('[LANGUAGE_SERVICE] Failed to retrieve language for ISO 3166-1 code "' + iso_code + '".');
			});

			return deferred.promise;
		}

		function getLanguages() {
			var deferred = $q.defer();

			$http.get(SERVICE_ENDPOINT.url + 'i18n/languages.json')
			.success(function(data){
				deferred.resolve(data);
				$log.info('[LANGUAGE_SERVICE] Retrieved all languages.');
			}).error(function(response){
				deferred.reject(response);
				$log.error('[LANGUAGE_SERVICE] Failed to retrieve all languages.');
			});

			return deferred.promise;
		}

		return {
			getLang: function(iso_code) {
				return getLanguage(iso_code);
			},
			getLanguages:function(){
				return getLanguages();
			}
		};
    });
});
