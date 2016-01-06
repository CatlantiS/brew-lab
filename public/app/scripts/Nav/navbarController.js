(function() {
    'use strict';

    angular.module('brewApp.controllers').controller('NavbarCtrl', navbarController);

    function navbarController() {
        /* jshint validthis: true */
        var self = this;

        self.isCollapsed = true;
    }
})();

