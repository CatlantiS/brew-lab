/**
 * Created by Sam on 6/21/2015.
 */
(function() {
    var app = angular.module('brewApp.services');

    var logger = function () {

        var log4jslogger = log4javascript.getLogger();
        var ajaxAppender = new log4javascript.AjaxAppender('/api/v1/logs/')
        var brewLayout = new log4javascript.PatternLayout("%d{HH:mm:ss} %-5p - %m %c");
        ajaxAppender.setLayout(brewLayout);
        log4jslogger.addAppender(ajaxAppender);

        var error = function(msg) {
            log4jslogger.error(msg);
        }

        var info = function(msg) {
            log4jslogger.info(msg);
        }

        var warn = function(msg) {
            log4jslogger.warn(msg);
        }

        var debug = function(msg) {
            log4jslogger.debug(msg);
        }

        return {
            error: error,
            info: info,
            warn: warn,
            debug: debug
        }
    }

    app.factory('logger', logger);
})();