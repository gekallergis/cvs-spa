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
				total += items[i].quantity * items[i].unitPrice;
			}

			_basket.total = total;
    	}

    	function _addItem(item) {
    		var existingBasketItem = _.find(_basket.items, {'productId': item.productId});

    		if(existingBasketItem != undefined) {
    			existingBasketItem.quantity++;
    		} else {
    			item.quantity = 1;
    			_basket.items.push(item);
    		}

    		_updateBasketTotal();
    		$rootScope.$broadcast('OrderModel::basketUpdate');
    	}

    	function _incQty(productId) {
    		var existingBasketItem = _.find(_basket.items, {'productId': productId});

    		if(existingBasketItem != undefined) {
    			existingBasketItem.quantity++;
    		}

    		_updateBasketTotal();
    		$rootScope.$broadcast('OrderModel::basketUpdate');
    	}

    	function _decQty(productId) {
    		var existingBasketItem = _.find(_basket.items, {'productId': productId});

    		if(existingBasketItem != undefined && existingBasketItem.quantity > 1) {
    			existingBasketItem.quantity--;
    		}

    		_updateBasketTotal();
    		$rootScope.$broadcast('OrderModel::basketUpdate');
    	}

    	function _removeItem(productId) {
    		var existingBasketItemIndex = _.findIndex(_basket.items, {'productId': productId});

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

    	function _placeOrder(companyId) {
    		return CVSService.placeOrder(companyId, _basket);
    	}
		
		function _getOrders() {
			return CVSService.getOrders()
			.then(function(order_list) {
				_order_list = order_list;
			});
		}

		function _setCurrentOrder(orderHeaderId) {
			var idIndex = _.findIndex(_order_list, {'orderHeaderId': orderHeaderId});

			if(idIndex != -1) {
				_current_order = _order_list[idIndex];

				if(_current_order.orderTotal === undefined) {
					_current_order.orderTotal = _calculateOrderTotal(_current_order);
				}

				$rootScope.$broadcast('OrderModel::currentOrderChanged');
			}
		}

		function _calculateOrderTotal(order) {
			var total = 0;
			var items = order.items;

			for(var i = 0; i < items.length; i++) {
				total += items[i].quantity * items[i].unitPrice;
			}

			return total;
		}

		function _refundOrder(orderHeaderId) {
			return CVSService.refundOrder(orderHeaderId);
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
			placeOrder: function(companyId) {
				return _placeOrder(companyId);
			},
			// Order History
			getOrderList: function(){
				return _order_list;
			},
			getOrders: function() {
				return _getOrders();
			},
			refundOrder: function(orderHeaderId) {
				return _refundOrder(orderHeaderId);
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
