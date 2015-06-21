/**
 * Created by Sam on 6/21/2015.
 */
(function() {
    var app = angular.module('brewApp.services');

    var logger = function () {

        var log4jslogger = log4javascript.getLogger();
        var popUpAppender = new log4javascript.PopUpAppender();
        var popUpLayout = new log4javascript.PatternLayout("%d{HH:mm:ss} %-5p - %m%n");
        popUpAppender.setLayout(popUpLayout);
        log4jslogger.addAppender(popUpAppender);

        var error = function(msg) {
            // add logger here
            log4jslogger.error(msg);
        }

        return {
            error: error
        }
    }

    app.factory('logger', logger);
})();