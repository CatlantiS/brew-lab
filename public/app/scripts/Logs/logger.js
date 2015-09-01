/**
 * Created by Sam on 6/21/2015.
 */
(function() {
    var app = angular.module('brewApp.services');

    var logger = function ($http, $resource, User, Configuration, Store) {

        var log4jslogger = log4javascript.getLogger();
        var ajaxAppender = new log4javascript.AjaxAppender(Configuration.store.url.api + 'logs/');
        var brewLayout = new log4javascript.JsonLayout();
        brewLayout.setCustomField('userid', User.id);
        ajaxAppender.setLayout(brewLayout);
        log4jslogger.addAppender(ajaxAppender);

        log4jslogger.setLevel(log4javascript.Level.ALL);

        var error = function(msg) {
            log4jslogger.error(msg);
        };

        var info = function(msg) {
            log4jslogger.info(msg);
        };

        var warn = function(msg) {
            log4jslogger.warn(msg);
        };

        var debug = function(msg) {
            log4jslogger.debug(msg);
        };

        var getLogs = function() {
            //return $resource('/api/v1/logs').query().$promise;
            return  Store.getLogs();
        };

        var deleteLog = function(id) {
            return $resource('/api/v1/logs/:id', { id: id}).remove().$promise;
        };

        var getLogLevel = function() {
            return log4jslogger.getLevel();
        }

        var setAuthHeader = function(authHeader) {
            ajaxAppender.addHeader('Authorization', authHeader);
        }

        return {
            error: error,
            info: info,
            warn: warn,
            debug: debug,
            getLogs: getLogs,
            deleteLog: deleteLog,
            getLogLevel: getLogLevel,
            setAuthHeader: setAuthHeader
        }
    }

    app.factory('logger', ['$http', '$resource', 'User', 'Configuration', 'Store', logger]);
})();