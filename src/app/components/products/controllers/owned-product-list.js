define(['components/products/module', 'lodash'], function (module, _) {

	'use strict';
	module.registerController('OwnedProductListController', function ($scope, ProductModel, SalesDataModel, ReportModel, $state, $log) {
		$scope.selected_product = {};
		$scope.owned_products = {};
		$scope.owned_products.list = ProductModel.getOwnedProductList();
		$scope.sales_data = {};
		$scope.mw = {};

		var _filterSalesDataList = function(sales_data, companyId) {
	    	var newSalesDataList = _.filter(sales_data, function(salesData) {
	    		return (salesData.status == 'CHECKED') /* && (salesData.uploadedFor.companyId == companyId) */;
	    	});
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
			ReportModel.generateReport($scope.selected_product.productID, $scope.selected_product.companyID, $scope.mw.salesData, {
				"currency": $scope.mw.currency,
				"language": $scope.mw.language
			}).then(function(response){
				$.smallBox({
                    title: response.message,
                    content: "[" + response.code + "]",
                    color: "#739E73",
					icon: "fa fa-check-square-o swing animated",
                    timeout: 4000
                });
				$scope.refreshList();
			}, function(errorResponse) {
				$scope.generation = {};
				$scope.generation.message = {text: errorResponse.message, type: "error"};
			});
		}
	});
});
