'use strict';

angular.module('brewApp.controllers')
	.controller('NavSidebarCtrl', ['notifications', navSidebarController]);

function navSidebarController(notifications) {
	/* jshint validthis: true */
	var self = this;

	self.actions = [{
			title: 'Enter a new recipe',
			url: '/recipe'
		}, {
			title: 'My recipes',
			click: function() {
				notifications.error('Eat a johnson.')
			}
		}, {
			title: 'Saved recipes',
			click: function() {
				notifications.error('Farkled it up, Farkleton.')
			}
		}
	]
}