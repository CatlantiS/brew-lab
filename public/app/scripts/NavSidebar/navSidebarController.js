'use strict';

angular.module('brewApp.controllers')
	.controller('NavSidebarCtrl', ['$scope', 'Modal', navSidebarController]);

function navSidebarController($scope, Modal) {
	/* jshint validthis: true */
	var self = this;

	self.actions = [{
			title: 'Enter a new recipe',
			url: '/recipe'
		}
	]
};