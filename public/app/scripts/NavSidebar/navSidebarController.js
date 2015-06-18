'use strict';

angular.module('brewApp.controllers')
	.controller('NavSidebarCtrl', navSidebarController);

function navSidebarController() {
	/* jshint validthis: true */
	var self = this;

	self.actions = [{
			title: 'Enter a new recipe',
			url: '/recipe'
		}
	]
}