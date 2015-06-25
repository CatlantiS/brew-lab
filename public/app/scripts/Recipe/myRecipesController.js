'use strict';

angular.module('brewApp.controllers')
    .controller('MyRecipesCtrl', ['$q', '$scope', 'User', 'Store', myRecipesController]);

function myRecipesController($q, $scope, User, Store) {
    /* jshint validthis: true */
    var self = this;

    $scope.dataTableOptions = {
        data: null,
        columns: [
            { title: 'Name' },
            { title: 'Volume' },
            { title: 'Units' },
            { title: 'Yeast' }
        ]
    };

    self.isLoading = false;

    //Can load this when app loads or can load it only when it's requested.  And can cache or have it load fresh each time.
    (function init() {
        self.isLoading = true;

        //Todo: have this resolved when app loads or at least before this view is loaded.
        //Note sure this will always be a promise if we set it up right, so wrap just to be safe...
        $q.when(User.recipes()).then(function(data) {
            self.recipes = data;

            self.isLoading = false;
        });
    })();
}
