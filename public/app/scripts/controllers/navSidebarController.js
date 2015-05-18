'use strict';

angular.module('app.controllers')
	.controller('NavSidebarCtrl', ['$scope', navSidebarController]);

function navSidebarController($scope) {
	$scope.actions = [{
			title: 'Make a new recipe',
			url: '/recipe'
		}
	]
};