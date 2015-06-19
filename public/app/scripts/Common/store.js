//Should move this out of Common at some point.
(function() {
    'use strict';

    angular.module('brewApp.services')
        .factory('Store', ['$resource', store]);

    function store($resource) {
        //Can get base URL from config.
        var Store = $resource('http://localhost:8008/api/v1/store/:id', { id: '@id' });

        function store(obj) {
            return Store.save(obj).$promise;
        }

        function getById(id) {
            return Store.$get({ id: id }).$promise;
        }

        return {
            store: store,
            getById: getById
        };
    }
})();
