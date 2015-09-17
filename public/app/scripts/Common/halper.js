(function() {
    'use strict';

    angular.module('brewApp').factory('Halper', halper);

    function halper() {
        function deResourcify(resource) {
            var obj = {};

            for (var property in resource)
                if (angular.isObject(resource[property]))
                    obj[property] = deResourcify(resource[property]);
                else if (resource.hasOwnProperty(property))
                    obj[property] = resource[property];

            return obj;
        }

        function deResourcifyArray(resourceArray) {
            return resourceArray.map(function(resource) { return deResourcify(resource); });
        }

        return {
            deResourcify: deResourcify,
            deResourcifyArray: deResourcifyArray
        };
    };
})();
