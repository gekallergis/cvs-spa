define(['shared/cvs-model/module', 'lodash'], function (module, _) {

    'use strict';
    module.registerFactory('AccountModel', function (CVSService, $http, $q, $log) {
    	var _profile_list;
		var _company_list;

		function _getProfiles() {
			return CVSService.getProfiles()
			.then(function(profile_list){
				_profile_list = profile_list;
			});
		}		

		function _getCompanies() {
			return CVSService.getCompanies()
			.then(function(company_list){
				_company_list = company_list;
			});
		}

		return {
			// Profile
			getProfileList: function(){
				return _profile_list;
			},
			getProfiles: function() {
				return _getProfiles();
			},
			addProfile: function(newProfile) {
				// Add a new profile through the API here!
				var deferred = $q.defer();
				deferred.resolve();
				return deferred.promise;
			},
			deleteProfile: function(profileId) {
				// Delete a profile through the API here!
				var deferred = $q.defer();
				deferred.resolve();
				return deferred.promise;
			},
			// Company
			getCompanyList: function(){
				return _company_list;
			},
			getCompanies: function() {
				return _getCompanies();
			},
			addCompany: function(newCompany) {
				// Add a new company through the API here!
				var deferred = $q.defer();
				deferred.resolve();
				return deferred.promise;
			}
		};
    });
});
