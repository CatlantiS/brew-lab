'use strict';

angular.module('brewApp.controllers')
    .controller('MyRecipesCtrl', ['$q', '$scope', 'User', 'Store', myRecipesController]);

function myRecipesController($q, $scope, User, Store) {
    /* jshint validthis: true */
    var self = this;

    self.dataTableOptions = {
        data: null,
        columns: [
            { title: 'Name' },
            { title: 'Volume' },
            { title: 'Units' },
            { title: 'Yeast' }
        ]
    };

    self.getDataForDataTable = function() {
        var arr = self.recipes;
        var res = [];
        var i;
        for (i=0; i < arr.length; i++) {
            res.push([arr[i].name, '', '', '']);
        }
        return res;
    }
    self.isLoading = false;

    //Can load this when app loads or can load it only when it's requested.  And can cache or have it load fresh each time.
    self.isLoading = true;

    //Todo: have this resolved when app loads or at least before this view is loaded.
    //Note sure this will always be a promise if we set it up right, so wrap just to be safe...
    User.recipes().then(function(data) {
        self.recipes = data;

        self.isLoading = false;
    });
};
