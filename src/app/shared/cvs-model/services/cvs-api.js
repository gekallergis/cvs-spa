define(['shared/cvs-model/module', 'lodash'], function (module, _) {

    'use strict';
    module.registerFactory('CVSService', function (SERVICE_ENDPOINT, $rootScope, $http, $q, $log, $timeout) {

    	var artificial_delay = 0;

        function _makeGETRequest(filename) {
        	var deferred = $q.defer();

			$http.get(SERVICE_ENDPOINT.url + filename)
			.success(function(data){
				$timeout(function(){
					deferred.resolve(data);
					$log.info('[CVS_SERVICE] Retrieved [' + filename + '].');
				}, artificial_delay);
			})
			.error(function(response){
				deferred.reject(response);
				$log.error('[CVS_SERVICE] Failed to retrieve [' + filename + '].');
			});

			return deferred.promise;
		}

		function _makeRequest(endpoint, method, data) {
			var deferred = $q.defer();

			var localeOptions = ($rootScope.i18n)?"?lang=" + $rootScope.i18n.activeLanguage.key:"?lang=us";

			var request = {
				method: method,
 				url: SERVICE_ENDPOINT.url + endpoint + localeOptions,
 				headers: {},
 				data: data
			}

			$log.debug("OUTGOING");
			$log.debug(data);

			$http(request)
			.success(function(data){
				$timeout(function(){
					deferred.resolve(data);
					$log.info('[CVS_SERVICE] Request Success (' + endpoint + '::' + method + ')');
					$log.debug(data);
				}, artificial_delay);
			})
			.error(function(response){
				deferred.reject(response);
				$log.debug(response);
				$log.error('[CVS_SERVICE] Request Failure (' + endpoint + '::' + method + ')');
			});

			return deferred.promise;
		}

		return {
			login: function(email, password) {
				return _makeRequest('login', 'POST', {"email": email, "password": password});
			},
			logout: function() {
				return _makeRequest('logout', 'GET', {});
			},
			resetPassword: function(email) {
				return _makeRequest('reset', 'POST', {"email": email});	
			},
			register: function(companyInfo, employeeInfo) {
				return _makeRequest('register', 'POST', {"companyInfo": companyInfo, "employeeInfo": employeeInfo});
			},
			activate: function(activationKey) {
				return _makeRequest('activate', 'POST', {"key": activationKey});
			},
			getCountries: function() {
				return _makeRequest('country', 'GET', {});
			},
			getProfiles: function() {
				return _makeRequest('employee', 'GET', {});
			},
			getCompanies: function() {
				return _makeRequest('company', 'GET', {});
			},
			getUserRoles: function() {
				return _makeRequest('role', 'GET', {});
			},
			getUserProfile: function(id) {
				return _makeRequest('employee/' + id, 'GET', {});
			},
			getProducts: function() {
				return _makeRequest('product', 'GET', {});	
			},
			editProfile: function(profile) {
				return _makeRequest('employee', 'POST', profile);
			},
			toggleStatus: function(id) {
				return _makeRequest('status/' + id, 'POST', {});
			},
			attachToCompany: function(attachment) {
				return _makeRequest('attachEmployeeToCompany', 'POST', attachment);
			},
			addFreeProducts: function(products) {
				return _makeRequest('freeproducts', 'POST', products);
			},
			deleteProfile: function(employeeId) {
				return _makeRequest('employee/' + employeeId, 'DELETE', {});
			},
			getSystemLog: function() {
				return _makeRequest('intel/systemlog', 'GET', {});
			},
			addProfile: function(profile) {
				return _makeRequest('employee', 'PUT', profile);
			},
			addCompany: function(company) {
				return _makeRequest('company', 'PUT', company);
			},
			getCompanyProfile: function(id) {
				return _makeRequest('company/' + id, 'GET', {});
			},
			editCompany: function(company) {
				return _makeRequest('company' , 'POST', company);
			},
			attachManagingAccount: function(attachment) {
				return _makeRequest('attachManagingEmployee', 'POST', attachment);
			},
			attachParentCompany: function(attachment) {
				return _makeRequest('attachParentCompany', 'POST', attachment);
			},
			deleteCompany: function(id) {
				return _makeRequest('company/' + id, 'DELETE', {});	
			},
			placeOrder: function(companyId, basket) {
				return _makeRequest('order/', 'PUT', {"purchasedFor": {"companyId": companyId}, "items": basket.items});
			},

			getOrders: function() {
				return _makeGETRequest('order-list.json');
			},
			getInvoices: function() {
				return _makeGETRequest('invoice-list.json');	
			},
			getInvoice: function(id) {
				return _makeGETRequest('invoices/invoice-' + id + '.json');
			},
			getSalesData: function() {
				return _makeGETRequest('sales-data-list.json');	
			},
			getOwnedProducts: function() {
				return _makeGETRequest('owned-products-list.json');	
			},
			getReports: function() {
				return _makeGETRequest('report-list.json');
			},
		};
    });
});
