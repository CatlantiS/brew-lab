(function() {
    'use strict';

    angular.module('brewApp.controllers').controller('AppCtrl', ['$window', 'Auth', appController]);

    function appController($window, Auth) {
        /* jshint validthis: true */
        var self = this;

        (function init() { setAuthenticated(); })();

        Auth.onAuthenticate('app', setAuthenticated);

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
