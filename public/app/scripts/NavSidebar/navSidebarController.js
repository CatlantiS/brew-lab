'use strict';

angular.module('brewApp.controllers')
	.controller('NavSidebarCtrl', ['notifications', navSidebarController]);

function navSidebarController(notifications) {
	/* jshint validthis: true */
	var self = this;

	self.actions = [{
			title: 'Discover',
			click: function() {
				notifications.error('Smell my cheese dust.')
			}
		}, {
			title: 'Enter a new recipe',
			url: '/recipe'
		}, {
			title: 'My recipes',
			url: '/myRecipes'
		}, {
			title: 'Saved recipes',
			click: function() {
				notifications.error('Farkled it up, Farkleton.')
			}
		}, {
			title: 'Search',
			click: function() {
				notifications.error('Some of my best friends are obstetricians.')
			}
		}
	]
}