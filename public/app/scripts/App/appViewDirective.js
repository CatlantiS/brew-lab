//Todo: need to make this better.  What about handling views that don't require authentication?
(function() {
    'use strict';

    angular.module('brewApp.directives').directive('appView', appView);

    function appView() {
        return {
            restrict: 'AE',
            controller: 'AppCtrl as app',
            transclude: true,
            template: '<div ng-if="app.isAuthenticated === true"><ng-transclude></ng-transclude></div>'
        }
    }
})();