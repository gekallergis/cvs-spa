define(['shared/cvs-model/module', 'lodash'], function (module, _) {

    'use strict';
    module.registerFactory('ProductModel', function (CVSService, $http, $q, $log) {
    	var _product_list;
    	var _owned_product_list;
		
		function _getOwnedProducts() {
			return CVSService.getOwnedProducts()
			.then(function(owned_product_list){
				_owned_product_list = owned_product_list;
			});
		}

		function _getProducts() {
			return CVSService.getProducts()
			.then(function(product_list){
				_product_list = product_list;
			});
		}

		return {
			getProducts: function() { //OK
				return _getProducts();
			},
			getProductList: function(){
				return _product_list;
			},
			getOwnedProducts: function() {
				return _getOwnedProducts();
			},
			getOwnedProductList: function(){
				return _owned_product_list;
			}
		};
    });
});
