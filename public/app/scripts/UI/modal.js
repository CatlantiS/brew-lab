'use strict';

angular.module('app.services')
    .service('Modal', ['$modal', function($modal) {
        var _instance;

        this.open = function (options) {
            _instance = $modal.open({
                animation: true,
                templateUrl: options.template,
                controller: options.controller,
                size: options.size
            });
        };
    }]);
