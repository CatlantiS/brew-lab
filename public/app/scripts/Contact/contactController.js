(function() {
    'use strict';

    angular.module('brewApp.controllers')
        .controller('ContactCtrl', ['$scope', 'AppState', contactController]);

    function contactController($scope, AppState) {
        /* jshint validthis: true */
        var self = this;

        self.contact = AppState.area('Contact').contact || {};

        self.submit = function(contact) {
            self.contactForm.$setPristine();
            self.contact = {};
            AppState.area('Contact').remove('contact');

            self.result = 'Your message went into a blackhole.';
        };

        self.clear = function() {
            self.contactForm.$setPristine();
            self.contact = {};
            AppState.area('Contact').remove('contact');

            self.result = '';
        };

        //Why is this getting called twice?
        $scope.$on('$destroy', function() {
            if (self.contactForm && self.contactForm.$dirty)
                AppState.area('Contact').contact = self.contact;
        });
    }
})();