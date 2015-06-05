'use strict';

angular.module('app.controllers')
	.controller('NavSidebarCtrl', ['$scope', 'Modal', navSidebarController]);

function navSidebarController($scope, Modal) {
	$scope.actions = [{
			title: 'Enter a new recipe',
			url: '/recipe'
		}
	]
};