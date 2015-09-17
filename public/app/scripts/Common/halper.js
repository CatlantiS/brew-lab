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

        function getRowEditIconHtml(dataId) {
            return '<a class="row-edit" href="javascript:void(0);" data-id="' + dataId + '" title="Edit"><i class="fa fa-pencil-square-o"></i></a>';
        }

        function getRowDeleteIconHtml(dataId) {
            return '<a class="row-delete" href="javascript:void(0);" data-id="' + dataId + '" title="Delete"><i class="fa fa-trash brew-delete"></i></a>';
        }

        return {
            deResourcify: deResourcify,
            deResourcifyArray: deResourcifyArray,
            getRowEditIconHtml: getRowEditIconHtml,
            getRowDeleteIconHtml: getRowDeleteIconHtml
        };
    };
})();
