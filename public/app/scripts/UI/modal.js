'use strict';

angular.module('brewApp.services')
    .service('Modal', ['$modal', function($modal) {
        var _instance;

        this.open = function(options) {
            _instance = $modal.open({
                animation: true,
                backdrop: options.lockBackdrop ? 'static' : true,
                templateUrl: options.template,
                controller: options.controller,
                size: options.size
            });
        };
    }]);
