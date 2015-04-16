define(['shared/cvs-model/module', 'lodash'], function (module, _) {

    'use strict';
    module.registerFactory('OrderModel', function (CVSService, $http, $q, $rootScope, $log) {
    	var _order_list;
    	var _current_order = {};
    	var _basket = {};
    	_basket.total = 0;
    	_basket.items = [];

    	function _updateBasketTotal() {
    		var total = 0;
			var items = _basket.items;

			for(var i = 0; i < items.length; i++) {
				total += items[i].qty * items[i].price;
			}

			_basket.total = total;
    	}

    	function _addItem(item) {
    		var existingBasketItem = _.find(_basket.items, {'id': item.id});

    		if(existingBasketItem != undefined) {
    			existingBasketItem.qty++;
    		} else {
    			item.qty = 1;
    			_basket.items.push(item);
    		}

    		_updateBasketTotal();
    		$rootScope.$broadcast('OrderModel::basketUpdate');
    	}

    	function _incQty(id) {
    		var existingBasketItem = _.find(_basket.items, {'id': id});

    		if(existingBasketItem != undefined) {
    			existingBasketItem.qty++;
    		}

    		_updateBasketTotal();
    		$rootScope.$broadcast('OrderModel::basketUpdate');
    	}

    	function _decQty(id) {
    		var existingBasketItem = _.find(_basket.items, {'id': id});

    		if(existingBasketItem != undefined && existingBasketItem.qty > 1) {
    			existingBasketItem.qty--;
    		}

    		_updateBasketTotal();
    		$rootScope.$broadcast('OrderModel::basketUpdate');
    	}

    	function _removeItem(id) {
    		var existingBasketItemIndex = _.findIndex(_basket.items, {'id': id});

    		if(existingBasketItemIndex > -1) {
    			_basket.items.splice(existingBasketItemIndex, 1);
    		}

    		_updateBasketTotal();
    		$rootScope.$broadcast('OrderModel::basketUpdate');
    	}

    	function _emptyBasket() {
    		_basket.total = 0;
			_basket.items = [];
			$rootScope.$broadcast('OrderModel::basketUpdate');
    	}

    	function _placeOrder() {
			// Place an order through the API here!
			var deferred = $q.defer();
			deferred.resolve();
			return deferred.promise;
    	}
		
		function _getOrders() {
			return CVSService.getOrders()
			.then(function(order_list) {
				_order_list = order_list;
			});
		}

		function _setCurrentOrder(id) {
			var idIndex = _.findIndex(_order_list, {'id': id});

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
			// Basket
			getBasket: function() {
				return _basket;
			},
			addItem: function(item) {
				_addItem (item);
			},
			increaseQty: function(id) {
				_incQty(id);
			},
			decreaseQty: function(id) {
				_decQty(id);
			},
			removeItem: function(id) {
				_removeItem(id);
			},
			emptyBasket: function() {
				_emptyBasket();
			},
			placeOrder: function() {
				return _placeOrder();
			},
			// Order History
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
