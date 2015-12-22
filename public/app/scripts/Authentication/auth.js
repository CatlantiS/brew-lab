(function() {
    'use strict';

    angular.module('brewApp.services')
        .factory('Auth', ['$http','$q', 'Configuration', 'Helper', auth]);

    function auth($http, $q, Configuration, Helper) {
        var _isAuthenticated = false,
            _token,
            authUrl = Configuration.auth.url,
            listeners = { authenticate: {}, signOut: {} };

        function isAuthenticated() { return _isAuthenticated; }

        function token() { return _token; }

        function authenticate(username, password) {
            var deferred = $q.defer();

            var clientId = 1;
            var secret = 'secret';
            var body = JSON.stringify({grant_type: 'password', username: username, password: password});
            var authHeader = 'Basic ' + btoa(clientId + ':' + secret);

            $http.post(Helper.joinPaths([authUrl.auth, '/authenticate']), body, { headers: {'Authorization': authHeader }})
                .success(function(data) {
                    _token = data.access_token;

                    var header = 'Bearer ' + _token;

                    $http.defaults.headers.common['Authorization'] = header;

                    _isAuthenticated = true;

                    for (var l in listeners.authenticate) listeners.authenticate[l]({ header: header, token: _token });

                    deferred.resolve(_isAuthenticated);
                })
                .error(function(err) { deferred.reject(err); });

            return deferred.promise;
        }

        //Todo: wire up sign out on server side?
        function signOut() {
            var deferred = $q.defer();

            //$http.get(Helper.joinPaths([authUrl.auth, '/signOut']))
                //.success(function(res) {
                    ////Is this right?  Want to remove auth token from header once logged off.
                    //$http.defaults.headers.common['Authorization'] = undefined;

                    _token = null;
                    _isAuthenticated = false;

                    for (var l in listeners.signOut) listeners.signOut[l]();

                    deferred.resolve(_isAuthenticated);
                //})
                //.error(function(err) { deferred.reject(err); });

            return deferred.promise;
        }

        //Work on these listeners.  Right now only one listener per id.
        function onAuthenticate(id, callback) { listeners.authenticate[id] = callback;}

        function removeAuthenticateListener(id) { delete listeners.authenticate[id]; }

        function onSignOut(id, callback) { listeners.signOut[id] = callback; }

        function removeSignOutListener(id) { delete listeners.signOut[id]; }

        function secureTest() { return $http.get(Helper.joinPaths([authUrl.auth, '/secure'])); }

        return {
            isAuthenticated: isAuthenticated,
            token: token,
            authenticate: authenticate,
            signOut: signOut,
            onAuthenticate: onAuthenticate,
            removeAuthenticateListener: removeAuthenticateListener,
            onSignOut: onSignOut,
            removeSignOutListener: removeSignOutListener
        };
    }
})();

