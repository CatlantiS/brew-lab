/**
 * Created by Sam on 6/7/2015.
 */
(function() {
    var app = angular.module('app.services');

    var notifications = function() {
        var success = function(msg) {
            toastr.success(msg);
        }

        return {
            success: success
        };
    };

    app.factory('notifications', notifications);
})();