var app = angular.module('brewLabApp', ['ui.router', 'ngResource', 'ui.bootstrap', 'ui.bootstrap.modal', 'ui.bootstrap.typeahead', 'app.filters', 'app.services', 'app.directives', 'app.controllers'])
	.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: '/views/home',
				controller: 'HomeCtrl'
			})
			.state('about', {
				url: '/about',
				templateUrl: '/views/about',
				controller: 'AboutCtrl'
			})
			.state('contact', {
				url: '/contact',
				templateUrl: '/views/contact',
				controller: 'ContactCtrl'
			})
			.state('recipe', {
				url: '/recipe',
				templateUrl: '/views/recipe',
				controller: 'RecipeCtrl'
			})
			.state('otherwise', {
				url: '*path',
				templateUrl: '/views/error',
				controller: 'ErrorCtrl'
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
	
angular.module('app.filters', []);

angular.module('app.services', []);

angular.module('app.directives', []);

angular.module('app.controllers', []);