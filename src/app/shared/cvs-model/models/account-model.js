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

		function _authorize(roles) {
			var authorized = false;

			if (_loggedin_user == null) {
				return authorized;
			}

			authorized = true;
			_.forEach(roles, function(role, index) {
				if (!_.some(_loggedin_user.roles, {label: role.trim()})) {
					authorized = false;
				}
			});

			return authorized;
		}

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
			var managingEmployeeFullName = "No Managing Employee";

			if(company.hierarchy.company.managingEmployee != null) {
				managingEmployeeFullName = company.hierarchy.company.managingEmployee.firstName + " " + company.hierarchy.company.managingEmployee.lastName;
			}

			var hierarchy = [
	            {"content": "<span><i class=\"fa fa-lg fa-building\"></i> " + company.hierarchy.company.name + "</span>", "expanded": true, "children": [
	                {"content": "<h4><i class=\"fa fa-lg fa-star\"></i> " + managingEmployeeFullName + "</h4>", "expanded": false, "children": []}
	            ]}
	        ];

	        _.forEach(company.hierarchy.children, function(value, index, collection){
	        	var managingEmployeeFullName = "No Managing Employee";

				if(value.company.managingEmployee != null) {
					managingEmployeeFullName = value.company.managingEmployee.firstName + " " + value.company.managingEmployee.lastName;
				}

	        	var child = {"content": "<span class=\"label label-success\"><i class=\"fa fa-lg fa-plus-circle\"></i> " + value.company.name + "</span>", "expanded": false, "children": [
				                {"content": "<span class=\"alert-info\"><i class=\"fa fa-star\"></i> " + managingEmployeeFullName + "</span>"}
				            ]};
	        	_.forEach(value.employees, function(value, index, collection){
	        		child.children.push({"content": "<span><i class=\"fa fa-user\"></i> " + value.firstName + " " + value.lastName + "</span>"});
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

		function _editCompany(company) {
			return CVSService.editCompany(company);
		}

		function _attachManagingAccount(attachment) {
			return CVSService.attachManagingAccount(attachment);
		}

		function _attachParentCompany(attachment) {
			return CVSService.attachParentCompany(attachment);
		}

		function _deleteCompany(companyId) {
			return CVSService.deleteCompany(companyId);
		}

		return {
			// Login, Register, Lock, Reset Password
			login: function(email, password) {
				return _login(email, password);
			},
			logout: function() {
				return _logout();
			},
			resetPassword: function(email) {
				return _resetPassword(email);
			},
			getCountries: function() {
				return _getCountries();
			},
			register: function(companyInfo, employeeInfo) {
				return _register(companyInfo, employeeInfo);
			},
			activate: function(activationKey) {
				return _activate(activationKey);
			},
			getLoggedInUser: function() {
				return _loggedin_user;
			},
			getUserRoles: function() {
				return _getUserRoles();
			},
			getUserRolesList: function() {
				return _user_roles_list;
			},
			authorize: function(id) {
				return _authorize(id);
			},
			// Profile
			getProfiles: function() {
				return _getProfiles();
			},
			getProfileList: function(){
				return _profile_list;
			},
			getUserProfile: function(id) {
				return _getUserProfile(id);
			},
			getCurrentUser: function() {
				return _current_user;
			},
			addProfile: function(profile) {
				return _addProfile(profile);
			},
			editProfile: function(profile) {
				return _editProfile(profile);
			},
			deleteProfile: function(id) {
				return _deleteProfile(id);
			},
			toggleStatus: function(id) {
				return _toggleStatus(id);
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
				return _addCompany(company);
			},
			editCompany: function(company) {
				return _editCompany(company);
			},
			attachParentCompany: function(attachment) {
				return _attachParentCompany(attachment);
			},
			deleteCompany: function(companyId) {
				return _deleteCompany(companyId);
			},
			setBespokeCurrency: function(bespoke) {
				// Add a bespoke currency through the API here!
				var deferred = $q.defer();
				deferred.resolve();
				return deferred.promise;
			},
			attachManagingAccount: function(attachment) {
				return _attachManagingAccount(attachment);
			},
			attachToCompany: function(attachment) {
				return _attachToCompany(attachment);
			},
			addFreeProducts: function(products) {
				return _addFreeProducts(products);
			},
			// Countries
			getCountryList: function() {
				return _country_list;
			},
		};
    });
});
