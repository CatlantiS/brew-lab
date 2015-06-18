'use strict';

angular.module('brewApp.filters')
    .filter('version', ['appVersion', function(appVersion) {
        return function(text) {
            return String(text).replace(/\%APPVERSION\%/mg, appVersion);
        }
    }]);
