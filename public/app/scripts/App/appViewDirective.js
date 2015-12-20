//Todo: need to make this better.  What about handling views that don't require authentication?
(function() {
    'use strict';

    angular.module('brewApp.directives').directive('appView', ['Role', appView]);

    function appView(Role) {
        return {
            restrict: 'AE',
            scope: {
                role: '@role'
            },
            transclude: true,
            template: '<div ng-if="role != null"><ng-transclude></ng-transclude></div>'
        }
    }
})();