define(['shared/cvs-model/module', 'lodash'], function (module, _) {

    'use strict';
    module.registerFactory('IntelModel', function (CVSService) {
    	var _log_list;

    	function _getSystemLog(order) {
    		return CVSService.getSystemLog()
			.then(function(logs_list){
				var orderBy = (order == 'DESC');
				var ordered_log = _.sortByOrder(logs_list, ['timestamp'], orderBy);

				_log_list = ordered_log;
			});
		}

		return {
			getSystemLogList: function(){
				return _log_list;
			},
			getSystemLog: function(order) {
				return _getSystemLog(order);
			}
		};
    });
});
