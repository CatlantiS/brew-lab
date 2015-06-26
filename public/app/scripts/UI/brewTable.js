'use strict';

angular.module('brewApp.directives')
    .directive('brewTable', function() {
        return {
            restrict: 'AE',
            link: function(scope, element) {
                scope.loadData().then(function(options) {
                    $(element).DataTable(options);
                });

            	//scope.$watch('ctrl.isLoading', function() {
            	//	if (!scope.ctrl.isLoading) {
            			//scope.ctrl.dataTableOptions.data = scope.ctrl.getDataForDataTable();
                		//$(element).DataTable(scope.ctrl.dataTableOptions);
                	//}
            	//});
            }
        };
    });
