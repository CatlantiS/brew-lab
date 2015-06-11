'use strict';

angular.module('brewApp.controllers')
	.controller('NavSidebarCtrl', ['$scope', 'Modal', navSidebarController]);

function navSidebarController($scope, Modal) {
	$scope.actions = [{
			title: 'Enter a new recipe',
			url: '/recipe'
		}
	]
};