(function() {
    'use strict';

    angular.module('brewApp.services').factory('BrewModal', ['$modal', brewModal]);

    function brewModal($modal) {
        var instance;

        function open(options) {
            instance = $modal.open({
                animation: true,
                backdrop: options.static ? 'static' : true,
                templateUrl: options.template,
                controller: options.controller,
                size: options.size,
                windowClass: options.class,
                resolve: {
                    $modalParams: function() {
                        return options.params;
                    }
                }
            });

            return instance.result;
        }

        return {
            open: open
        };
    }
})();

