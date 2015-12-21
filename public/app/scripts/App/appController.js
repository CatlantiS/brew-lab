(function() {
    'use strict';

    angular.module('brewApp.controllers').controller('AppCtrl', ['$rootScope', '$window', 'Auth', appController]);

    function appController($rootScope, $window, Auth) {
        /* jshint validthis: true */
        var self = this;

        (function init() { setAuthenticated(); })();

        Auth.onAuthenticate('app', function() {
            setAuthenticated();

            //Reload current view to update any parts that require authentication.
            $rootScope.$state.reload();
        });

        Auth.onSignOut('app', function() {
            setAuthenticated();

            //Re-route to home on sign out.
            $window.location.href = '/';
        });

        function setAuthenticated() {
            self.isAuthenticated = Auth.isAuthenticated();
        }
    }
})();
