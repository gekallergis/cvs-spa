define(['shared/cvs-model/module', 'lodash'], function (module, _) {

    'use strict';
    module.registerFactory('AccountModel', function (CVSService, $http, $q, $log) {
    	var _profile_list;
    	var _current_user;
		var _company_list;
		var _current_company;
		var _country_list;
		var _user_roles_list;
		var _loggedin_user = null;

		function _login(email, password) {
			return CVSService.login(email, password)
			.then(function(loggedin_user){
				_loggedin_user = loggedin_user;
				return loggedin_user;
			});
		}

		function _logout() {
			return CVSService.logout();
		}

		function _resetPassword(email) {
			return CVSService.resetPassword(email);
		}

		function _register(companyInfo, employeeInfo) {
			return CVSService.register(companyInfo, employeeInfo);
		}

		function _activate(activationKey) {
			return CVSService.activate(activationKey);
		}

		function _getCountries() {
			return CVSService.getCountries()
			.then(function(country_list){
				_country_list = country_list;
			});
		}

		function _editProfile(profile) {
			return CVSService.editProfile(profile);
		}

		function _authorize(roles) {
			var authorized = false;

			if (_loggedin_user == null) {
				return authorized;
			}

			if(_.isArray(roles)) {
				authorized = true;
				_.forEach(roles, function(roleId, index){
					if (!_.includes(_loggedin_user.roles, roleId)) {
						authorized = false;
					}
				});
			} else {
				authorized = _.includes(_loggedin_user.roles, roles);
			}

			return authorized;
		}

		function _getUserRoles() {
			return CVSService.getUserRoles()
			.then(function(user_roles_list){
				_user_roles_list = user_roles_list;
			});
		}

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
				_company_list = company_list;
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

		function _toggleStatus(id) {
			return CVSService.toggleStatus(id);
		}

		function _attachToCompany(attachment) {
			return CVSService.attachToCompany(attachment);
		}

		function _addFreeProducts(products) {
			return CVSService.addFreeProducts(products);
		}

		function _deleteProfile(id) {
			return CVSService.deleteProfile(id);
		}

		function _addProfile(profile) {
			return CVSService.addProfile(profile);
		}

		function _addCompany(company) {
			return CVSService.addCompany(company);
		}

		return {
			// Login, Register, Lock, Reset Password
			login: function(email, password) { //OK
				return _login(email, password);
			},
			logout: function() { //OK
				return _logout();
			},
			resetPassword: function(email) { //OK
				return _resetPassword(email);
			},
			getCountries: function() { //OK
				return _getCountries();
			},
			register: function(companyInfo, employeeInfo) { //OK
				return _register(companyInfo, employeeInfo);
			},
			activate: function(activationKey) { //OK
				return _activate(activationKey);
			},
			getLoggedInUser: function() { //OK
				return _loggedin_user;
			},
			getUserRoles: function() { //OK
				return _getUserRoles();
			},
			getUserRolesList: function() { //OK
				return _user_roles_list;
			},
			authorize: function(id) { //OK
				return _authorize(id);
			},
			// Profile
			getProfiles: function() {
				return _getProfiles();
			},
			getProfileList: function(){ //OK
				return _profile_list;
			},
			getUserProfile: function(id) { //OK
				return _getUserProfile(id);
			},
			getCurrentUser: function() { //OK
				return _current_user;
			},
			addProfile: function(profile) { //OK
				return _addProfile(profile);
			},
			editProfile: function(profile) { //OK
				return _editProfile(profile);
			},
			deleteProfile: function(id) { //OK
				return _deleteProfile(id);
			},
			toggleStatus: function(id) { //OK
				return _toggleStatus(id);
			},
			// Company
			getCompanyList: function(){ //OK
				return _company_list;
			},
			getCompanies: function() { //OK
				return _getCompanies();
			},
			getCompanyProfile: function(id) {
				return _getCompanyProfile(id);
			},
			getCurrentCompany: function() {
				return _current_company;
			},
			addCompany: function(company) {
				return _addCompany(company);
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
			attachToCompany: function(attachment) {
				return _attachToCompany(attachment);
			},
			addFreeProducts: function(products) { //OK
				return _addFreeProducts(products);
			},
			// Countries
			getCountryList: function() { //OK
				return _country_list;
			},
		};
    });
});
