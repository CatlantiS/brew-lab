(function() {
    'use strict';

    angular.module('brewApp').factory('Helper', helper);

    function helper() {
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

        function getRowEditIconHtml(dataId) {
            return '<a class="row-edit" href="javascript:void(0);" data-id="' + dataId + '" title="Edit"><i class="fa fa-pencil-square-o"></i></a>';
        }

        function getRowDeleteIconHtml(dataId) {
            return '<a class="row-delete" href="javascript:void(0);" data-id="' + dataId + '" title="Delete"><i class="fa fa-trash brew-delete"></i></a>';
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
            deResourcify: deResourcify,
            deResourcifyArray: deResourcifyArray,
            getRowEditIconHtml: getRowEditIconHtml,
            getRowDeleteIconHtml: getRowDeleteIconHtml,
            joinPaths: joinPaths
        };
    };
})();
