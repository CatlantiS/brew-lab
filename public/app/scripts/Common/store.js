//Should move this out of Common at some point.
(function() {
    'use strict';

    angular.module('brewApp.services')
        .factory('Store', ['$resource', '$location', store]);

    function store($resource, $location) {
        //Can get base URL from config.
        var host = $location.protocol() + '://' + $location.host() + ':' + $location.port(),
            //Is there a better way than having different resources for these?
            Store = $resource(host + '/api/v1/store/:id', { id: '@id' }),
            User = $resource(host + '/api/v1/store/user/:userId', { userId: '@userId' });

        function store(obj) {
            return Store.save(obj).$promise;
        }

        function getById(id) {
            return Store.get({ id: id }).$promise;
        }

        function getByUser(userId) {
            return User.query({ userId: userId });
        }

        return {
            store: store,
            getById: getById,
            getByUser: getByUser
        };
    }
})();
