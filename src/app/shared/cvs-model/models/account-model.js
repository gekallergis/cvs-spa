define(['shared/cvs-model/module', 'lodash'], function (module, _) {

    'use strict';
    module.registerFactory('AccountModel', function (CVSService, $http, $q, $log) {
    	var _profile_list;
    	var _current_user;
		var _company_list;
		var _current_company;
		var _country_list;

		function _getProfiles() {
			return CVSService.getProfiles()
			.then(function(profile_list){
				_profile_list = profile_list;
			});
		}

		function _getUserProfile(id) {
			return CVSService.getUserProfile(id)
			.then(function(current_user){
				_current_user = current_user;
			});
		}

		function _getCompanies() {
			return CVSService.getCompanies()
			.then(function(company_list){
				_company_list = company_list.companies;
				_country_list = company_list.countries;
			});
		}

		function _getCompanyProfile(id) {
			return CVSService.getCompanyProfile(id)
			.then(function(current_company){
				_current_company = _setupCompanyHierarchy(current_company);
			});
		}

		function _setupCompanyHierarchy(company) {
			var hierarchy = [
	            {"content": "<span><i class=\"fa fa-lg fa-building\"></i> " + company.hierarchy.name + "</span>", "expanded": true, "children": [
	                {"content": "<h4><i class=\"fa fa-lg fa-star\"></i> " + company.hierarchy.managing_account + "</h4>", "expanded": false, "children": []}
	            ]}
	        ];

	        _.forEach(company.hierarchy.children, function(value, index, collection){
	        	var child = {"content": "<span class=\"label label-success\"><i class=\"fa fa-lg fa-plus-circle\"></i> " + value.name + "</span>", "expanded": false, "children": [
				                {"content": "<span class=\"alert-info\"><i class=\"fa fa-star\"></i> " + value.managing_account + "</span>"}
				            ]};
	        	_.forEach(value.employees, function(value, index, collection){
	        		child.children.push({"content": "<span><i class=\"fa fa-user\"></i> " + value.full_name + "</span>"});
	        	});
	        	hierarchy[0].children.push(child);
	        });
	        company.hierarchy = hierarchy;

			return company;
		}

		return {
			// Profile
			getProfileList: function(){
				return _profile_list;
			},
			getProfiles: function() {
				return _getProfiles();
			},
			getUserProfile: function(id) {
				return _getUserProfile(id);
			},
			getCurrentUser: function() {
				return _current_user;
			},
			addProfile: function(profile) {
				// Add a new profile through the API here!
				var deferred = $q.defer();
				deferred.resolve();
				return deferred.promise;
			},
			editProfile: function(profile) {
				// Edit a profile through the API here!
				var deferred = $q.defer();
				deferred.resolve();
				return deferred.promise;
			},
			deleteProfile: function(id) {
				// Delete a profile through the API here!
				var deferred = $q.defer();
				deferred.resolve();
				return deferred.promise;
			},
			setStatus: function(id) {
				// Set the status of a profile through the API here!
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
			getCompanyProfile: function(id) {
				return _getCompanyProfile(id);
			},
			getCurrentCompany: function() {
				return _current_company;
			},
			addCompany: function(company) {
				// Add a new company through the API here!
				var deferred = $q.defer();
				deferred.resolve();
				return deferred.promise;
			},
			editCompany: function(company) {
				// Edit a company through the API here!
				var deferred = $q.defer();
				deferred.resolve();
				return deferred.promise;
			},
			deleteCompany: function(id) {
				// Delete a profile through the API here!
				var deferred = $q.defer();
				deferred.resolve();
				return deferred.promise;
			},
			setBespokeCurrency: function(bespoke) {
				// Add a bespoke currency through the API here!
				var deferred = $q.defer();
				deferred.resolve();
				return deferred.promise;
			},
			attachManagingAccount: function(managing_account) {
				// Attach managing account through the API here!
				var deferred = $q.defer();
				deferred.resolve();
				return deferred.promise;
			},
			attachToCompany: function(parent_company) {
				// Attach managing account through the API here!
				var deferred = $q.defer();
				deferred.resolve();
				return deferred.promise;
			},
			addFreeProducts: function(products) {
				$log.debug(products);
				// Add free products through the API here!
				var deferred = $q.defer();
				deferred.resolve();
				return deferred.promise;
			},
			// Countries
			getCountryList: function() {
				return _country_list;
			},
		};
    });
});
