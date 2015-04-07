define(['shared/cvs-model/module', 'lodash'], function (module, _) {

    'use strict';
    module.registerFactory('OrderModel', function (CVSService, $http, $q, $rootScope, $log) {
    	var _order_list;
    	var _current_order = {};
		
		function _getOrders() {
			return CVSService.getOrders()
			.then(function(order_list){
				_order_list = order_list;
			});
		}

		function _setCurrentOrder(id) {
			var idIndex = _.findIndex(_order_list, 'id', id);

			if(idIndex != -1) {
				_current_order = _order_list[idIndex];

				if(_current_order.order_total === undefined) {
					_current_order.order_total = _calculateOrderTotal(_current_order);
				}

				$rootScope.$broadcast('OrderModel::currentOrderChanged');
			}
		}

		function _calculateOrderTotal(order) {
			var total = 0;
			var items = order.items;

			for(var i = 0; i < items.length; i++) {
				total += items[i].qty * items[i].unit_price;
			}

			return total;
		}

		return {
			getOrderList: function(){
				return _order_list;
			},
			getOrders: function() {
				return _getOrders();
			},
			refundOrder: function(id) {
				// Refund an order through the API here!
				var deferred = $q.defer();
				deferred.resolve();
				return deferred.promise;
			},
			setCurrentOrder: function(id) {
				_setCurrentOrder(id);
			},
			getCurrentOrder: function() {
				return _current_order;
			}
		};
    });
});
