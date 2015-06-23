angular.module('brewApp', [
		'ui.router',
		'ngResource',
		'ui.bootstrap',
		'ui.bootstrap.modal',
		'ui.bootstrap.typeahead',
		'brewApp.filters',
		'brewApp.services',
		'brewApp.directives',
		'brewApp.controllers'
	])
	.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: '/views/home'
			})
			.state('about', {
				url: '/about',
				templateUrl: '/views/about'
			})
			.state('contact', {
				url: '/contact',
				templateUrl: '/views/contact'
			})
			.state('recipe', {
				url: '/recipe',
				templateUrl: '/views/recipe'
			})
			.state('myRecipes', {
				url: '/myRecipes',
				templateUrl: '/views/myRecipes'
			})
			.state('logs', {
				url: '/logs',
				templateUrl: '/views/logs'
			})
			.state('otherwise', {
				url: '*path',
				templateUrl: '/views/error'
			});

		$locationProvider.html5Mode(true);
	}])
	.run(['$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams) {
		//Can cache templates in here as well.
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
		
		$rootScope.$on('$stateChangeSuccess', function(event, toState) {
			$rootScope.layout = toState.layout;
		});
	}]);

angular.module('brewApp.filters', []);

angular.module('brewApp.services', []);

angular.module('brewApp.directives', []);

angular.module('brewApp.controllers', []);