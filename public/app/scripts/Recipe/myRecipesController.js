(function() {
    'use strict';

    angular.module('brewApp.controllers')
        .controller('MyRecipesCtrl', ['$compile', '$scope', 'User', myRecipesController]);

    function myRecipesController($compile, $scope, User) {
        /* jshint validthis: true */
        var self = this;

        self.loading = false;

        self.editRecipe = function(id) {
            alert('Edit ' + id);
        };

        self.deleteRecipe = function(id) {
            alert('Delete ' + id);
        };

        $scope.prepareData = function() {
            self.loading = true;

            return User.getRecipes().then(function(recipes) {
                self.loading = false;

                return {
                    data: recipes,
                    columns: [
                        { title: 'Name', data: 'name' },
                        { title: 'Volume', data: 'volume' },
                        { title: 'Units', data: 'units' },
                        { title: 'Yeast', data: 'yeastType' },
                        { title: '' },
                        { title: '' }
                    ],
                    'columnDefs': [
                        {
                            'targets': 4,
                            'data': 'name',
                            'render': function (d, a, m, n) {
                                return '<a href="javascript:void(0);" ng-click="ctrl.editRecipe(' + m.id + ')"><i class="fa fa-pencil-square-o"></i></a>';
                            },
                            'createdCell': function (g, r, a, p, e) {
                                $compile(g)($scope);
                            },
                            orderable: false
                        },
                        {
                            'targets': 5,
                            'data': 'name',
                            'render': function (d, a, m, n) {
                                return '<a href="javascript:void(0);" ng-click="ctrl.deleteRecipe(' + m.id + ')"><i class="fa fa-trash"></i></a>';
                            },
                            'createdCell': function (g, r, a, p, e) {
                                $compile(g)($scope);
                            },
                            orderable: false
                        }
                    ]
                };
            });
        };
    };
})();

