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

        function _isUserInRoles(user, predicate) {
            var deferred = $q.defer();

            if (!(user && user.role))
                return (deferred.resolve(false), deferred.promise);

            getRoles().then(function(roles) {
                var isInRoles = false;

                for (var type in roles) {
                    if (isInRoles === true) break;
                    if (predicate != null && !predicate(type)) continue;

                    for (var i = 0; i < type.length; i++)
                        if (user.role === type[i].name) {
                            isInRoles = true;

                            break;
                        }
                }

                deferred.resolve(isInRoles);
            });

            return deferred.promise;
        }

        function getRoles(predicate) {
            return fetch.roles || (fetch.roles = Roles.get().$promise, fetch.roles);
        }

        function isUserInAppRole(user, appRole) {
            if (appRole == null) return false;

            appRole = appRole.toLowerCase();

            if (appRole === APP_ROLES.LOGGED_IN) return isUserInRoles(user);
            if (appRole === APP_ROLES.ADMIN) return isAdmin(user);
            if (appRole === APP_ROLES.GUEST) {
                var deferred = $q.defer();

                return (deferred.resolve(!Auth.isAuthenticated()), deferred.promise);
            }
        }

        function isUserInRoles(user) { return _isUserInRoles(user); }

        function isAdmin(user) {
            return _isUserInRoles(user, function(type) { return type.isAdmin === true; });
        }

        return {
            APP_ROLES: APP_ROLES,
            getRoles: getRoles,
            isUserInAppRole: isUserInAppRole,
            isUserInRoles: isUserInRoles,
            isAdmin: isAdmin
        };
    }
})();