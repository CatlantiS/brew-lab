(function() {
    'use strict';

    angular.module('brewApp').factory('Helper', helper);

    function helper() {
        //This can be expanded.
        function Url(base) { this.base = base; }

        Url.prototype.route = function(name, route) { this[name] = joinPaths(this.base, route); return this; };

        function mapObj(source, target) {
            for (var key in target) {
                if(target.hasOwnProperty(key) && source.hasOwnProperty(key)) {
                    target[key] = source[key];
                }
            }
        }

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
            return resourceArray.map(deResourcify);
        }

        //Probably a nicer way to do this.
        //Can hand in param for what type of separator...
        function joinPaths(paths) {
            if (arguments.length > 1) paths = Array.prototype.slice.call(arguments);

            return paths.reduce(function(base, route) {
                var hasBaseSeparator = base[base.length - 1] === '/',
                    hasRouteSeparator = route[0] === '/';

                if (hasBaseSeparator && hasRouteSeparator)
                    base = base.substring(0, base.length - 1);
                else if (!(hasBaseSeparator || hasRouteSeparator))
                    base += '/';

                return base + route;
            });
        }

        return {
            Url: Url,
            mapObj: mapObj,
            deResourcify: deResourcify,
            deResourcifyArray: deResourcifyArray,
            joinPaths: joinPaths
        };
    };
})();
