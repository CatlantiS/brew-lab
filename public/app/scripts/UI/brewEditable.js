(function() {
    'use strict';

    angular.module('brewApp.directives').directive('brewEditable', ['Helper', brewEditable]);

    function brewEditable(Helper) {
        function link(scope, element) {
            //Add edit icon if callback exists.
            if (typeof scope.edit === 'function') {
                var edit = angular.element(element[0].querySelector('.data-edit'));
                edit.append(Helper.getEditIconHtml(scope.id));
                edit.on('click', '.edit-icon', function() { scope.edit(scope.id); });
            }

            //Add delete icon if callback exists.
            if (typeof scope.delete === 'function') {
                var del = angular.element(element[0].querySelector('.data-delete'));
                del.append(Helper.getDeleteIconHtml(scope.id));
                del.on('click', '.delete-icon', function() { scope.delete(scope.id); });
            }
        }

        return {
            restrict: 'AE',
            scope: {
                id: '=',
                edit: '=',
                delete: '='
            },
            link: link
        };
    }
})();