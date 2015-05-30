'use strict';

angular.module('app.controllers')
	.controller('NavSidebarCtrl', ['$scope', 'Modal', navSidebarController]);

function navSidebarController($scope, Modal) {
	$scope.actions = [{
			title: 'Enter a new recipe',
			click: function() {
				Modal.open({
					lockBackdrop: true,
					controller: 'RecipeCtrl',
					template: 'views/recipe',
					size: 'lg'
				});
			}
		}
	]
};