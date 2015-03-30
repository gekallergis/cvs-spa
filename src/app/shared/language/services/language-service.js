define(['shared/language/module', 'lodash'], function (module, _) {

    'use strict';
    module.registerFactory('Language', function ($http, $log) {

        function getLanguage(key, callback) {
			$http.get('api/langs/' + key + '.json').success(function(data){
				callback(data);
			}).error(function(){
				$log.log('Error');
				callback([]);
			});
		}

		function getLanguages(callback) {
			$http.get('api/languages.json').success(function(data){
				callback(data);
			}).error(function(){
				$log.log('Error');
				callback([]);
			});
		}

		return {
			getLang: function(type, callback) {
				getLanguage(type, callback);
			},
			getLanguages:function(callback){
				getLanguages(callback);
			}
		};
    });
});
