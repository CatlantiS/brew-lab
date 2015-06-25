'use strict';

var flatterData = function(arr) {
	var res = [];
	var i;
	for (i=0; i < arr.length; i++) {
		res.push([arr[i].name, '', '', '']);
	}
	console.log('res = ');
	console.log(res);
	return res;
}

angular.module('brewApp.directives')
    .directive('brewTable', function() {
        return {
            restrict: 'AE',
            link: function(scope, element) {
            	scope.$watch('ctrl.isLoading', function() {
            		if (!scope.ctrl.isLoading) {
            			scope.dataTableOptions.data = flatterData(scope.ctrl.recipes);
                		$(element).DataTable(scope.dataTableOptions);
                	}
            	});
            }
        };
    });
