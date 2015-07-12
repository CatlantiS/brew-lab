///NOTES///

//What if a property is deleted?  Can't just track version at property level...

//Look into RequireJS for AMD.  So far ['version', 'version.polyfill']

//Freeze version objects?

//////

(function() {
    'use strict';

    angular.module('brewApp.services')
        .factory('Version', version);

    function version() {
        var $obj = {},
            $diffs = [];

        polyfill();

        function Version(obj) {
            for (var prop in obj)
                if (obj.hasOwnProperty(prop)) {
                    Object.defineProperty(this, prop, {
                        set: setter(prop),
                        get: getter(prop)
                    });

                    $obj[prop] = obj[prop];
                }

            $obj.$versions = {
                getVersion: getVersionById,
                forEach: forEach
            };
        };

        Version.prototype.compareWith = function(versionId) {
            var diff;

            if (Array.isArray($obj.$versions) && $obj.$versions.length > 0) {
                if (versionId) {
                    return getDiff(versionId);
                }
                else {
                    diff = $diffs.sort(sortPredicate)[0];

                    return diff;
                }
            }
        };

        Version.prototype.deleteProp = function(prop) {
            if (typeof $obj[prop] !== 'undefined')
                delete $obj[prop];

            //Todo: create/flag new version.  Also, can we handle when user deletes prop directly?
        }

        function setter(prop) {
            return function(val) {
                //Need to check how to do a thorough test here.
                if ($obj[prop] !== val) {
                    //Create a version.  Or at least flag for version eligibility.
                    //Todo: figure out how we decide if a new version is needed.
                }

                $obj[prop] = val;
            };
        }

        function getter(prop) {
            return function() { return $obj[prop] };
        }

        function compare(v1, v2) {
            var diff = {};

            for (var prop in v1) {
                if (typeof v2[prop] !== 'undefined') {
                    if (v2[prop] !== null && typeof v2[prop] === 'object')
                        diff[prop] = compare(v1[prop], v2[prop]);
                    else if (v1[prop] !== v2[prop])
                        diff[prop] = { $v1: v1[prop], $v2: v2[prop] };
                }
            }

            //Do we only want to set these if we get an actual object back?
            diff.$v1 = uniq(v1, v2);
            diff.$v2 = uniq(v2, v1);

            function uniq(v1, v2) {
                var $v1;

                for (var prop in v1)
                    if (typeof v2[prop] === 'undefined') {
                        if ($v1 == null)
                            $v1 = {};

                        $v1[prop] = v1[prop];
                    }

                return $v1;
            }

            return diff;
        }

        function getVersion(diff) {
            for (var prop in $obj)
                if ($obj.hasOwnProperty(prop) && typeof diff[prop] === 'undefined')
                    version[prop] = $obj[prop];

            if (typeof diff.$v1 !== 'undefined')
                for (var prop in diff.$v1)
                    if (diff.$v1.hasOwnProperty(prop))
                        version[prop] = diff.$v1[prop];

            for (var prop in diff)
                if (diff.hasOwnProperty(prop) && prop.indexOf('$') !== 0)
                    version[prop] = diff[prop].$v1;

            return version;
        }

        //Need to make this more efficient.
        function getVersionById(versionId) {
            var diff = getDiff(versionId),
                version;

            return getVersion(diff);
        }

        function forEach(fn) {
            for (var i = 0; i < $diffs.length; i++) {
                var diff = $diffs[i],
                    version = getVersion(diff);

                fn(version);
            }
        }

        function getDiff(versionId) {
            var diff = $diffs.find(function (d, i, f) {
                //This doesn't work.  Just a placeholder for actual logic.
                if (d.versionId === versionId)
                    return d;
            });

            return diff;
        }

        function sortPredicate(v1, v2) {
            //Add some checks here.
            return new Date(v1.versionDate) - new Date(v2.versionDate);
        }

        //Don't want to depend on other libs.  But need to stick this someplace else, like in a module.
        function polyfill() {
            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
            if (!Array.isArray) {
                Array.isArray = function(arg) {
                    return Object.prototype.toString.call(arg) === '[object Array]';
                };
            }

            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
            if (!Array.prototype.find) {
                Array.prototype.find = function(predicate) {
                    if (this == null) {
                        throw new TypeError('Array.prototype.find called on null or undefined');
                    }
                    if (typeof predicate !== 'function') {
                        throw new TypeError('predicate must be a function');
                    }
                    var list = Object(this);
                    var length = list.length >>> 0;
                    var thisArg = arguments[1];
                    var value;

                    for (var i = 0; i < length; i++) {
                        value = list[i];
                        if (predicate.call(thisArg, value, i, list)) {
                            return value;
                        }
                    }
                    return undefined;
                };
            }
        }

        return Version;
    }
})();