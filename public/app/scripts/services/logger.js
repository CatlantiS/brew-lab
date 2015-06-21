/**
 * Created by Sam on 6/21/2015.
 */
(function() {
    var app = angular.module('brewApp.services');

    var logger = function () {

        var log4jslogger = log4javascript.getLogger();
        console.log(log4jslogger);

        var error = function(msg) {
            // add logger here
        }

        return {
            error: error
        }
    }

    app.factory('logger', logger);
})();