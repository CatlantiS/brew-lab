(function() {
    'use strict';

    angular.module('brewApp.services')
        .factory('Role', ['$q', '$resource', 'Auth', 'Configuration', 'Helper', role]);

    function role($q, $resource, Auth, Configuration, Helper) {
        var APP_ROLES = { LOGGED_IN: '*', ADMIN: 'admin', GUEST: 'guest'},
            Roles = $resource(Helper.joinPaths(Configuration.store.url.api, 'users/roles/')),
            fetch = {};

        //APP_ROLES is being exposed and want to make sure it can't be changed by consumers.
        Object.freeze(APP_ROLES);

        (function init() { getRoles(); })();

        function _isUserInRole(user, typePredicate) {
            var deferred = $q.defer();

            if (!(user && user.role))
                return (deferred.resolve(false), deferred.promise);

            getRoles().then(function(roles) {
                var isInRole = false;

                for (var type in roles) {
                    if (isInRole === true) break;
                    if (typePredicate != null && !typePredicate(type)) continue;

                    for (var i = 0; i < type.roles.length; i++)
                        if (user.role === type.roles[i].name) {
                            isInRole = true;

                            break;
                        }
                }

                deferred.resolve(isInRole);
            });

            return deferred.promise;
        }

        function getRoles(predicate) {
            return fetch.roles || (fetch.roles = Roles.get().$promise, fetch.roles);
        }

        function isUserInAppRole(user, appRole) {
            if (appRole == null) return false;

            appRole = appRole.toLowerCase();

            if (appRole === APP_ROLES.ADMIN) return isAdmin(user);

            var deferred = $q.defer(),
                isAuthenticated = Auth.isAuthenticated();

            if (appRole === APP_ROLES.LOGGED_IN)
                return (deferred.resolve(isAuthenticated), deferred.promise);

            if (appRole === APP_ROLES.GUEST)
                return (deferred.resolve(!isAuthenticated), deferred.promise);
        }

        function isUserInRoleByType(user, type) {
            return _isUserInRole(user, function(t) { return t.type === type.type; });
        }

        function isAdmin(user) {
            return _isUserInRole(user, function(type) { return type.isAdmin === true; });
        }

        return {
            APP_ROLES: APP_ROLES,
            getRoles: getRoles,
            isUserInAppRole: isUserInAppRole,
            isUserInRoleByType: isUserInRoleByType,
            isAdmin: isAdmin
        };
    }
})();