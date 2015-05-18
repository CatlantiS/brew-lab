'use strict';

angular.module('app.controllers')
	.controller('NavSidebarCtrl', ['$scope', navSidebarController]);

function navSidebarController($scope) {
	$scope.actions = [{
			title: 'Enter a new recipe',
			url: '/recipe'
		}
	]
};