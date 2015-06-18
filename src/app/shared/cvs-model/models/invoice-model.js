define(['shared/cvs-model/module', 'lodash'], function (module, _) {

    'use strict';
    module.registerFactory('InvoiceModel', function (CVSService, $http, $q, $rootScope, $log) {
    	var _invoice_list;
    	var _current_invoice;
		
		function _getInvoices() {
			return CVSService.getInvoices()
			.then(function(invoice_list){
				_invoice_list = invoice_list;
			});
		}

		function _getInvoice(invoiceId) {
			return CVSService.getInvoice(invoiceId)
			.then(function(current_invoice){
				if(current_invoice.invoiceTotal === undefined) {
					current_invoice.invoiceTotal = _calculateInvoiceTotal(current_invoice);
				}
				_current_invoice = current_invoice;
			});
		}

		function _calculateInvoiceTotal(invoice) {
			var total = 0;
			var items = invoice.items;

			for(var i = 0; i < items.length; i++) {
				total += items[i].quantity * items[i].unitPrice;
			}

			return total;
		}

		function _settleInvoice(invoiceId) {
			return CVSService.settleInvoice(invoiceId);
		}

		return {
			getInvoices: function() {
				return _getInvoices();
			},
			getInvoiceList: function() {
				return _invoice_list;
			},
			getInvoice: function(invoiceId) {
				return _getInvoice(invoiceId);
			},
			getCurrentInvoice: function() {
				return _current_invoice;
			},
			settleInvoice: function(invoiceId) {
				return _settleInvoice(invoiceId);
			}
		};
    });
});
