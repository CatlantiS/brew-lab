(function() {
    'use strict';

    angular.module('brewApp.controllers').controller('AppCtrl', ['Auth', appController]);

    function appController(Auth) {
        /* jshint validthis: true */
        var self = this;

        setAuthenticated();

        Auth.onAuthenticate('app', setAuthenticated);
        Auth.onSignOut('app', setAuthenticated);

        function setAuthenticated() { self.isAuthenticated = Auth.isAuthenticated(); }
    }
})();
