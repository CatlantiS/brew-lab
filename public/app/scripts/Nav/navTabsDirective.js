(function() {
	'use strict';

	angular.module('brewApp.directives').directive('navTabs', navTabs);

	function navTabs() {
		return {
			templateUrl: '/views/navTabs'
		};
	}
})();
