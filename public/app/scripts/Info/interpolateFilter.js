'use strict';

angular.module('app.filters')
    .filter('interpolate', ['appVersion', function(appVersion) {
        return function(text) {
            return String(text).replace(/\%APPVERSION\%/mg, appVersion);
        }
    }]);
