define(['shared/cvs-model/module', 'lodash'], function (module, _) {

    'use strict';
    module.registerFactory('InvoiceModel', function (CVSService, $http, $q, $rootScope, $log) {
    	var _invoice_list;
		
		function _getInvoices() {
			return CVSService.getInvoices()
			.then(function(invoice_list){
				_invoice_list = invoice_list;
			});
		}

		return {
			getInvoices: function() {
				return _getInvoices();
			},
			getInvoiceList: function(){
				return _invoice_list;
			}
		};
    });
});
