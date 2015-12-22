(function() {
	'use strict';

	angular.module('brewApp.controllers')
		.controller('NavSidebarCtrl', ['notifications', navSidebarController]);

	function navSidebarController(notifications) {
		/* jshint validthis: true */
		var self = this;

		self.actions = [{
			title: 'Discover',
			click: function() {
				notifications.warning('Coming soon...')
			}
		}, {
			title: 'Enter a new recipe',
			url: '/addRecipe'
		}, {
			title: 'My recipes',
			url: '/myRecipes'
		}, {
			title: 'Saved recipes',
			click: function() {
				notifications.warning('Coming soon...')
			}
		}, {
			title: 'Search',
			click: function() {
				notifications.warning('Coming soon...')
			}
		}
		]
	}
})();