define(['components/products/module', 'lodash'], function (module, _) {

	'use strict';
	module.registerController('OwnedProductListController', function ($scope, ProductModel, SalesDataModel, ReportModel, $state, $log) {
		$scope.selected_product = {};
		$scope.owned_products = {};
		$scope.owned_products.list = ProductModel.getOwnedProductList();
		$scope.sales_data = {};
		$scope.mw = {};

		var _filterSalesDataList = function(sales_data, companyId) {
	    	$log.debug(sales_data);
	    	var newSalesDataList = _.filter(sales_data, function(salesData) {
	    		return (salesData.status == 'CHECKED') && (salesData.uploadedFor.companyId == companyId);
	    	});
	    	$log.debug(newSalesDataList);
	    	return newSalesDataList;
	    };
		
		$scope.modalVisibility = false;
		$scope.showModal = function(productID, companyID){
			$scope.selected_product.productID = productID;
			$scope.selected_product.companyID = companyID;
			$scope.sales_data.list = _filterSalesDataList(SalesDataModel.getSalesDataList(), companyID);

	        $scope.modalVisibility = !$scope.modalVisibility;
	    };

		$scope.refreshList = function() {
			$state.go($state.current, {}, {reload: true});
		};

		$scope.generateReport = function() {
			ReportModel.generateReport($scope.selected_product.productID, $scope.selected_product.companyID, {
				"currency": $scope.mw.currency,
				"language": $scope.mw.language
			}).then(function(){
				$scope.refreshList();
			});
		}
	});
});
