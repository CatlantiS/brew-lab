/**
 * Created by Sam on 6/7/2015.
 */
(function() {
    var app = angular.module('app.services');

    var notifications = function() {
        var success = function(msg) {
            toastr.success(msg);
        };

        var info = function(msg) {
          toastr.info(msg);
        };

        var warning = function(msg) {
            toastr.warning(msg);
        }

        var error = function(msg) {
            toastr.error(msg);
        };

        return {
            success: success,
            info: info,
            warning: warning,
            error: error
        };
    };

    app.factory('notifications', notifications);
})();