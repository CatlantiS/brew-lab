(function() {
    'use strict';

    angular.module('brewApp').factory('UI', ui);

    function ui() {
        function insertEditIcon(element, identifier, callback) {
            //Don't insert icon if no callback defined.
            if (typeof callback !== 'function') return;

            element.append(getEditIconHtml(identifier));
            element.on('click', '.edit-icon', function() { callback(identifier); });
        }

        function insertDeleteIcon(element, identifier, callback) {
            //Don't insert icon if no callback defined.
            if (typeof callback !== 'function') return;

            element.append(getDeleteIconHtml(identifier));
            element.on('click', '.delete-icon', function() { callback(identifier); });
        }

        function getEditIconHtml(identifier) {
            return '<a class="edit-icon" href="javascript:void(0);" data-id="' + identifier + '" title="Edit"><i class="fa fa-pencil-square-o"></i></a>';
        }

        function getDeleteIconHtml(identifier) {
            return '<a class="delete-icon" href="javascript:void(0);" data-id="' + identifier + '" title="Delete"><i class="fa fa-trash brew-delete"></i></a>';
        }

        return {
            insertEditIcon: insertEditIcon,
            insertDeleteIcon: insertDeleteIcon
        };
    };
})();