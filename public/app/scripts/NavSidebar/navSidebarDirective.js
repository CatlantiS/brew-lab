(function() {
	'use strict';

	angular.module('brewApp.directives').directive('navSidebar', navSidebar);

	function navSidebar() {
		return {
			templateUrl: '/views/navSidebar'
		};
	}
})();
